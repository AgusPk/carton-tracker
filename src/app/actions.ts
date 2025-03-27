'use server'

import { getSession } from '@auth0/nextjs-auth0';
import User from '@/models/user';

export async function syncUser() {
  try {
    const session = await getSession();
    
    if (session?.user) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        {
          email: session.user.email,
          name: session.user.name,
          picture: session.user.picture,
          sub: session.user.sub,
          lastLogin: new Date(),
        },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error('Error syncing user:', error);
  }
} 