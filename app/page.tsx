import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const products = [
  { name: "AMBER", image: "AMBER" },
  { name: "ARENA", image: "ARENA" },
  { name: "RUSTIK", image: "RUSTIK" },
  { name: "NOTTE", image: "NOTTE" },
  { name: "LUMINA", image: "LUMINA" },
];
const inspiration = [
  ["ДНЕВНИ СОБИ", "inspiration/living-room-arena-v2.png"],
  ["КУЈНИ", "inspiration/kitchen-rustik-v2.png"],
  ["РЕСТОРАНИ", "inspiration/restaurant-gotik-v2.png"],
  ["КАФУЛИЊА", "inspiration/cafe-amber-v2.png"],
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
          <Link href="/catalog" className="black-button home-catalog-button"><span>ВИДИ ГИ СИТЕ МОДЕЛИ</span><b>→</b></Link>
        </div>
        <div className="product-row">
          {products.map(({ name, image }) => (
            <Link href="/catalog" className="product-card light home-product-card" key={name}>
              <div className="home-product-image">
                <Image src={`/images/home/${image}.webp`} alt={`${name} декоративна цигла во ентериер`} fill sizes="(min-width: 1051px) 260px, (min-width: 701px) 30vw, 45vw" />
              </div>
              <b>{name}</b><small>Декоративна гипсена цигла</small><span>60лв / m²　→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-section inspiration-preview">
        <div className="section-intro">
          <p className="eyebrow">ИНСПИРАЦИЈА</p>
          <h2>Инспирирајте ги вашите простори</h2>
          <p>Погледнете како декоративните цигли го трансформираат секој простор.</p>
          <Link href="/inspiration" className="gold-button inspiration-button"><span>ПРОГЛЕДАЈ ИНСПИРАЦИЈА</span><b>→</b></Link>
        </div>
        <div className="inspiration-row">
          {inspiration.map(([title, image]) => <Link href="/inspiration" className="scene-card" key={title}><Image src={`/images/${image}`} alt={`${title} со декоративни цигли од каталогот`} fill sizes="(min-width: 1051px) 18vw, (min-width: 701px) 45vw, 50vw" /><b>{title}</b></Link>)}
        </div>
      </section>

      <section className="stats light-section">
        {[["12+", "ГОДИНИ ИСКУСТВО"], ["800+", "ЗАВРШЕНИ ПРОЕКТИ"], ["500+", "ЗАДОВОЛНИ КЛИЕНТИ"], ["100%", "ПОСВЕТЕНОСТ НА КВАЛИТЕТ"]].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
      </section>
      <Footer />
    </main>
  );
}
