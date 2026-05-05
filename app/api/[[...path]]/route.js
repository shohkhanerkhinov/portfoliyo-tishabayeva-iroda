import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const path = params?.path?.join('/') || '';
  if (path === 'health') {
    return NextResponse.json({ status: 'ok', service: 'academic-portfolio' });
  }
  return NextResponse.json({ message: 'Academic Portfolio API' });
}

export async function POST(request, { params }) {
  const path = params?.path?.join('/') || '';
  if (path === 'contact') {
    try {
      const body = await request.json();
      // In production, send email or save to DB. For MVP, log and return success.
      console.log('Contact form submission:', body);
      return NextResponse.json({ success: true, message: 'Message received' });
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
  }
  return NextResponse.json({ message: 'Not found' }, { status: 404 });
}
