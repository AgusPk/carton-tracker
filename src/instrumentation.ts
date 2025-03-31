import connect from '@/lib/db';

export async function register() {
  // Skip database connection in edge runtime
  if (process.env.NEXT_RUNTIME === 'edge') {
    return;
  }

  try {
    await connect();
  } catch (error) {
    console.error('Failed to connect to database in instrumentation hook:', error);
    // Don't throw the error to prevent the app from crashing
  }
}
