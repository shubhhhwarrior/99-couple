/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const comedians = await db.collection('users')
      .find({
        isComedian: true,
        'comedianProfile.status': 'approved'
      })
      .project({
        password: 0,
        email: 0,
      })
      .toArray();

    res.status(200).json({ comedians });
  } catch (error) {
    console.error('Fetch comedians error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 