import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/images/zmaga-logo.png" alt="ZMAGA Декоративни цигли" width={190} height={95} />
          <p>Уникатни декоративни гипсени цигли за модерен и топол ентериер.</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/profile.php?id=100080947414300" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg className="facebook-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H7.8V13h2.7v8h3.2Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/zmagadekocigli" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
                <circle cx="12" cy="12" r="4.1" />
                <circle className="instagram-dot" cx="17.35" cy="6.85" r="1" />
              </svg>
            </a>
          </div>
        </div>
        <nav><h4>БРЗИ ЛИНКОВИ</h4><Link href="/">Почетна</Link><Link href="/catalog">Каталог</Link><Link href="/inspiration">Инспирација</Link><Link href="/about">За нас</Link><Link href="/contact">Контакт</Link></nav>
        <div><h4>КОНТАКТ</h4><a href="https://maps.google.com/?q=Zmaga+Dekorativni+Cigli" target="_blank" rel="noreferrer">Крум Вранински 29<br />2300 Кочани</a><a href="tel:+38970842079">+389 70 842 079</a><a href="mailto:zmaga.dooel@yahoo.com">zmaga.dooel@yahoo.com</a></div>
        <div><h4>РАБОТНО ВРЕМЕ</h4><p>Пон – Пет: 08:00 – 18:00</p><p>Сабота и Недела:<br />09:00 – 17:00</p></div>
      </div>
      <div className="copyright"><span>© 2026 ZMAGA Декоративни цигли.</span><span>Квалитет создаден за вашиот простор.</span></div>
    </footer>
  );
}
