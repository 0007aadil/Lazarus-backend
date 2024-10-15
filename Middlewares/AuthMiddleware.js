const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false });
//   }
  
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     }

//     const user = await User.findById(data.id);
//     return user ? res.json({ status: true, user: user.username }) : res.json({ status: false });
//   });
// };

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    req.userId = decoded.id; // Assuming your token contains user ID
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};



