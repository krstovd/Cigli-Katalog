import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";

const stats = [
  ["12+", "ГОДИНИ ИСКУСТВО", "Посветени на квалитетот и дизајнот."],
  ["800+", "ЗАВРШЕНИ ПРОЕКТИ", "Од домови до ресторани и хотели."],
  ["500+", "ЗАДОВОЛНИ КЛИЕНТИ", "Нашата најголема мотивација."],
  ["100%", "ПОСВЕТЕНОСТ НА КВАЛИТЕТ", "Контролиран процес од избор до испорака."],
];

const values = [
  ["◇", "Премиум материјали", "Користиме висококвалитетен гипс кој обезбедува издржливост и природен изглед."],
  ["⌁", "Модерен дизајн", "Ги следиме светските трендови и креираме модели за секој стил на ентериер."],
  ["⌘", "Лесна монтажа", "Нашите цигли се лесни, практични и наменети за брза и чиста монтажа."],
  ["▣", "Брза испорака", "Испорачуваме сигурно и навремено на целата територија на Македонија."],
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-copy">
          <p className="eyebrow">ЗА НАС</p>
          <h1>Страста кон<br />квалитет и дизајн</h1>
          <span className="gold-line" />
          <p>Zmaga Декоративни Цигли е бренд кој создава декоративни гипсени цигли со цел да донесе топлина и карактер во секој простор. Нашите производи комбинираат традиционална изработка со модерен дизајн, создавајќи уникатен изглед за секој дом или деловен простор.</p>
        </div>
      </section>

      <section className="about-stat-panel">
        {stats.map(([number, label, description]) => (
          <article key={label}>
            <div className="stat-top"><i>◇</i><strong>{number}</strong></div>
            <b>{label}</b>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="about-values" id="values">
        <div className="about-values-photo">
          <Image src="/images/about-values-arena.png" alt="Модерен ентериер со ZMAGA ARENA декоративни цигли" fill />
        </div>
        <div className="about-values-copy">
          <p className="eyebrow">НАШИТЕ ВРЕДНОСТИ</p>
          <h2>Што нè прави различни?</h2>
          <span className="gold-line" />
          <div className="about-values-grid">
            {values.map(([icon, title, text]) => (
              <article key={title}>
                <i>{icon}</i>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-bottom-cta">
        <div className="about-cta-main">
          <div className="cta-emblem"><Image src="/android-chrome-192x192.png" alt="" width={64} height={64} /></div>
          <div className="about-cta-copy">
            <span>БЕСПЛАТНА КОНСУЛТАЦИЈА</span>
            <h2>Пронајдете ги вистинските декоративни цигли за вашиот простор.</h2>
            <p>Испратете ни фотографија или идеја — ќе ви помогнеме со изборот на модел, количина и најдобро решение.</p>
          </div>
        </div>
        <Link href="/contact" className="gold-button about-cta-button"><span>КОНТАКТИРАЈТЕ НÈ</span><b>→</b></Link>
      </section>
      <Footer />
    </main>
  );
}
