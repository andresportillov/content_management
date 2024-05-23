module.exports = function (req, res, next) {
  console.log(req);
    if (req.user.role !== 'creador' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
  