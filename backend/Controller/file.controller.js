// controllers/fileController.js
// const multer = require('multer');
// const path = require('path');

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' });

// const uploadFile = (req, res) => {
//   upload.single('file')(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ error: 'File upload error' });
//     } else if (err) {
//       return res.status(500).json({ error: 'Server error' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Access the uploaded file information
//     const { originalname, filename } = req.file;

//     // You can save the file path or URL in your database
//     const fileExtension = originalname.split('.').pop();
//     console.log('fileExtension', fileExtension)
//     const filePath = path.join(__dirname, '..', 'uploads', filename + '.' + fileExtension);
//     console.log('filePath', filePath)

//     // Example response with the file information
//     res.status(200).json({ message: 'File uploaded successfully', originalname, filename, filePath });
//   });
// };

// module.exports = {
//   uploadFile,
// };


// controllers/fileController.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log('uniqueSuffix', uniqueSuffix)
    const fileExtension = file.originalname.split('.').pop(); // Get the original file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Add the extension to the filename
  }
});

const upload = multer({ 
  storage: storage
});

const uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    console.log('req', req.body.form1)
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename );

    res.json({
      message: 'Image Uploaded Successfully',
      filePath: filePath
    });
  });
};

module.exports = {
  uploadFile,
};
