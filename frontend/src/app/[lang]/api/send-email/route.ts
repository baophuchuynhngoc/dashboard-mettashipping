import {NextResponse} from "next/server";
import sendEmail from "../../utils/sendEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await sendEmail(body.data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.log("error", error);
    // Delete the created collection if it fails to import the first time
    return NextResponse.json({error: error.message || "Something went wrong"});
  }
}