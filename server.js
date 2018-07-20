const http = require('http');
const router = require('./router');
const autoloader = require('./autoloader');
const config = require('./config');
const loader = autoloader.load();

// load config param
config.conf();

// create controller instance
const articleController = loader.callController('article');

// default route say hello world
router.register('/', function(req, res, params) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');

  res.end();
});

/**
  request method GET,
  response list of article
 */
router.register('/articles', function(req, res, params) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const json = articleController(loader);

  res.end(json.getAll());
});

/**
  request method GET,
  response return single article
*/
router.register('/articles/:id', function(req, res, params) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const json = articleController(loader);

  res.end(json.getByID(params));
});

/**
  request method GET,
  request param articleID,
  response list of comment related to the article
*/
router.register('/get-comment-list/:id', function(req, res, params) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const json = articleController(loader);

  res.end(json.getCommentList(params));
});

/**
  request method GET,
  request param {
    'nickname': requeired,
    'title': required,
    'content': required,
    'creation_date': required,
  }
  request action store new article data
*/
router.register('/store-article', function(req, res, params) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  res.writeHead(200, {'Content-Type': 'application/json'});
  const json = articleController(loader);

  res.end(json.postArticle(query));
});

/**
  request method GET,
  request param {
    'nickname': requeired,
    'content': required,
    'creation_date': required,
  }
  request action store new comment related to the articleID
*/
router.register('/store-comment/:articleID', function(req, res, params) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  res.writeHead(200, {'Content-Type': 'application/json'});
  const json = articleController(loader);

  res.end(json.postComment(query));
});

/**
  request method GET,
  request param {
    'nickname': requeired,
    'content': required,
    'creation_date': required,
  }
  request action store new comment related to the commentID
*/
router.register('/reply-comment/:commentID', function(req, res, params) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  res.writeHead(200, {'Content-Type': 'application/json'});
  const json = articleController(loader);

  res.end(json.replyComment(query));
});

const server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

server.listen(8000);
console.log('Server running listening port: 8000');
