import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, address, city, state, contact, image, email_id } = req.body;
    await pool.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );
    return res.status(200).json({ message: 'School added' });
  }
  res.status(405).end();
}