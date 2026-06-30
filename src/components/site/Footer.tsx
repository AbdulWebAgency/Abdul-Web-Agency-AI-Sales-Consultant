import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import logoAsset from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <img src={logoAsset.url} alt="Abdul Web Agency" width={160} height={40} className="h-10 w-auto" />
          <p className="mt-4 text-sm">Modern websites for growing businesses. Built by Abdul Rahim.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
            <li><a href="#process" className="hover:text-white">Process</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-white">WhatsApp: {WHATSAPP_DISPLAY}</a></li>
            <li><a href="mailto:abdulwebagency@gmail.com" className="hover:text-white">abdulwebagency@gmail.com</a></li>
            <li><a href="#contact" className="hover:text-white">Request a quote</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Abdul Web Agency. All rights reserved.</span>
          <span>Crafted with care.</span>
        </div>
      </div>
    </footer>
  );
}