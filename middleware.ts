import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Only initialise if env vars are present (skips during local dev without Upstash)
function getRatelimiter(requests: number, window: `${number} ${"s" | "m" | "h" | "d"}`) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(requests, window),
  });
}

// Stricter limit for admin login attempts
const loginLimiter = getRatelimiter(5, "15 m");

// Moderate limit for public order submissions
const orderLimiter = getRatelimiter(5, "10 m");

// Light limit for payment verification probing
const verifyLimiter = getRatelimiter(10, "5 m");

export async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { pathname } = req.nextUrl;

  let limiter: Ratelimit | null = null;

  if (pathname === "/api/auth/callback/credentials") {
    limiter = loginLimiter;
  } else if (pathname === "/api/orders") {
    limiter = orderLimiter;
  } else if (pathname === "/api/flutterwave/verify") {
    limiter = verifyLimiter;
  }

  if (limiter) {
    try {
      const { success, limit, remaining, reset } = await limiter.limit(ip);

      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": String(limit),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(reset),
              "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
            },
          }
        );
      }

      const res = NextResponse.next();
      res.headers.set("X-RateLimit-Limit", String(limit));
      res.headers.set("X-RateLimit-Remaining", String(remaining));
      return res;
    } catch {
      // Redis unavailable - fail open so auth is never blocked by infra issues
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/callback/credentials",
    "/api/orders",
    "/api/flutterwave/verify",
  ],
};
