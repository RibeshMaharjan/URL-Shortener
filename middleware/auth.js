import auth from "../services/auth.js";

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });

  const token = tokenCookie;
  const user = auth.getUser(token);

  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    next();
  }
}

// async function restrictToLoggedinUserOnly(req, res, next) {

//   const userUid = req.headers['authorization'];

//   console.log(req.headers);

//   if (!userUid) {
//     return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
//   }
//   const token = userUid.split(' ')[1];

//   const user = auth.getUser(token);

//   if (!user) {
//     return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {

//   const userUid = req.cookies?.uid;
//   const user = auth.getUser(userUid);

//   req.user = user;
//   next();
// }

export default {
  checkForAuthentication,
  restrictTo
};