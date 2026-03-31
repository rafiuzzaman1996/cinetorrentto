// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from "next/headers";

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string }> }) {
  const path = (await params).path;
  const accessToken = req.cookies.get('accessToken')?.value;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}${req.nextUrl.search}`;

  const resp = await fetch(url, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      // forward other headers as needed
    },
    method: 'GET',
  });

  const data = await resp.arrayBuffer();
  const res = new NextResponse(data, { status: resp.status });
  // forward any headers you need
  return res;
}