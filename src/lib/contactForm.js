/**
 * Web3Forms — contact form delivery to info@hiiipe.com
 *
 * Add to .env:
 *   VITE_WEB3FORMS_ACCESS_KEY=
 *
 * Setup: https://web3forms.com — verify info@hiiipe.com once in Titan webmail.
 */

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

export const isContactFormConfigured = Boolean(ACCESS_KEY);

function assertEmail(name, email) {
  if (!name || !email) {
    throw new Error("Name and email are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!isContactFormConfigured) {
    throw new Error(
      "Form is not connected yet. Add VITE_WEB3FORMS_ACCESS_KEY to .env, then restart the app.",
    );
  }
}

function parseWeb3FormsResponse(data, ok) {
  if (data.success === false || data.body?.success === false) {
    return {
      success: false,
      message: data.message ?? data.body?.message ?? "Failed to send. Please try again.",
    };
  }

  if (ok) {
    return {
      success: true,
      message: data.message ?? data.body?.message ?? "Email sent successfully.",
    };
  }

  return {
    success: false,
    message: data.message ?? data.body?.message ?? "Failed to send. Please try again.",
  };
}

export async function sendContactEmail({
  name,
  email,
  company = "",
  service = "",
  message,
  honeypot = "",
}) {
  if (honeypot) return { success: true };

  const from_name = String(name || "").trim();
  const from_email = String(email || "").trim();
  const body = String(message || "").trim();
  const companyText = String(company || "").trim();
  const serviceText = String(service || "").trim();

  assertEmail(from_name, from_email);
  if (!body) throw new Error("Message is required.");

  const fullMessage = [
    body,
    companyText ? `Company: ${companyText}` : null,
    serviceText ? `Service: ${serviceText}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const payload = new FormData();
  payload.append("access_key", ACCESS_KEY);
  payload.append("name", from_name);
  payload.append("email", from_email);
  payload.append("subject", `New inquiry from ${from_name} — hiiipe`);
  payload.append("message", fullMessage);
  payload.append("botcheck", "");

  let res;
  try {
    res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const raw = await res.text();
  let data = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error("Unexpected response from mail service. Please try again.");
  }

  const { success, message: apiMessage } = parseWeb3FormsResponse(data, res.ok);

  if (success) {
    return data;
  }

  throw new Error(apiMessage);
}
