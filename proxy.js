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

const proxyServer = http.createServer((req, res) => {
    const config = {
        ws: true,
    }
    const target = proxyRules.match(req);
    if (target) {
      return proxy.web(req, res, {
          ...config,
        target
      });
    }

    return config;
  });

proxy.on('error', (err, req, res) => {
    // res.writeHead(500, {
    //     'Content-Type': 'text/plain'
    // });
    //
    // res.end('Something went wrong. And we are reporting a custom error message.');
});

proxyServer.listen(4020);
