import { NextRequest, NextResponse } from "next/server";

export type SessionPayload = {
  username: string;
  exp: number;
};

const COOKIE_NAME = "admin_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return secret;
}

function encodeBase64(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function compareTokens(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function createSignature(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return encodeBase64(String.fromCharCode(...new Uint8Array(signature)));
}

export async function createSessionToken(payload: SessionPayload) {
  const encoded = encodeBase64(JSON.stringify(payload));
  const signature = await createSignature(encoded);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(token: string | null | undefined) {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  try {
    const expected = await createSignature(encoded);
    if (!compareTokens(signature, expected)) return null;

    const payload = JSON.parse(decodeBase64(encoded)) as SessionPayload;
    if (!payload.username || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(req: NextRequest) {
  return verifySessionToken(req.cookies.get(COOKIE_NAME)?.value);
}

export async function setSessionCookie(res: NextResponse, payload: SessionPayload) {
  const token = await createSessionToken(payload);
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return res;
}
