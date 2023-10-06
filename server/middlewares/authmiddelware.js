// const jwt = require('jsonwebtoken')


// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"].split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Auth Failed",
//         });
//       } else {
//         req.body.userId = decode.userId;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send({
//       success: false,
//       error,
//       message: "Auth Failedd",
//     });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Auth Failed: Token is missing",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Auth Failed: Invalid token",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      error: error.message,
      message: "Auth Failed",
    });
  }
};
