import { NextResponse } from 'next/server';

export const POST = () => {
  // Set the token cookie to expire (clear it)
  return NextResponse.json(
    { message: 'Logged out successfully' },
    {
      headers: {
        'Set-Cookie': `token=; Path=/; Max-Age=0`, // Clear the cookie
      },
    }
  );
};
