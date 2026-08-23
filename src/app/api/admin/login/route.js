import { NextResponse } from 'next/server';

const attempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const record = attempts.get(ip);

  if (record && now - record.firstAttempt < WINDOW_MS) {
    if (record.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Too many attempts. Try again later.' },
        { status: 429 }
      );
    }
  } else {
    attempts.set(ip, { count: 0, firstAttempt: now });
  }

  const { password } = await request.json();

  const current = attempts.get(ip);
  current.count += 1;
  attempts.set(ip, current);

  if (password === process.env.ADMIN_PASSWORD) {
    attempts.delete(ip); // reset on success
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', password, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}