import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/schoolImages',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

const handler = nextConnect();
handler.use(upload.single('image'));

handler.post((req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image is required' });
  res.status(200).json({ filename: req.file.filename });
});

export default handler;
export const config = { api: { bodyParser: false } };