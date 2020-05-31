const http = require("http");
const httpProxy = require("http-proxy");
const HttpProxyRules = require("http-proxy-rules");

const proxyRules = new HttpProxyRules({
  rules: {
    "/api": "http://localhost:4021" // Rule (1)
  },
  // default: 'http://localhost:63342/housekeeping-book/frontend/dist_tmp', // default target
  default: "http://localhost:4022" // default target
});

const proxy = httpProxy.createProxyServer();

http
  .createServer((req, res) => {
    const target = proxyRules.match(req);
    if (target) {
      return proxy.web(req, res, {
        target
      });
    }
  })
  .listen(4020);
