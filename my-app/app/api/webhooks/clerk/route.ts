// File: app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

interface WebhookEvent {
    id: string;
    type: 'user.created' | 'user.updated' | 'user.deleted' | 'session.created';
    data: {
      id: string; // Clerk User ID
      first_name?: string;
      last_name?: string;
      email_addresses?: { email_address: string }[];
      image_url?: string;
      created_at?: number;
      updated_at?: number;
      user_id?: string; // Used for session events
    };
  }

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new NextResponse('Webhook secret missing', { status: 400 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent; // ✅ Type-casting to WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error verifying webhook', { status: 400 });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      const { db } = await connectToDatabase();
      const users = db.collection('users');

      // Extract user data from the event
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
        created_at,
        updated_at,
      } = evt.data;

      // Prepare user data for MongoDB
      const userData = {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        email: email_addresses?.[0]?.email_address,
        profileImage: image_url,
        createdAt: created_at,
        updatedAt: updated_at,
        lastSignInAt: new Date().toISOString(),
      };

      // Use upsert to create or update the user
      await users.updateOne(
        { clerkId: id },
        { $set: userData },
        { upsert: true }
      );

      console.log(`User ${id} ${eventType === 'user.created' ? 'created' : 'updated'} in MongoDB`);
      return new NextResponse('User data stored in MongoDB', { status: 200 });
    } catch (error) {
      console.error('Error storing user data in MongoDB:', error);
      return new NextResponse('Error storing user data', { status: 500 });
    }
  } else if (eventType === 'user.deleted') {
    try {
      const { db } = await connectToDatabase();
      const users = db.collection('users');

      // Extract user ID from the event
      const { id } = evt.data;

      // Delete the user from MongoDB
      await users.deleteOne({ clerkId: id });

      console.log(`User ${id} deleted from MongoDB`);
      return new NextResponse('User deleted from MongoDB', { status: 200 });
    } catch (error) {
      console.error('Error deleting user from MongoDB:', error);
      return new NextResponse('Error deleting user', { status: 500 });
    }
  } else if (eventType === 'session.created') {
    try {
      const { db } = await connectToDatabase();
      const users = db.collection('users');

      // Extract user ID from the event
      const { user_id } = evt.data;

      // Update the user's last sign-in timestamp
      await users.updateOne(
        { clerkId: user_id },
        { $set: { lastSignInAt: new Date().toISOString() } }
      );

      console.log(`User ${user_id} sign-in recorded in MongoDB`);
      return new NextResponse('User sign-in recorded', { status: 200 });
    } catch (error) {
      console.error('Error recording user sign-in in MongoDB:', error);
      return new NextResponse('Error recording sign-in', { status: 500 });
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}