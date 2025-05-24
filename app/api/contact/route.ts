import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message, subscribe } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    // Email message
    await transporter.sendMail({
      from: "delivered@resend.dev",
      to: "contactpawandai@gmail.com",
      subject: `New contact from ${name} (${email})`,
      text: `Message: ${message}\n\nSubscribe to Newsletter: ${
        subscribe ? "Yes" : "No"
      }`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to send the message. Please try again." },
      { status: 500 }
    );
  }
}
