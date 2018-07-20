exports.createHandler = function (method) {
  return new Handler(method);
}

Handler = function(method) {
  this.process = function(req, res) {
    params = req.url.split('/').length > 2 ? req.url.replace(':', '').split('/')[2] : '';
    return method.apply(this, [req, res, params]);
  }
}
