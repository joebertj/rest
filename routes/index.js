
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Node.js + MongoDB + REST/CRUD/JSON' });
};

/*
 * GET add page.
 */

exports.add = function(req, res){
  res.render('add', { title: 'Node.js + MongoDB + REST/CRUD/JSON' });
};
