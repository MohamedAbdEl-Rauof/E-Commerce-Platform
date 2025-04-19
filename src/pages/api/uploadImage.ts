import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method === 'POST') {
    const { imageBase64 } = req.body;

    try {
      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        
        folder: 'my_nextjs_uploads',

      });


      return res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      return res.status(500).json({ error: 'Upload failed'});
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}