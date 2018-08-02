function xml2json(xml) {
    
    var dom = window.ActiveXObject ? (new ActiveXObject("Microsoft.XMLDOM")) : null;

    dom = dom ? dom : document.implementation.createDocument(null, "body");

    dom.firstChild.innerHTML = xml;

    var a = dom.firstChild.firstChild;

    var t = function (v) {

        return v.getAttribute ? v.getAttribute("type") : "null";

    };

    var f = function (f, a) {

        var c = undefined;

        if (t(a) == "null") {

            c = null;

        } else if (t(a) == "boolean") {

            var b = a.textContent.toLowerCase().substr(0, 1);
            c = ['1', 't'].indexOf(b) != -1;

        } else if (t(a) == "number") {

            c = Number(a.textContent);

        } else if (t(a) == "string") {

            c = a.textContent;

        } else if (t(a) == "object") {

            c = {};

            if (a.getAttribute("__type")) {

                c["__type"] = a.getAttribute("__type");

            }

            for (var i = 0; i < a.childNodes.length; i++) {

                var v = a.childNodes[i];
                c[v.nodeName] = f(f, v);

            }

        } else if (t(a) == "array") {

            c = [];

            for (var i = 0; i < a.childNodes.length; i++) {

                var v = a.childNodes[i];
                c[i] = f(f, v);

            }

        }

        return c;

    };

    var c = f(f, a);

    return JSON.stringify(c);

}