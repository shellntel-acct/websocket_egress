#!/usr/bin/env python

import time
import struct
import socket
import hashlib
import base64
import sys
from select import select
import re
import logging
from threading import Thread
import signal
import os
import SimpleHTTPServer
import SocketServer
import optparse
import thread
import exceptions
import contextlib

#requires this script to have egress_test.js and flashpolicy.xml in working directory
#mostly taken from https://gist.github.com/4190781.git
# and https://github.com/gimite/web-socket-js
# and http://www.adobe.com/devnet/flashplayer/articles/socket_policy_files.html

# Constants
MAGIC_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
TEXT = 0x01
BINARY = 0x02

# WebSocket implementation
class WebSocket(object):

    handshake = (
        "HTTP/1.1 101 Web Socket Protocol Handshake\r\n"
        "Upgrade: WebSocket\r\n"
        "Connection: Upgrade\r\n"
        "Sec-WebSocket-Accept: %(acceptstring)s\r\n"
        "Server: EgressTest\r\n"
        "Access-Control-Allow-Origin: http://localhost\r\n"
        "Access-Control-Allow-Credentials: true\r\n"
        "\r\n"
    )


    # Constructor
    def __init__(self, client, server):
        self.client = client
        self.server = server
        self.handshaken = False
        self.header = ""
        self.data = ""


    # Serve this client
    def feed(self, data):
    
        # If we haven't handshaken yet
        if not self.handshaken:
            #logging.debug("No handshake yet")
            self.header += data
            if self.header.find('\r\n\r\n') != -1:
                parts = self.header.split('\r\n\r\n', 1)
                self.header = parts[0]
                if self.dohandshake(self.header, parts[1]):
                    #logging.info("Handshake successful")
                    self.handshaken = True

        # We have handshaken
        else:
            #logging.debug("Handshake is complete")
            
            # Decode the data that we received according to section 5 of RFC6455
            recv = self.decodeCharArray(data)
            #log all info about egress and fingerprint from client
            logging.info("".join(recv).strip())



    # copy pasta from http://www.cs.rpi.edu/~goldsd/docs/spring2012-csci4220/websocket-py.txt
    def sendMessage(self, s):
        """
        Encode and send a WebSocket message
        """

        # Empty message to start with
        message = ""
        
        # always send an entire message as one frame (fin)
        b1 = 0x80

        # in Python 2, strs are bytes and unicodes are strings
        if type(s) == unicode:
            b1 |= TEXT
            payload = s.encode("UTF8")
            
        elif type(s) == str:
            b1 |= TEXT
            payload = s

        # Append 'FIN' flag to the message
        message += chr(b1)

        # never mask frames from the server to the client
        b2 = 0
        
        # How long is our payload?
        length = len(payload)
        if length < 126:
            b2 |= length
            message += chr(b2)
        
        elif length < (2 ** 16) - 1:
            b2 |= 126
            message += chr(b2)
            l = struct.pack(">H", length)
            message += l
        
        else:
            l = struct.pack(">Q", length)
            b2 |= 127
            message += chr(b2)
            message += l

        # Append payload to message
        message += payload

        # Send to the client
        self.client.send(str(message))


    # copy pasta from http://stackoverflow.com/questions/8125507/how-can-i-send-and-receive-websocket-messages-on-the-server-side
    def decodeCharArray(self, stringStreamIn):
    
        # Turn string values into opererable numeric byte values
        byteArray = [ord(character) for character in stringStreamIn]
        datalength = byteArray[1] & 127
        indexFirstMask = 2

        if datalength == 126:
            indexFirstMask = 4
        elif datalength == 127:
            indexFirstMask = 10

        # Extract masks
        masks = [m for m in byteArray[indexFirstMask : indexFirstMask+4]]
        indexFirstDataByte = indexFirstMask + 4
        
        # List of decoded characters
        decodedChars = []
        i = indexFirstDataByte
        j = 0
        
        # Loop through each byte that was received
        while i < len(byteArray):
        
            # Unmask this byte and add to the decoded buffer
            decodedChars.append( chr(byteArray[i] ^ masks[j % 4]) )
            i += 1
            j += 1

        # Return the decoded string
        return decodedChars


    # Handshake with this client
    def dohandshake(self, header, key=None):
    
#        logging.debug("Begin handshake: %s" % header)
        
        # Get the handshake template
        handshake = self.handshake
        
        # Step through each header
        for line in header.split('\r\n')[1:]:
            name, value = line.split(': ', 1)
            
            # If this is the key
            if name.lower() == "sec-websocket-key":
            
                # Append the standard GUID and get digest
                combined = value + MAGIC_GUID
                response = base64.b64encode(hashlib.sha1(combined).digest())
                
                # Replace the placeholder in the handshake response
                handshake = handshake % { 'acceptstring' : response }

#        logging.debug("Sending handshake %s" % handshake)
        self.client.send(handshake)
        return True

    def onmessage(self, data):
        #logging.info("Got message: %s" % data)
        self.send(data)

    def send(self, data):
        #logging.info("Sent message: %s" % data)
        self.client.send("\x00%s\xff" % data)

    def close(self):
        self.client.close()


# WebSocket server implementation
class WebSocketServer(object):

    # Constructor
    def __init__(self, bind, port, cls):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.bind((bind, port))
        self.bind = bind
        self.port = port
        self.cls = cls
        self.connections = {}
        self.listeners = [self.socket]

    # Listen for requests
    def listen(self, backlog=5):

        self.socket.listen(backlog)
        logging.info("Listening on %s" % self.port)

        # Keep serving requests
        self.running = True
        while self.running:
        
            # Find clients that need servicing
            rList, wList, xList = select(self.listeners, [], self.listeners, 1)
            for ready in rList:
                if ready == self.socket:
                    #logging.debug("New client connection")
                    client, address = self.socket.accept()
                    fileno = client.fileno()
                    self.listeners.append(fileno)
                    self.connections[fileno] = self.cls(client, self)
                else:
                    #logging.debug("Client ready for reading %s" % ready)
                    client = self.connections[ready].client
                    data = client.recv(4096)
                    fileno = client.fileno()
                    if data:
                        #logging.debug(data) 
                        eport = str(self.port)
                        logging.info("Egress possible with port: " + eport)
                        self.connections[fileno].feed(data) 
                    else:
                        logging.debug("Closing client %s" % ready)
                        self.connections[fileno].close()
                        del self.connections[fileno]
                        self.listeners.remove(ready)
            
            # Step though and delete broken connections
            for failed in xList:
                if failed == self.socket:
                    logging.error("Socket broke")
                    for fileno, conn in self.connections:
                        conn.close()
                    self.running = False

#taken from adobe
class policy_server(object):
    def __init__(self, port, path):
        self.port = port
        self.path = path
        self.policy = self.read_policy(path)
        logging.info('Serving policy on port %d' % port)
        try:
            self.sock = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
        except AttributeError, socket.error:
            # AttributeError catches Python built without IPv6
            # socket.error catches OS with IPv6 disabled
            self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind(('', port))
        self.sock.listen(5)
    def read_policy(self, path):
        with file(path, 'rb') as f:
            policy = f.read(10001)
            if len(policy) > 10000:
                raise exceptions.RuntimeError('File probably too large to be a policy file',
                                              path)
            if 'cross-domain-policy' not in policy:
                raise exceptions.RuntimeError('Not a valid policy file',
                                              path)
            return policy
    def run(self):
        try:
            while True:
                thread.start_new_thread(self.handle, self.sock.accept())
        except socket.error, e:
            self.log('Error accepting connection: %s' % (e[1],))
    def handle(self, conn, addr):
        addrstr = '%s:%s' % (addr[0],addr[1])
        try:
            self.log('Connection from %s' % (addrstr,))
            with contextlib.closing(conn):
                # It's possible that we won't get the entire request in
                # a single recv, but very unlikely.
                request = conn.recv(1024).strip()
                if request != '<policy-file-request/>\0':
                    self.log('Unrecognized request from %s: %s' % (addrstr, request))
                    return
                self.log('Valid request received from %s' % (addrstr,))
                conn.sendall(self.policy)
                self.log('Sent policy file to %s' % (addrstr,))
        except socket.error, e:
            self.log('Error handling connection from %s: %s' % (addrstr, e[1]))
        except Exception, e:
            self.log('Error handling connection from %s: %s' % (addrstr, e[1]))
    def log(self, str):
        print >>sys.stderr, str

def flashServ():

#this is setup to alway run on port 843 and use a policy file in the current working directory
    polFile = os.getcwd() + "/flashpolicy.xml"

    try:
        policy_server(843, polFile).run()
    except Exception, e:
        print >> sys.stderr, e
        sys.exit(1)
    except KeyboardInterrupt:
        pass

# Entry point
if __name__ == "__main__":

#fire up thread and listener for each egress port to test
    logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
    eports_list = [21,23,53,143,995,993,8080,8443,5600,5601]
#    eports_list = [21]
        
    #for each port in list create server and thread
    for port in eports_list: 
        server = WebSocketServer("", port, WebSocket)
        server_thread = Thread(target=server.listen, args=[5])
        server_thread.start()
            
    #setup xml server to serve flash policy file
    flashServ()
        
    # Add SIGINT handler for killing the threads
    def signal_handler(signal, frame):
        logging.info("Caught Ctrl+C, shutting down...")
        server.running = False
        os._exit(0)
    signal.signal(signal.SIGINT, signal_handler)

    while True:
        time.sleep(100)
