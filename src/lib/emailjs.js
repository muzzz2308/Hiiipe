/**
 * EmailJS helpers — contact + call booking.
 *
 * Add to .env:
 *   VITE_EMAILJS_SERVICE_ID=
 *   VITE_EMAILJS_TEMPLATE_ID=          (contact form)
 *   VITE_EMAILJS_CALL_TEMPLATE_ID=     (optional; falls back to TEMPLATE_ID)
 *   VITE_EMAILJS_PUBLIC_KEY=
 *   VITE_CONTACT_TO_EMAIL=hi@hiiipe.com
 *   VITE_CALENDLY_URL=                 (optional instant-book link)
 *
 * Contact template vars:
 *   from_name, from_email, company, service, budget, message, to_email
 *
 * Call template vars:
 *   from_name, from_email, preferred_date, time_window, topic, notes,
 *   message, to_email, form_type
 */

import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const CALL_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_CALL_TEMPLATE_ID || TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL || "hi@hiiipe.com";

export const isEmailJsConfigured = Boolean(
  SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY,
);

function assertEmail(from_name, from_email) {
  if (!from_name || !from_email) {
    throw new Error("Name and email are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!isEmailJsConfigured) {
    throw new Error(
      "Email is not connected yet. Add EmailJS keys to .env, then restart the app.",
    );
  }
}

async function send(templateId, params) {
  const result = await emailjs.send(SERVICE_ID, templateId, params, {
    publicKey: PUBLIC_KEY,
  });
  if (result.status !== 200) {
    throw new Error("Failed to send. Please try again.");
  }
  return result;
}

export async function sendContactEmail({
  name,
  email,
  company = "",
  service = "",
  budget = "",
  message,
}) {
  const from_name = String(name || "").trim();
  const from_email = String(email || "").trim();
  const body = String(message || "").trim();

  assertEmail(from_name, from_email);
  if (!body) throw new Error("Message is required.");

  return send(TEMPLATE_ID, {
    from_name,
    from_email,
    company: String(company || "").trim(),
    service: String(service || "").trim(),
    budget: String(budget || "").trim(),
    message: body,
    to_email: TO_EMAIL,
    form_type: "contact",
  });
}

export async function sendCallBookingEmail({
  name,
  email,
  date,
  time,
  topic = "",
  notes = "",
}) {
  const from_name = String(name || "").trim();
  const from_email = String(email || "").trim();
  const preferred_date = String(date || "").trim();
  const time_window = String(time || "").trim();

  assertEmail(from_name, from_email);
  if (!preferred_date) throw new Error("Please choose a preferred date.");
  if (!time_window) throw new Error("Please choose a time window.");

  const summary = [
    `20-min call request`,
    `Date: ${preferred_date}`,
    `Window: ${time_window}`,
    topic ? `Topic: ${topic}` : null,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return send(CALL_TEMPLATE_ID, {
    from_name,
    from_email,
    preferred_date,
    time_window,
    topic: String(topic || "").trim(),
    notes: String(notes || "").trim(),
    message: summary,
    to_email: TO_EMAIL,
    form_type: "call_booking",
  });
}
