import { Controller, CreateStreamParams } from "@/lib/controller";
import requestIp from "request-ip";

export async function POST(req: Request) {
  const controller = new Controller();

  try {
    const reqBody = await req.json();
    const clientIp = requestIp.getClientIp(req) || undefined;
    const response = await controller.createStream(
      reqBody as CreateStreamParams,
      clientIp
    );

    return Response.json(response);
  } catch (err) {
    console.log(err)
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}
