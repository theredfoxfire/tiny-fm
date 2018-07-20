var events = require('events');
var eventEmitter = new events.EventEmitter();
const articleModel = require('./model/article').call;
const articleController = require('./controller/article').call;

const loadFactory = function() {
  var models = new Map();
  var controllers = new Map();
  return {
    registerController: function(key, controller) {
      controllers.set(key, controller);
    },
    callController: function(key) {
      return controllers.get(key);
    },
    registerModel: function(key, model) {
      models.set(key, model);
    },
    callModel: function(key) {
      return models.get(key);
    },
  }
}
exports.load = function() {
  const loader = loadFactory();
  
  eventEmitter.addListener('controller', function() {
    loader.registerModel('article', articleModel);
  });
  eventEmitter.addListener('model', function() {
    loader.registerController('article', articleController);
  });
  eventEmitter.emit('controller');
  eventEmitter.emit('model');

  return loader;
}
