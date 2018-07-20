var articles = require('../data/articles');
var comments = require('../data/comments');
var articleToComments = require('../data/articleToComments');
var helper = require('../helper/mapParser');

exports.call = function(params) {
  return {
    getAll: function() {
      const articleData = helper.parser.select(articles.articles);

      return JSON.stringify(articleData);
    },
    getByID: function(ID) {
      const article = articles.articles.get(parseInt(ID));

      return JSON.stringify(article);
    },
    postArticle: function(formData) {
      const lastID = helper.parser.getLastID(articles.articles);
      articles.articles.set(lastID, formData);
      var article = articles.articles.get(lastID);

      return {'ID': lastID, 'article': article};
    },
    postComment: function(formData) {
      const lastID = helper.parser.getLastID(comments.comments);
      comments.comments.set(lastID, formData);
      var comment = comments.comments.get(lastID);

      return {'ID': lastID, 'comment': comment};
    },
    replyComment: function(formData) {
      const lastID = helper.parser.getLastID(comments.comments);
      comments.comments.set(lastID, formData);
      var comment = comments.comments.get(lastID);

      return {'ID': lastID, 'comment': comment};
    },
    getCommentList: function(ID) {
      const articleToComment = articleToComments.articleToComments.get(parseInt(ID));
      const commentList = helper.parser.hasMany(articleToComment, comments.comments);

      return JSON.stringify(commentList);
    },
  }
}
