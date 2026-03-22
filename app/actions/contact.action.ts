'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const sendContactEmail = async (prevState: any, formData: FormData) => {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${result.data.name}" <${process.env.GMAIL_USER}>`,
      to: 'deepanshuhead200@gmail.com',
      replyTo: result.data.email,
      subject: `Portfolio Contact: Message from ${result.data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #818cf8; margin-bottom: 8px;">New Contact Message</h2>
          <hr style="border-color: #334155; margin-bottom: 20px;" />
          <p><strong style="color: #94a3b8;">From:</strong> ${result.data.name}</p>
          <p><strong style="color: #94a3b8;">Email:</strong> ${result.data.email}</p>
          <p><strong style="color: #94a3b8;">Message:</strong></p>
          <p style="background: #1e293b; padding: 16px; border-radius: 8px; border-left: 4px solid #6366f1;">${result.data.message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    });

    return { errors: {}, success: true };
  } catch (err) {
    console.error('Email sending error:', err);
    return { errors: { _form: ['Failed to send message. Please try again later.'] } };
  }
};
