module.exports = {
  dataCheck: function(req, res, next) {
    let { name, description } = req.body;
    if (!(name && description)) {
      next({ statusCode: 400 });
    }
    if (name.length > 128) {
      next({ statusCode: 400 });
    }
    next();
  },
};
