;
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        //define this file as a named AMD module
        define('rest', ['domReady!'], factory);
    } else {
        //use the global space and set this module there

        //emulate requirejs in a simplified way for getting modules
        global.require = function (name, deps, cb) {
            if (typeof name === 'string') {
                return global[name];
            }
        }

        global.rest = factory(global.document)
    }
}(this, function (domReady) {
    var $this = {
        /**
         * Generic AJAX invoke with callback
         */
        ajax: function (method, url, params, cb) {
            var xmlhttp;
            if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else { // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            var rsc = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    cb(JSON.parse(xmlhttp.responseText));
                }
            };
            xmlhttp.onreadystatechange = rsc;
            xmlhttp.open(method, url, true);
            xmlhttp.send(JSON.stringify(params));
        },
        /**
         * HTTP POST helper
         */
        post: function (url, parms, callback) {
            $this.ajax('POST', url, parms, callback);
        },
        /**
         * HTTP GET helper
         */
        get: function (url, callback) {
            $this.ajax('GET', url, {}, callback);
        },
        /**
         * HTTP GET helper
         */
        delete: function (url, callback) {
            $this.ajax('DELETE', url, {}, callback);
        },
        /**
         * Helper method for serializing form data in Object format
         */
        serializeForm: function (form) {
            var parms = {};
            for (idx in form) {
                if (+idx + '' !== idx) continue;
                switch (form[idx].tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                    parms[form[idx].name] = form[idx].value;
                }
            }
            return JSON.stringify(parms);
        }
    }
    return $this;
}));
