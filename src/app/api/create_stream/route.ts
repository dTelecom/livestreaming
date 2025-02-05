import { Controller, CreateStreamParams } from "@/lib/controller";
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const controller = new Controller();

  try {
    const reqBody = await req.json();
    const clientIp = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

    const response = await controller.createStream(
      reqBody as CreateStreamParams,
      clientIp
    );

    return NextResponse.json(response);
  } catch (err) {
    console.log(err)
    if (err instanceof Error) {
      return new NextResponse(err.message, { status: 500 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
