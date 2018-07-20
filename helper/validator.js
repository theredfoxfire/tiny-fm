var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.validator = function(entity, formData) {
  const dataMap = new Map();
  const error = [];
  var query = [];

  eventEmitter.addListener('getQuery', function(formData) {
    for(var val in formData) {
      query.push(val);
    }
  });
  eventEmitter.addListener('getDataMap', function(query) {
    query.forEach(function(value, key) {
      dataMap.set(value, formData[value]);
    });
  });
  eventEmitter.addListener('getError', function(entity) {
    entity.forEach(function(value, key) {
      const item = dataMap.get(value);
      if (!item) {
        error.push({field: value+' is required'});
      }
    });
  });
  
  eventEmitter.emit('getQuery', formData);
  eventEmitter.emit('getDataMap', query);
  eventEmitter.emit('getError', entity);

  return error;
}
