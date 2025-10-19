import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      })
    : null;

const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 req/min por IP
      analytics: true,
      prefix: 'ratelimit',
    })
  : null;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/contact')) {
    if (!limiter) return NextResponse.next();

    const ip =
      req.ip ??
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      '127.0.0.1';

    const { success, limit, reset, remaining } = await limiter.limit(`contact:${ip}`);

    const res = success
      ? NextResponse.next()
      : NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

    res.headers.set('X-RateLimit-Limit', String(limit));
    res.headers.set('X-RateLimit-Remaining', String(remaining));
    res.headers.set('X-RateLimit-Reset', String(reset));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact'],
};
