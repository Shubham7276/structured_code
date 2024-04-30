const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../validation/user.validation");
const { uploadFile } = require("./file.controller");
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log("uniqueSuffix", uniqueSuffix);
    const fileExtension = file.originalname.split(".").pop(); // Get the original file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension); // Add the extension to the filename
  },
});

const upload = multer({
  storage: storage,
});

const signup = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    try {
      console.log("req", req.body.form1);
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "File upload error" });
      } else if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      const filePath = path.join(__dirname, "..", "uploads", req.file.filename);

      // res.json({
      //   message: 'Image Uploaded Successfully',
      //   filePath: filePath
      // });

      const { username, email, password } = req.body;
      const { error, value } = validateUser(req.body);
      console.log("error, value", error, value);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        profileImage: filePath, // Save the file path in the profileImage field
      });
      // const newUser = new User({ ...req.body, password: hashedPassword});
      await newUser.save();
      // const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
      res.status(201).json({ data: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// const signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const { error, value } = validateUser(req.body);
//     console.log('error, value', error, value);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Upload file before creating user
//     uploadFile(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: 'File upload error' });
//       }

//       const newUser = new User({
//         username: username,
//         email: email,
//         password: hashedPassword,
//         profileImage: req.file.filePath, // Assuming 'filePath' is the key for uploaded file path
//       });

//       await newUser.save();
//       res.status(201).json({ data: newUser });
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
};
