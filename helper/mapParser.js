exports.parser = {
  select: function(map) {
    var data = [];
    const limit = process.env.ARTICLE_LIMIT;
    map.forEach(function(value, key) {
      data.push(value);
    });

    return data.slice(0, limit);
  },
  hasMany: function(parentObject, childMap) {
    var data = [];
    parentObject.forEach(function(value, key) {
      data.push(childMap.get(parseInt(value.commentID)));
    });

    return data;
  },
  getLastID: function(map) {
    var data = [];
    map.forEach(function(value, key) {
      data.push(value);
    });
    return data.length += 1;
  },
};
