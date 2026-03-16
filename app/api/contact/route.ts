import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TOPIC_LABELS: Record<string, string> = {
  product: "Барање за производ",
  order: "Набавка / нарачка",
  technical: "Технички прашања",
  collaboration: "Соработка",
  other: "Друго",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, topic, message } = body;

    if (!firstName || !lastName || !email || !topic || !message) {
      return NextResponse.json(
        { error: "Сите полиња се задолжителни" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY не е конфигуриран" },
        { status: 500 }
      );
    }

    const topicLabel = TOPIC_LABELS[topic] || topic;
    const html = `
      <h2>Нова порака од контакт форма</h2>
      <p><strong>Име:</strong> ${firstName} ${lastName}</p>
      <p><strong>Е-пошта:</strong> ${email}</p>
      <p><strong>Тема:</strong> ${topicLabel}</p>
      <p><strong>Порака:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL || "zmaga.dooel@yahoo.com",
      replyTo: email,
      subject: `Контакт: ${topicLabel} - ${firstName} ${lastName}`,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Грешка при испраќање" },
      { status: 500 }
    );
  }
}
