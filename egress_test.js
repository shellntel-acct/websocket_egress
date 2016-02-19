/* global i */
//try to connect on each test port
//once one has successfully connected send gathered data over that socket
var ports = ["21","22","23","25","53","143","995","993","8080","5600","5601"];  //array of ports to test, must match setup in egre$
var publicHost = "ws://127.0.0.1"; //server running egress_serve.py
var eAllowed = []; //array to store allowed egress ports
var i=0;
var glbOnError = "Error";

//flash web socket component
var WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";

//loop thru and create sockets for each port
for (i=0; i < ports.length; i++) {
        var s = new WebSocket(publicHost.concat(":",ports[i]));
}

//setup socket on 80 to send fingerprint data


function fingerprint_browser() {
    "use strict";
    var strOnError, strUserAgent, numVersion, strBrowser, strOut;

    strOnError = "Error";
    strUserAgent = null;
    numVersion = null;
    strBrowser  = null;
    strOut = null;

    try {
        strUserAgent = navigator.userAgent.toLowerCase();
        if (/msie (\d+\.\d+);/.test(strUserAgent)) { //test for MSIE x.x;
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            if (strUserAgent.indexOf("trident/6") > -1) {
                numVersion = 10;
            }
            if (strUserAgent.indexOf("trident/5") > -1) {
                numVersion = 9;
            }
            if (strUserAgent.indexOf("trident/4") > -1) {
                numVersion = 8;
            }
            strBrowser = "Internet Explorer " + numVersion;
        } else if (strUserAgent.indexOf("trident/7") > -1) { //IE 11+ gets rid of the legacy 'MSIE' in the user-agent string;
            numVersion = 11;
            strBrowser = "Internet Explorer " + numVersion;
        }  else if (/firefox[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Firefox " + numVersion;
        } else if (/opera[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Opera/x.x or Opera x.x (ignoring remaining decimal places);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Opera " + numVersion;
        } else if (/chrome[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Chrome/x.x or Chrome x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Chrome " + numVersion;
        } else if (/version[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Version/x.x or Version x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Safari " + numVersion;
        } else if (/rv[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for rv/x.x or rv x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Mozilla " + numVersion;
        } else if (/mozilla[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Mozilla/x.x or Mozilla x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Mozilla " + numVersion;
        } else if (/binget[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for BinGet/x.x or BinGet x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (BinGet) " + numVersion;
        } else if (/curl[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Curl/x.x or Curl x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (cURL) " + numVersion;
        } else if (/java[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Java/x.x or Java x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (Java) " + numVersion;
        } else if (/libwww-perl[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for libwww-perl/x.x or libwww-perl x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (libwww-perl) " + numVersion;
        } else if (/microsoft url control -[\s](\d+\.\d+)/.test(strUserAgent)) { //test for Microsoft URL Control - x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (Microsoft URL Control) " + numVersion;
        } else if (/peach[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Peach/x.x or Peach x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (Peach) " + numVersion;
        } else if (/php[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for PHP/x.x or PHP x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (PHP) " + numVersion;
        } else if (/pxyscand[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for pxyscand/x.x or pxyscand x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (pxyscand) " + numVersion;
        } else if (/pycurl[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for pycurl/x.x or pycurl x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (PycURL) " + numVersion;
        } else if (/python-urllib[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for python-urllib/x.x or python-urllib x.x (ignoring remaining digits);
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Library (Python URLlib) " + numVersion;
        } else if (/appengine-google/.test(strUserAgent)) { //test for AppEngine-Google;
            numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
            strBrowser = "Cloud (Google AppEngine) " + numVersion;
        } else {
            strBrowser = "Unknown";
        }
        strOut = strBrowser;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_canvas() {
    "use strict";
    var strOnError, canvas, strCText, strText, strOut;

    strOnError = "Error";
    canvas = null;
    strCText = null;
    strText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?";
    strOut = null;

    try {
        canvas = document.createElement('canvas');
        strCText = canvas.getContext('2d');
        strCText.textBaseline = "top";
        strCText.font = "14px 'Arial'";
        strCText.textBaseline = "alphabetic";
        strCText.fillStyle = "#f60";
        strCText.fillRect(125, 1, 62, 20);
        strCText.fillStyle = "#069";
        strCText.fillText(strText, 2, 15);
        strCText.fillStyle = "rgba(102, 204, 0, 0.7)";
        strCText.fillText(strText, 4, 17);
        strOut = canvas.toDataURL();
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_connection() {
    "use strict";
    var strOnError, strConnection, strOut;

    strOnError = "N/A";
    strConnection = null;
    strOut = null;

    try {
		// only on android
        strConnection = navigator.connection.type;
        strOut = strConnection;
    } catch (err) {
		// return N/A if navigator.connection object does not apply to this device
        return strOnError;
    }
    return strOut;
}

function fingerprint_display() {
    "use strict";
    var strSep, strPair, strOnError, strScreen, strDisplay, strOut;

    strSep = "|";
    strPair = "=";
    strOnError = "Error";
    strScreen = null;
    strDisplay = null;
    strOut = null;

    try {
        strScreen = window.screen;
        if (strScreen) {
            strDisplay = strScreen.colorDepth + strSep + strScreen.width + strSep + strScreen.height + strSep + strScreen.availWidth + strSep + strScreen.availHeight;
        }
        strOut = strDisplay;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_flash() {
    "use strict";
    var strOnError, objPlayerVersion, strVersion, strOut;

    strOnError = "N/A";
    objPlayerVersion = null;
    strVersion = null;
    strOut = null;

    try {
        objPlayerVersion = swfobject.getFlashPlayerVersion();
        strVersion = objPlayerVersion.major + "." + objPlayerVersion.minor + "." + objPlayerVersion.release;
        if (strVersion === "0.0.0") {
            strVersion = "N/A";
        }
        strOut = strVersion;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_fonts() {
    "use strict";
    var strOnError, style, fonts, count, template, fragment, divs, i, font, div, body, result, e;

    strOnError = "Error";
    style = null;
    fonts = null;
    font = null;
    count = 0;
    template = null;
    divs = null;
    e = null;
    div = null;
    body = null;
    i = 0;

    try {
        style = "position: absolute; visibility: hidden; display: block !important";
        fonts = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"];
        count = fonts.length;
        template = '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ww</b>' + '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ww</b>';
        fragment = document.createDocumentFragment();
        divs = [];
        for (i = 0; i < count; i = i + 1) {
            font = fonts[i];
            div = document.createElement('div');
            font = font.replace(/['"<>]/g, '');
            div.innerHTML = template.replace(/X/g, font);
            div.style.cssText = style;
            fragment.appendChild(div);
            divs.push(div);
        }
        body = document.body;
        body.insertBefore(fragment, body.firstChild);
        result = [];
        for (i = 0; i < count; i = i + 1) {
            e = divs[i].getElementsByTagName('b');
            if (e[0].offsetWidth === e[1].offsetWidth) {
                result.push(fonts[i]);
            }
        }
        // do not combine these two loops, remove child will cause reflow
        // and induce severe performance hit
        for (i = 0; i < count; i = i + 1) {
            body.removeChild(divs[i]);
        }
        return result.join('|');
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_fontsmoothing() {
    "use strict";
    var strOnError, strFontSmoothing, canvasNode, ctx, i, j, imageData, alpha, strOut;

    strOnError = "Unknown";
    strFontSmoothing = null;
    canvasNode = null;
    ctx = null;
    imageData = null;
    alpha = null;
    strOut = null;

    if (typeof(screen.fontSmoothingEnabled) !== "undefined") {
        strFontSmoothing = screen.fontSmoothingEnabled;
    } else {
        try {
			fontsmoothing = "false";
            canvasNode = document.createElement('canvas');
            canvasNode.width = "35";
            canvasNode.height = "35";
            canvasNode.style.display = 'none';
            document.body.appendChild(canvasNode);
            ctx = canvasNode.getContext('2d');
            ctx.textBaseline = "top";
            ctx.font = "32px Arial";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.fillText("O", 0, 0);
            for (j = 8; j <= 32; j = j + 1) {
                for (i = 1; i <= 32; i = i + 1) {
                    imageData = ctx.getImageData(i, j, 1, 1).data;
                    alpha = imageData[3];
                    if (alpha !== 255 && alpha !== 0) {
                        strFontSmoothing = "true"; // font-smoothing must be on.
                    }
                }
            }
            strOut = strFontSmoothing;
        } catch (err) {
            return strOnError;
        }
    }
    strOut = strFontSmoothing;
    return strOut;
}

function fingerprint_formfields() {
    "use strict";
    var i, j, numOfForms, numOfInputs, strFormsInPage, strFormsInputsData, strInputsInForm, strTmp, strOut;


    i = 0;
    j = 0;
    numOfForms = 0;
    numOfInputs = 0;
    strFormsInPage ="";
    strFormsInputsData = [];
    strInputsInForm = "";
    strTmp = "";
    strOut = "";

    strFormsInPage = document.getElementsByTagName('form');
    numOfForms = strFormsInPage.length;
    strFormsInputsData.push("url=" + window.location.href);
    for (i = 0; i < numOfForms; i = i + 1) {
        strFormsInputsData.push("FORM=" + strFormsInPage[i].name);
        strInputsInForm = strFormsInPage[i].getElementsByTagName('input');
        numOfInputs = strInputsInForm.length;
        for (j = 0; j < numOfInputs; j = j + 1) {
            if (strInputsInForm[j].type !== "hidden") {
                strFormsInputsData.push("Input=" + strInputsInForm[j].name);
            }
        }
    }
    strTmp = strFormsInputsData.join("|");
    strOut = strTmp;
    return strOut;
}

function fingerprint_java() {
    "use strict";
    var strOnError, strJavaEnabled, strOut;

    strOnError = "Error";
    strJavaEnabled = null;
    strOut = null;

    try {
        if (navigator.javaEnabled()) {
            strJavaEnabled = "true";
        } else {
            strJavaEnabled = "false";
        }
        strOut = strJavaEnabled;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_language() {
    "use strict";
    var strSep, strPair, strOnError, strLang, strTypeLng, strTypeBrLng, strTypeSysLng, strTypeUsrLng, strOut;

    strSep = "|";
    strPair = "=";
    strOnError = "Error";
    strLang = null;
    strTypeLng = null;
    strTypeBrLng = null;
    strTypeSysLng = null;
    strTypeUsrLng = null;
    strOut = null;

    try {
        strTypeLng = typeof (navigator.language);
        strTypeBrLng = typeof (navigator.browserLanguage);
        strTypeSysLng = typeof (navigator.systemLanguage);
        strTypeUsrLng = typeof (navigator.userLanguage);

        if (strTypeLng !== "undefined") {
            strLang = "lang" + strPair + navigator.language + strSep;
        } else if (strTypeBrLng !== "undefined") {
            strLang = "lang" + strPair + navigator.browserLanguage + strSep;
        } else {
            strLang = "lang" + strPair + strSep;
        }
        if (strTypeSysLng !== "undefined") {
            strLang += "syslang" + strPair + navigator.systemLanguage + strSep;
        } else {
            strLang += "syslang" + strPair + strSep;
        }
        if (strTypeUsrLng !== "undefined") {
            strLang += "userlang" + strPair + navigator.userLanguage;
        } else {
            strLang += "userlang" + strPair;
        }
        strOut = strLang;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_os() {
    "use strict";
    var strSep, strOnError, strUserAgent, strPlatform, strOS, strOSBits, strOut;

    strSep = "|";
    strOnError = "Error";
    strUserAgent = null;
    strPlatform = null;
    strOS = null;
    strOSBits = null;
    strOut = null;

    try {
        /* navigator.userAgent is supported by all major browsers */
        strUserAgent = navigator.userAgent.toLowerCase();
        /* navigator.platform is supported by all major browsers */
        strPlatform = navigator.platform.toLowerCase();
        if (strUserAgent.indexOf("windows nt 6.3") !== -1) {
            strOS = "Windows 8.1";
        } else if (strUserAgent.indexOf("windows nt 6.2") !== -1) {
            strOS = "Windows 8";
        } else if (strUserAgent.indexOf("windows nt 6.1") !== -1) {
            strOS = "Windows 7";
        } else if (strUserAgent.indexOf("windows nt 6.0") !== -1) {
            strOS = "Windows Vista/Windows Server 2008";
        } else if (strUserAgent.indexOf("windows nt 5.2") !== -1) {
            strOS = "Windows XP x64/Windows Server 2003";
        } else if (strUserAgent.indexOf("windows nt 5.1") !== -1) {
            strOS = "Windows XP";
        } else if (strUserAgent.indexOf("windows nt 5.01") !== -1) {
            strOS = "Windows 2000, Service Pack 1 (SP1)";
        } else if (strUserAgent.indexOf("windows xp") !== -1) {
            strOS = "Windows XP";
        } else if (strUserAgent.indexOf("windows 2000") !== -1) {
            strOS = "Windows 2000";
        } else if (strUserAgent.indexOf("windows nt 5.0") !== -1) {
            strOS = "Windows 2000";
        } else if (strUserAgent.indexOf("windows nt 4.0") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("windows nt") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("winnt4.0") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("winnt") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("windows me") !== -1) {
            strOS = "Windows ME";
        } else if (strUserAgent.indexOf("win 9x 4.90") !== -1) {
            strOS = "Windows ME";
        } else if (strUserAgent.indexOf("windows 98") !== -1) {
            strOS = "Windows 98";
        } else if (strUserAgent.indexOf("win98") !== -1) {
            strOS = "Windows 98";
        } else if (strUserAgent.indexOf("windows 95") !== -1) {
            strOS = "Windows 95";
        } else if (strUserAgent.indexOf("windows_95") !== -1) {
            strOS = "Windows 95";
        } else if (strUserAgent.indexOf("win95") !== -1) {
            strOS = "Windows 95";
        } else if (strUserAgent.indexOf("ce") !== -1) {
            strOS = "Windows CE";
        } else if (strUserAgent.indexOf("win16") !== -1) {
            strOS = "Windows 3.11";
        } else if (strUserAgent.indexOf("iemobile") !== -1) {
            strOS = "Windows Mobile";
        } else if (strUserAgent.indexOf("wm5 pie") !== -1) {
            strOS = "Windows Mobile";
        } else if (strUserAgent.indexOf("windows") !== -1) {
            strOS = "Windows (Unknown Version)";
        } else if (strUserAgent.indexOf("openbsd") !== -1) {
            strOS = "Open BSD";
        } else if (strUserAgent.indexOf("sunos") !== -1) {
            strOS = "Sun OS";
        } else if (strUserAgent.indexOf("ubuntu") !== -1) {
            strOS = "Ubuntu";
        } else if (strUserAgent.indexOf("ipad") !== -1) {
            strOS = "iOS (iPad)";
        } else if (strUserAgent.indexOf("ipod") !== -1) {
            strOS = "iOS (iTouch)";
        } else if (strUserAgent.indexOf("iphone") !== -1) {
            strOS = "iOS (iPhone)";
        } else if (strUserAgent.indexOf("mac os x beta") !== -1) {
            strOS = "Mac OSX Beta (Kodiak)";
        } else if (strUserAgent.indexOf("mac os x 10.0") !== -1) {
            strOS = "Mac OSX Cheetah";
        } else if (strUserAgent.indexOf("mac os x 10.1") !== -1) {
            strOS = "Mac OSX Puma";
        } else if (strUserAgent.indexOf("mac os x 10.2") !== -1) {
            strOS = "Mac OSX Jaguar";
        } else if (strUserAgent.indexOf("mac os x 10.3") !== -1) {
            strOS = "Mac OSX Panther";
        } else if (strUserAgent.indexOf("mac os x 10.4") !== -1) {
            strOS = "Mac OSX Tiger";
        } else if (strUserAgent.indexOf("mac os x 10.5") !== -1) {
            strOS = "Mac OSX Leopard";
        } else if (strUserAgent.indexOf("mac os x 10.6") !== -1) {
            strOS = "Mac OSX Snow Leopard";
        } else if (strUserAgent.indexOf("mac os x 10.7") !== -1) {
            strOS = "Mac OSX Lion";
        } else if (strUserAgent.indexOf("mac os x") !== -1) {
            strOS = "Mac OSX (Version Unknown)";
        } else if (strUserAgent.indexOf("mac_68000") !== -1) {
            strOS = "Mac OS Classic (68000)";
        } else if (strUserAgent.indexOf("68K") !== -1) {
            strOS = "Mac OS Classic (68000)";
        } else if (strUserAgent.indexOf("mac_powerpc") !== -1) {
            strOS = "Mac OS Classic (PowerPC)";
        } else if (strUserAgent.indexOf("ppc mac") !== -1) {
            strOS = "Mac OS Classic (PowerPC)";
        } else if (strUserAgent.indexOf("macintosh") !== -1) {
            strOS = "Mac OS Classic";
        } else if (strUserAgent.indexOf("googletv") !== -1) {
            strOS = "Android (GoogleTV)";
        } else if (strUserAgent.indexOf("xoom") !== -1) {
            strOS = "Android (Xoom)";
        } else if (strUserAgent.indexOf("htc_flyer") !== -1) {
            strOS = "Android (HTC Flyer)";
        } else if (strUserAgent.indexOf("android") !== -1) {
            strOS = "Android";
        } else if (strUserAgent.indexOf("symbian") !== -1) {
            strOS = "Symbian";
        } else if (strUserAgent.indexOf("series60") !== -1) {
            strOS = "Symbian (Series 60)";
        } else if (strUserAgent.indexOf("series70") !== -1) {
            strOS = "Symbian (Series 70)";
        } else if (strUserAgent.indexOf("series80") !== -1) {
            strOS = "Symbian (Series 80)";
        } else if (strUserAgent.indexOf("series90") !== -1) {
            strOS = "Symbian (Series 90)";
        } else if (strUserAgent.indexOf("x11") !== -1) {
            strOS = "UNIX";
        } else if (strUserAgent.indexOf("nix") !== -1) {
            strOS = "UNIX";
        } else if (strUserAgent.indexOf("linux") !== -1) {
            strOS = "Linux";
        } else if (strUserAgent.indexOf("qnx") !== -1) {
            strOS = "QNX";
        } else if (strUserAgent.indexOf("os/2") !== -1) {
            strOS = "IBM OS/2";
        } else if (strUserAgent.indexOf("beos") !== -1) {
            strOS = "BeOS";
        } else if (strUserAgent.indexOf("blackberry95") !== -1) {
            strOS = "Blackberry (Storm 1/2)";
        } else if (strUserAgent.indexOf("blackberry97") !== -1) {
            strOS = "Blackberry (Bold)";
        } else if (strUserAgent.indexOf("blackberry96") !== -1) {
            strOS = "Blackberry (Tour)";
        } else if (strUserAgent.indexOf("blackberry89") !== -1) {
            strOS = "Blackberry (Curve 2)";
        } else if (strUserAgent.indexOf("blackberry98") !== -1) {
            strOS = "Blackberry (Torch)";
        } else if (strUserAgent.indexOf("playbook") !== -1) {
            strOS = "Blackberry (Playbook)";
        } else if (strUserAgent.indexOf("wnd.rim") !== -1) {
            strOS = "Blackberry (IE/FF Emulator)";
        } else if (strUserAgent.indexOf("blackberry") !== -1) {
            strOS = "Blackberry";
        } else if (strUserAgent.indexOf("palm") !== -1) {
            strOS = "Palm OS";
        } else if (strUserAgent.indexOf("webos") !== -1) {
            strOS = "WebOS";
        } else if (strUserAgent.indexOf("hpwos") !== -1) {
            strOS = "WebOS (HP)";
        } else if (strUserAgent.indexOf("blazer") !== -1) {
            strOS = "Palm OS (Blazer)";
        } else if (strUserAgent.indexOf("xiino") !== -1) {
            strOS = "Palm OS (Xiino)";
        } else if (strUserAgent.indexOf("kindle") !== -1) {
            strOS = "Kindle";
        } else if (strUserAgent.indexOf("wii") !== -1) {
            strOS = "Nintendo (Wii)";
        } else if (strUserAgent.indexOf("nintendo ds") !== -1) {
            strOS = "Nintendo (DS)";
        } else if (strUserAgent.indexOf("playstation 3") !== -1) {
            strOS = "Sony (Playstation Console)";
        } else if (strUserAgent.indexOf("playstation portable") !== -1) {
            strOS = "Sony (Playstation Portable)";
        } else if (strUserAgent.indexOf("webtv") !== -1) {
            strOS = "MSN TV (WebTV)";
        } else if (strUserAgent.indexOf("inferno") !== -1) {
            strOS = "Inferno";
        } else {
            strOS = "Unknown";
        }
        if (strPlatform.indexOf("x64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("wow64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("win64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("win32") !== -1) {
            strOSBits = "32 bits";
        } else if (strPlatform.indexOf("x64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("x32") !== -1) {
            strOSBits = "32 bits";
        } else if (strPlatform.indexOf("x86") !== -1) {
            strOSBits = "32 bits*";
        } else if (strPlatform.indexOf("ppc") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("alpha") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("68k") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("iphone") !== -1) {
            strOSBits = "32 bits";
        } else if (strPlatform.indexOf("android") !== -1) {
            strOSBits = "32 bits";
        } else {
            strOSBits = "Unknown";
        }
        strOut = strOS + strSep + strOSBits;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function activeXDetect(componentClassID) {
    "use strict";
    var strComponentVersion, strOut;

    strComponentVersion = "";
    strOut = "";

    try {
        strComponentVersion = document.body.getComponentVersion('{' + componentClassID + '}', 'ComponentID');
        if (strComponentVersion !== null) {
			strOut = strComponentVersion;
	    } else {
			strOut = false;
	    }
        return strOut;
    } catch (err) {
        return glbOnError;
    }
}

function stripIllegalChars(strValue) {
    "use strict";
    var iCounter, strOriginal, strOut;

    iCounter = 0;
    strOriginal = "";
    strOut = "";

    try {
        strOriginal = strValue.toLowerCase();
        for (iCounter = 0; iCounter < strOriginal.length; iCounter = iCounter + 1) {
            if (strOriginal.charAt(iCounter) !== '\n' && strOriginal.charAt(iCounter) !== '/' && strOriginal.charAt(iCounter) !== "\\") {
                strOut = strOut + strOriginal.charAt(iCounter);
            } else if (strOriginal.charAt(iCounter) === '\n') {
                strOut = strOut + "n";
            }
        }
        return strOut;
    } catch (err) {
        return glbOnError;
    }
}

function hashtable_containsKey(key) {
    "use strict";
    var bolExists, iCounter;

    bolExists = false;
    iCounter = 0;

    for (iCounter = 0; iCounter < this.hashtable.length; iCounter = iCounter + 1) {
        if (iCounter === key && this.hashtable[iCounter] !== null) {
            bolExists = true;
            break;
        }
    }
    return bolExists;
}

function hashtable_get(key) {
    "use strict";
    return this.hashtable[key];
}

function hashtable_keys() {
    "use strict";
    var keys, iCounter;

    keys = [];
    iCounter = 0;

    for (iCounter in this.hashtable) {
        if (this.hashtable[iCounter] !== null) {
            keys.push(iCounter);
        }
    }
    return keys;
}

function hashtable_put(key, value) {
    "use strict";
    if (key === null || value === null) {
        throw "NullPointerException {" + key + "},{" + value + "}";
    }
    this.hashtable[key] = value;
}

function hashtable_size() {
    "use strict";
    var iSize, iCounter, iOut;

    iSize = 0;
    iCounter = 0;
    iOut = 0;

    for (iCounter in this.hashtable) {
        if (this.hashtable[iCounter] !== null) {
            iSize = iSize + 1;
        }
    }
    iOut = iSize;
    return iOut;
}

function Hashtable() {
    "use strict";
    this.containsKey = hashtable_containsKey;
    this.get = hashtable_get;
    this.keys = hashtable_keys;
    this.put = hashtable_put;
    this.size = hashtable_size;
    this.hashtable = [];
}

/* Detect Plugins */
function fingerprint_plugins() {
    "use strict";
    var htIEComponents, strKey, strName, strVersion, strTemp, bolFirst, iCount, strMimeType, strOut;

    try {
        /* Create hashtable of IE components */
        htIEComponents = new Hashtable();
        htIEComponents.put('7790769C-0471-11D2-AF11-00C04FA35D02', 'AddressBook'); // Address Book
        htIEComponents.put('47F67D00-9E55-11D1-BAEF-00C04FC2D130', 'AolArtFormat'); // AOL ART Image Format Support
        htIEComponents.put('76C19B38-F0C8-11CF-87CC-0020AFEECF20', 'ArabicDS'); // Arabic Text Display Support
        htIEComponents.put('76C19B34-F0C8-11CF-87CC-0020AFEECF20', 'ChineseSDS'); // Chinese (Simplified) Text Display Support
        htIEComponents.put('76C19B33-F0C8-11CF-87CC-0020AFEECF20', 'ChineseTDS'); // Chinese (traditional) Text Display Support
        htIEComponents.put('238F6F83-B8B4-11CF-8771-00A024541EE3', 'CitrixICA'); // Citrix ICA Client
        htIEComponents.put('283807B5-2C60-11D0-A31D-00AA00B92C03', 'DirectAnim'); // DirectAnimation
        htIEComponents.put('44BBA848-CC51-11CF-AAFA-00AA00B6015C', 'DirectShow'); // DirectShow
        htIEComponents.put('9381D8F2-0288-11D0-9501-00AA00B911A5', 'DynHTML'); // Dynamic HTML Data Binding
        htIEComponents.put('4F216970-C90C-11D1-B5C7-0000F8051515', 'DynHTML4Java'); // Dynamic HTML Data Binding for Java
        htIEComponents.put('D27CDB6E-AE6D-11CF-96B8-444553540000', 'Flash'); // Macromedia Flash
        htIEComponents.put('76C19B36-F0C8-11CF-87CC-0020AFEECF20', 'HebrewDS'); // Hebrew Text Display Support
        htIEComponents.put('630B1DA0-B465-11D1-9948-00C04F98BBC9', 'IEBrwEnh'); // Internet Explorer Browsing Enhancements
        htIEComponents.put('08B0E5C0-4FCB-11CF-AAA5-00401C608555', 'IEClass4Java'); // Internet Explorer Classes for Java
        htIEComponents.put('45EA75A0-A269-11D1-B5BF-0000F8051515', 'IEHelp'); // Internet Explorer Help
        htIEComponents.put('DE5AED00-A4BF-11D1-9948-00C04F98BBC9', 'IEHelpEng'); // Internet Explorer Help Engine
        htIEComponents.put('89820200-ECBD-11CF-8B85-00AA005B4383', 'IE5WebBrw'); // Internet Explorer 5/6 Web Browser
        htIEComponents.put('5A8D6EE0-3E18-11D0-821E-444553540000', 'InetConnectionWiz'); // Internet Connection Wizard
        htIEComponents.put('76C19B30-F0C8-11CF-87CC-0020AFEECF20', 'JapaneseDS'); // Japanese Text Display Support
        htIEComponents.put('76C19B31-F0C8-11CF-87CC-0020AFEECF20', 'KoreanDS'); // Korean Text Display Support
        htIEComponents.put('76C19B50-F0C8-11CF-87CC-0020AFEECF20', 'LanguageAS'); // Language Auto-Selection
        htIEComponents.put('08B0E5C0-4FCB-11CF-AAA5-00401C608500', 'MsftVM'); // Microsoft virtual machine
        htIEComponents.put('5945C046-LE7D-LLDL-BC44-00C04FD912BE', 'MSNMessengerSrv'); // MSN Messenger Service
        htIEComponents.put('44BBA842-CC51-11CF-AAFA-00AA00B6015B', 'NetMeetingNT'); // NetMeeting NT
        htIEComponents.put('3AF36230-A269-11D1-B5BF-0000F8051515', 'OfflineBrwPack'); // Offline Browsing Pack
        htIEComponents.put('44BBA840-CC51-11CF-AAFA-00AA00B6015C', 'OutlookExpress'); // Outlook Express
        htIEComponents.put('76C19B32-F0C8-11CF-87CC-0020AFEECF20', 'PanEuropeanDS'); // Pan-European Text Display Support
        htIEComponents.put('4063BE15-3B08-470D-A0D5-B37161CFFD69', 'QuickTime'); // Apple Quick Time
        htIEComponents.put('DE4AF3B0-F4D4-11D3-B41A-0050DA2E6C21', 'QuickTimeCheck'); // Apple Quick Time Check
        htIEComponents.put('3049C3E9-B461-4BC5-8870-4C09146192CA', 'RealPlayer'); // RealPlayer Download and Record Plugin for IE
        htIEComponents.put('2A202491-F00D-11CF-87CC-0020AFEECF20', 'ShockwaveDir'); // Macromedia Shockwave Director
        htIEComponents.put('3E01D8E0-A72B-4C9F-99BD-8A6E7B97A48D', 'Skype'); // Skype
        htIEComponents.put('CC2A9BA0-3BDD-11D0-821E-444553540000', 'TaskScheduler'); // Task Scheduler
        htIEComponents.put('76C19B35-F0C8-11CF-87CC-0020AFEECF20', 'ThaiDS'); // Thai Text Display Support
        htIEComponents.put('3BF42070-B3B1-11D1-B5C5-0000F8051515', 'Uniscribe'); // Uniscribe
        htIEComponents.put('4F645220-306D-11D2-995D-00C04F98BBC9', 'VBScripting'); // Visual Basic Scripting Support v5.6
        htIEComponents.put('76C19B37-F0C8-11CF-87CC-0020AFEECF20', 'VietnameseDS'); // Vietnamese Text Display Support
        htIEComponents.put('10072CEC-8CC1-11D1-986E-00A0C955B42F', 'VML'); // Vector Graphics Rendering (VML)
        htIEComponents.put('90E2BA2E-DD1B-4CDE-9134-7A8B86D33CA7', 'WebEx'); // WebEx Productivity Tools
        htIEComponents.put('73FA19D0-2D75-11D2-995D-00C04F98BBC9', 'WebFolders'); // Web Folders
        htIEComponents.put('89820200-ECBD-11CF-8B85-00AA005B4340', 'WinDesktopUpdateNT'); // Windows Desktop Update NT
        htIEComponents.put('9030D464-4C02-4ABF-8ECC-5164760863C6', 'WinLive'); // Windows Live ID Sign-in Helper
        htIEComponents.put('6BF52A52-394A-11D3-B153-00C04F79FAA6', 'WinMediaPlayer'); // Windows Media Player (Versions 7, 8 or 9)
        htIEComponents.put('22D6F312-B0F6-11D0-94AB-0080C74C7E95', 'WinMediaPlayerTrad'); // Windows Media Player (Traditional Versions)

        strTemp = "";
        bolFirst = true;

        /* strOpera gives full path of the file, extract the filenames, ignoring description and length */
        if (navigator.plugins.length > 0) {
            for (iCount = 0; iCount < navigator.plugins.length; iCount = iCount + 1) {
                if (bolFirst === true) {
                    strTemp += navigator.plugins[iCount].name;
                    bolFirst = false;
                } else {
                    strTemp += glbSep + navigator.plugins[iCount].name;
                }
            }
        } else if (navigator.mimeTypes.length > 0) {
            strMimeType = navigator.mimeTypes;
            for (iCount = 0; iCount < strMimeType.length; iCount = iCount + 1) {
                if (bolFirst === true) {
                    strTemp += strMimeType[iCount].description;
                    bolFirst = false;
                } else {
                    strTemp += glbSep + strMimeType[iCount].description;
                }
            }
        } else {
            document.body.addBehavior("#default#clientCaps");
            strKey = htIEComponents.keys();
            for (iCount = 0; iCount < htIEComponents.size(); iCount = iCount + 1) {
                strVersion = activeXDetect(strKey[iCount]);
                strName = htIEComponents.get(strKey[iCount]);
                if (strVersion) {
                    if (bolFirst === true) {
                        strTemp = strName + glbPair + strVersion;
                        bolFirst = false;
                    } else {
                        strTemp += glbSep + strName + glbPair + strVersion;
                    }
                }
            }
            strTemp = strTemp.replace(/,/g, ".");
        }
        strTemp = stripIllegalChars(strTemp);
        if (strTemp === "") {
            strTemp = "None";
        }
        strOut = strTemp;
        return strOut;
    } catch (err) {
        return glbOnError;
    }
}

function fingerprint_silverlight() {
    "use strict";
    var strOnError, objControl, objPlugin, strSilverlightVersion, strOut;

    strOnError = "Error";
    objControl = null;
    objPlugin = null;
    strSilverlightVersion = null;
    strOut = null;

    try {
        try {
            objControl = new ActiveXObject('AgControl.AgControl');
            if (objControl.IsVersionSupported("5.0")) {
                strSilverlightVersion = "5.x";
            } else if (objControl.IsVersionSupported("4.0")) {
                strSilverlightVersion = "4.x";
            } else if (objControl.IsVersionSupported("3.0")) {
                strSilverlightVersion = "3.x";
            } else if (objControl.IsVersionSupported("2.0")) {
                strSilverlightVersion = "2.x";
            } else {
                strSilverlightVersion = "1.x";
            }
            objControl = null;
        } catch (e) {
            objPlugin = navigator.plugins["Silverlight Plug-In"];
            if (objPlugin) {
                if (objPlugin.description === "1.0.30226.2") {
                    strSilverlightVersion = "2.x";
                } else {
                    strSilverlightVersion = parseInt(objPlugin.description[0], 10);
                }
            } else {
                strSilverlightVersion = "N/A";
            }
        }
        strOut = strSilverlightVersion;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_timezone() {
    "use strict";
    var strOnError, dtDate, numOffset, numGMTHours, numOut;

    strOnError = "Error";
    dtDate = null;
    numOffset = null;
    numGMTHours = null;
    numOut = null;

    try {
        dtDate = new Date();
        numOffset = dtDate.getTimezoneOffset();
        numGMTHours = (numOffset / 60) * (-1);
        numOut = numGMTHours;
        return numOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_truebrowser() {
    "use strict";
    var strBrowser, strUserAgent, strOut;

    strBrowser = "Unknown";
    strUserAgent = null;
    strOut = null;

    strUserAgent = navigator.userAgent.toLowerCase();

	/* Checks for different browsers, cannot use Try/Catch block */
	if (document.all && document.getElementById && navigator.savePreferences && (strUserAgent.indexOf("Netfront") < 0) && navigator.appName !== "Blazer") {
		strBrowser = "Escape 5";
	} else if (navigator.vendor === "KDE") {
		strBrowser = "Konqueror";
	} else if (document.childNodes && !document.all && !navigator.taintEnabled && !navigator.accentColorName) {
		strBrowser = "Safari";
	} else if (document.childNodes && !document.all && !navigator.taintEnabled && navigator.accentColorName) {
		strBrowser = "OmniWeb 4.5+";
	} else if (navigator.__ice_version) {
		strBrowser = "ICEBrowser";
	} else if (window.ScriptEngine && ScriptEngine().indexOf("InScript") + 1 && document.createElement) {
		strBrowser = "iCab 3+";
	} else if (window.ScriptEngine && ScriptEngine().indexOf("InScript") + 1) {
		strBrowser = "iCab 2-";
	} else if (strUserAgent.indexOf("hotjava") + 1 && (navigator.accentColorName) === "undefined") {
		strBrowser = "HotJava";
	} else if (document.layers && !document.classes) {
		strBrowser = "Omniweb 4.2-";
	} else if (document.layers && !navigator.mimeTypes["*"]) {
		strBrowser = "Escape 4";
	} else if (document.layers) {
		strBrowser = "Netscape 4";
	} else if (window.opera && document.getElementsByClassName) {
		strBrowser = "Opera 9.5+";
	} else if (window.opera && window.getComputedStyle) {
		strBrowser = "Opera 8";
	} else if (window.opera && document.childNodes) {
		strBrowser = "Opera 7";
	} else if (window.opera) {
		strBrowser = "Opera " + window.opera.version();
	} else if (navigator.appName.indexOf("WebTV") + 1) {
		strBrowser = "WebTV";
	} else if (strUserAgent.indexOf("netgem") + 1) {
		strBrowser = "Netgem NetBox";
	} else if (strUserAgent.indexOf("opentv") + 1) {
		strBrowser = "OpenTV";
	} else if (strUserAgent.indexOf("ipanel") + 1) {
		strBrowser = "iPanel MicroBrowser";
	} else if (document.getElementById && !document.childNodes) {
		strBrowser = "Clue browser";
	} else if (navigator.product && navigator.product.indexOf("Hv") === 0) {
		strBrowser = "Tkhtml Hv3+";
	} else if (typeof InstallTrigger !== 'undefined') {
		strBrowser = "Firefox";
	} else if (window.atob) {
		strBrowser = "Internet Explorer 10+";
	} else if (XDomainRequest && window.performance) {
		strBrowser = "Internet Explorer 9";
	} else if (XDomainRequest) {
		strBrowser = "Internet Explorer 8";
	} else if (document.documentElement && document.documentElement.style.maxHeight !== "undefined") {
		strBrowser = "Internet Explorer 7";//xxxxx
	} else if (document.compatMode && document.all) {
		strBrowser = "Internet Explorer 6";//xxxxx
	} else if (window.createPopup) {
		strBrowser = "Internet Explorer 5.5";
	} else if (window.attachEvent) {
		strBrowser = "Internet Explorer 5";
	} else if (document.all && navigator.appName !== "Microsoft Pocket Internet Explorer") {
		strBrowser = "Internet Explorer 4";
	} else if ((strUserAgent.indexOf("msie") + 1) && window.ActiveXObject) {
		strBrowser = "Pocket Internet Explorer";
	} else if (document.getElementById && ((strUserAgent.indexOf("netfront") + 1) || navigator.appName === "Blazer" || navigator.product === "Gecko" || (navigator.appName.indexOf("PSP") + 1) || (navigator.appName.indexOf("PLAYSTATION 3") + 1))) {
		strBrowser = "NetFront 3+";
	} else if (navigator.product === "Gecko" && !navigator.savePreferences) {
		strBrowser = "Gecko engine (Mozilla, Netscape 6+ etc.)";
	} else if (window.chrome) {
		strBrowser = "Chrome";
    }
	strOut = strBrowser;
	return strOut;
}

function fingerprint_useragent() {
    "use strict";
    var strSep, strTmp, strUserAgent, strOut;

    strSep = "|";
    strTmp = null;
    strUserAgent = null;
    strOut = null;

    /* navigator.userAgent is supported by all major browsers */
    strUserAgent = navigator.userAgent.toLowerCase();
    /* navigator.platform is supported by all major browsers */
    strTmp = strUserAgent + strSep + navigator.platform;
    /* navigator.cpuClass only supported in IE */
    if (navigator.cpuClass) {
        strTmp += strSep + navigator.cpuClass;
    }
    /* navigator.browserLanguage only supported in IE, Safari and Chrome */
    if (navigator.browserLanguage) {
        strTmp += strSep + navigator.browserLanguage;
    } else {
        strTmp += strSep + navigator.language;
    }
    strOut = strTmp;
    return strOut;
}


try {

			var host = "ws://52.3.244.63:8443";
			console.log("Host:", host);

			var s = new WebSocket(host);

			s.onopen = function (e) {
				console.log("Socket opened.");
				s.send(fingerprint_useragent());
			};

			s.onclose = function (e) {
				console.log("Socket closed.");
			};

			s.onerror = function (e) {
				console.log("Socket error:", e);
			};

		} catch (ex) {
			console.log("Socket exception:", ex);
		}

//send fp_browser to ws


//ws.onopen (ws) {
//ws.send(fingerprint_useragent());
//};

//    ws.send("Browser Fingerprint: " + fingerprint_browser());
//    ws.send("Canvas Fingerpring: " + fingerprint_canvas());
//    ws.send("Connection: " + fingerprint_connection());
//    ws.send("Display: " + fingerprint_display());
//    ws.send("Flash: " + fingerprint_flash());
//    ws.send("Fonts: " + fingerprint_fonts());
//    ws.send("Font_smoothing: " + fingerprint_fontsmoothing());
//    ws.send("Form_info: " + fingerprint_formfields());
//    ws.send("Java: " + fingerprint_java());
//    ws.send("Language: " + fingerprint_language());
//    ws.send("OS: " + fingerprint_os());
//    ws.send("Plugins: " + fingerprint_plugins());
//    ws.send("Silverlight: " + fingerprint_silverlight());
//    ws.send("Timezone: " + fingerprint_timezone());
//    ws.send("TrueBrowser: " + fingerprint_truebrowser());



