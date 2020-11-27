
> esm-browser-node@1.0.0 start /Users/endel/projects/esm-browser-node/esbuild
> esbuild src/index.js --bundle

(() => {
  // node_modules/httpie/xhr/index.mjs
  function apply(src, tar) {
    tar.headers = src.headers || {};
    tar.statusMessage = src.statusText;
    tar.statusCode = src.status;
    tar.data = src.response;
  }
  function send(method, uri, opts) {
    return new Promise(function(res, rej) {
      opts = opts || {};
      var req = new XMLHttpRequest();
      var k, tmp, arr, str = opts.body;
      var headers = opts.headers || {};
      if (opts.timeout)
        req.timeout = opts.timeout;
      req.ontimeout = req.onerror = function(err) {
        err.timeout = err.type == "timeout";
        rej(err);
      };
      req.open(method, uri.href || uri);
      req.onload = function() {
        arr = req.getAllResponseHeaders().trim().split(/[\r\n]+/);
        apply(req, req);
        while (tmp = arr.shift()) {
          tmp = tmp.split(": ");
          req.headers[tmp.shift().toLowerCase()] = tmp.join(": ");
        }
        tmp = req.headers["content-type"];
        if (tmp && !!~tmp.indexOf("application/json")) {
          try {
            req.data = JSON.parse(req.data, opts.reviver);
          } catch (err) {
            apply(req, err);
            return rej(err);
          }
        }
        (req.status >= 400 ? rej : res)(req);
      };
      if (typeof FormData < "u" && str instanceof FormData) {
      } else if (str && typeof str == "object") {
        headers["content-type"] = "application/json";
        str = JSON.stringify(str);
      }
      req.withCredentials = !!opts.withCredentials;
      for (k in headers) {
        req.setRequestHeader(k, headers[k]);
      }
      req.send(str);
    });
  }
  var get = send.bind(send, "GET");
  var post = send.bind(send, "POST");
  var patch = send.bind(send, "PATCH");
  var del = send.bind(send, "DELETE");
  var put = send.bind(send, "PUT");

  // src/index.js
  get("https://github.com").then((response) => console.log(response));
})();
