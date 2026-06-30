import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group inline-flex items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-white font-semibold shadow-glow hover:scale-105 transition-transform"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
        <MessageCircle size={18} className="relative" />
      </span>
      <span className="hidden sm:inline text-sm">Chat with us</span>
    </a>
  );
}