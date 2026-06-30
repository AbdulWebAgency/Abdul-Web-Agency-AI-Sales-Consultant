// Edit this number to update the WhatsApp contact across the site.
export const WHATSAPP_NUMBER = "+918977177806";
export const WHATSAPP_DISPLAY = "+91 8977177806";

export function whatsappLink(message = "Hi Abdul, I'd like to discuss a website for my business.") {
  const clean = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}