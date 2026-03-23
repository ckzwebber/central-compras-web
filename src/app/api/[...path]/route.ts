import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathSegments } = await params;
  const path = pathSegments.join("/");
  const url = `${API_BASE_URL}/${path}`;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const body = req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined;

  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const resHeaders = new Headers();

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      resHeaders.append("set-cookie", value);
    }
  });
  resHeaders.set("content-type", response.headers.get("content-type") || "application/json");

  return new NextResponse(response.body, {
    status: response.status,
    headers: resHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
