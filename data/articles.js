var data = new Map();
for (var i = 1; i <= 25; i += 1) {
  data.set(i, {
    "nickname": "Jaka Juki"+i,
    "title": "Monde Franc",
    "content": "some content",
    "creationDate": "2018-07-19"
  });
}
exports.articles = data;
