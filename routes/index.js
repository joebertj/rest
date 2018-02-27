
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

/*
 * GET edit page.
 */

exports.edit = function(req, res){
  res.render('edit', { title: 'Node.js + MongoDB + REST/CRUD/JSON', id: req.query.id, name: req.query.name, pro: req.query.pro });
};
