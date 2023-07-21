/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('req', req.nextUrl.pathname);
  // return new NextResponse(
  //   JSON.stringify({ success: false, message: 'authentication failed' }),
  //   { status: 401, headers: { 'content-type': 'application/json' } }
  // );
}
