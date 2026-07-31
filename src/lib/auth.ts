import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "codelogix_session";

function getSecret() {
  return process.env.SESSION_SECRET || "development-session-secret-change-before-production";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken(email: string) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 8;
  const payload = Buffer.from(JSON.stringify({ email, expiresAt })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const valid =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return null;

  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
    email: string;
    expiresAt: number;
  };
  if (!parsed.email || parsed.expiresAt < Date.now()) return null;
  return parsed;
}

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export const authCookie = {
  name: COOKIE_NAME,
  maxAge: 60 * 60 * 8,
};
