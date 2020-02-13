module.exports = (req, res, next) => {
  req.userId = req.params.id || req.query.id || req.body.id;
  if (req.userId) {
    return next();
  }
};