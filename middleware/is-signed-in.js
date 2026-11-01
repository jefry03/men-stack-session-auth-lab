const isSignedIn = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/auth/sign-in'); // Ensure return or clean execution path
};
module.exports = isSignedIn;