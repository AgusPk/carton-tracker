import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import User from '@/models/user';
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  picture: z.string().optional(),
  sub: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const userData = {
      email: session.user.email,
      name: session.user.name,
      picture: session.user.picture,
      sub: session.user.sub,
    };

    // Validate user data
    const validationResult = UserSchema.safeParse(userData);
    if (!validationResult.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid user data', 
          details: validationResult.error.errors 
        }), 
        { status: 400 }
      );
    }

    // Find or create user
    const user = await User.findOneAndUpdate(
      { email: userData.email },
      { 
        ...userData,
        lastLogin: new Date(),
      },
      { 
        upsert: true, 
        new: true,
        runValidators: true 
      }
    );

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const users = await User.find({}, { email: 1, name: 1, picture: 1, _id: 0 });

    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
} 