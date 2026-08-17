import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const products = ["AMBER", "ARENA", "RUSTIK", "NOTTE"];
const inspiration = [
  ["ДНЕВНИ СОБИ", "ARENA.webp"],
  ["КУЈНИ", "RUSTIK.webp"],
  ["РЕСТОРАНИ", "GOTIK.webp"],
  ["КАФУЛИЊА", "AMBER.webp"],
];

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="benefits">
        {[
          ["◇", "ВИСОК КВАЛИТЕТ", "Произведени од висококвалитетен гипс."],
          ["⌘", "МОДЕРЕН ДИЗАЈН", "Современи и класични модели."],
          ["♧", "ЛЕСНА МОНТАЖА", "Лесно се поставуваат и одржуваат."],
          ["▣", "БРЗА ИСПОРАКА", "Сигурна испорака низ Македонија."],
        ].map(([icon, title, text]) => <div key={title}><i>{icon}</i><span><b>{title}</b><small>{text}</small></span></div>)}
      </section>

      <section className="light-section home-catalog">
        <div className="section-intro dark-copy">
          <p className="eyebrow">КАТАЛОГ</p>
          <h2>Нашиот каталог</h2>
          <p>Откријте повеќе од 47 различни модели декоративни гипсени цигли.</p>
          <Link href="/catalog" className="black-button">ВИДИ ГИ СИТЕ МОДЕЛИ →</Link>
        </div>
        <div className="product-row">
          {products.map(name => (
            <Link href="/catalog" className="product-card light" key={name}>
              <Image src={`/images/${name}.webp`} alt={name} width={360} height={320} />
              <b>{name}</b><small>Декоративна гипсена цигла</small><span>60лв / m²　→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-section inspiration-preview">
        <div className="section-intro">
          <p className="eyebrow">ИНСПИРАЦИЈА</p>
          <h2>Инспирирајте ги<br />вашите простори</h2>
          <p>Погледнете како декоративните цигли го трансформираат секој простор.</p>
          <Link href="/inspiration" className="gold-button">ПРОГЛЕДАЈ ИНСПИРАЦИЈА →</Link>
        </div>
        <div className="inspiration-row">
          {inspiration.map(([title, image]) => <Link href="/inspiration" className="scene-card" key={title}><Image src={`/images/${image}`} alt={title} fill /><b>{title}</b></Link>)}
        </div>
      </section>

      <section className="stats light-section">
        {[["12+", "ГОДИНИ ИСКУСТВО"], ["800+", "ЗАВРШЕНИ ПРОЕКТИ"], ["500+", "ЗАДОВОЛНИ КЛИЕНТИ"], ["100%", "ПОСВЕТЕНОСТ НА КВАЛИТЕТ"]].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
      </section>
      <Footer />
    </main>
  );
}
