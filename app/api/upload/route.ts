import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Upload the file to Vercel Blob!
    const blob = await put(file.name, file, {
      access: 'public',
    });
    
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed. Did you add the BLOB_READ_WRITE_TOKEN to .env?' }, { status: 500 });
  }
}
