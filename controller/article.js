var helper = require('../helper/validator');
var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.call = function(loader) {
  const articleModel = loader.callModel('article')();

  return {
    getAll: function() {
      const data = articleModel.getAll();

      return data;
    },
    getByID: function(params) {
      const data = articleModel.getByID(params);

      return data;
    },
    getCommentList: function(params) {
      const data = articleModel.getCommentList(params);

      return data;
    },
    postArticle: function(formData) {
      var error = helper.validator([
        'nickname',
        'title',
        'content',
        'creation_date',
      ], formData);

      if (error.length > 0) {
        return JSON.stringify(error);
      } else {
        const article = articleModel.postArticle(formData);

        return JSON.stringify({'success': 'data saved', 'articleID': article.ID, 'article': article.article});
      }
    },
    postComment: function(formData) {
      var error = helper.validator([
        'nickname',
        'content',
        'creation_date',
      ], formData);

      if (error.length > 0) {
        return JSON.stringify(error);
      } else {
        const comment = articleModel.postComment(formData);

        return JSON.stringify({'success': 'data saved', 'commentID': comment.ID, 'comment': comment.comment});
      }
    },
    replyComment: function(formData) {
      var error = helper.validator([
        'nickname',
        'content',
        'creation_date',
      ], formData);

      if (error.length > 0) {
        return JSON.stringify(error);
      } else {
        const comment = articleModel.replyComment(formData);

        return JSON.stringify({'success': 'data saved', 'commentID': comment.ID, 'comment': comment.comment});
      }
    },
  }

};
