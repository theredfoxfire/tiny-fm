var data = new Map();
for (var i = 1; i <= 10; i += 1) {
  var comments = [];
  for (var j = 1; j <= 10; j += 1) {
    comments.push({
      "articleID": i,
      "commentID": j
    });
  }
  data.set(i, comments);
}
exports.articleToComments = data;
