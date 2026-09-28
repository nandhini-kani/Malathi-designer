import { MessageCircle } from "lucide-react";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918248744594";

const message =
  "Hi Malathi Designer, I would like to enquire about tailoring services.";

export default function WhatsAppButton() {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Malathi Designer on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <MessageCircle size={21} />
      <span className="hidden sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}