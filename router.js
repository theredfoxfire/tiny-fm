var handlerFactory = require('./handler');
var fs = require('fs');
var parser = require('url');
var handlers = {};
var handlersParam = {};

exports.clear = function() {
  handlers = {};
  handlersParam = {};
}

exports.register = function(url, method) {
  if (url.search(':') >= 0) {
    handlersParam[url.replace(':', '').split('/')[1]] = handlerFactory.createHandler(method);
  } else {
    handlers[url] = handlerFactory.createHandler(method);
  }
}

exports.route = function(req) {
  url = parser.parse(req.url, true);
  if (handlers[url.pathname]) {
    return handlers[url.pathname];
  } else if (parseParam(url.pathname)) {
    return parseParam(url.pathname);
  } else {
    return this.missing(req);
  }
}

function parseParam(url) {
  return handlersParam[url.replace(':', '').split('/')[1]];
}

exports.missing = function(req) {
  var url = parser.parse(req.url, true);
  return handlerFactory.createHandler(function(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write("No route registered for " + url.pathname);
    res.end();
  });
}
