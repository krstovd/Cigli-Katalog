import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">ПРЕМИУМ ДЕКОРАТИВНИ</p>
        <h1>ДЕКОРАТИВНИ<br />ГИПСЕНИ ЦИГЛИ</h1>
        <p>Рачно изработени модели со уникатен изглед<br />за модерен и топол ентериер.</p>
        <div className="button-row">
          <Link href="/catalog" className="gold-button">РАЗГЛЕДАЈ КАТАЛОГ <b>→</b></Link>
          <Link href="/contact" className="outline-button">КОНТАКТИРАЈ НÈ</Link>
        </div>
        <span className="scroll-hint">↓ &nbsp; СКРОЛУВАЈ НАДОЛУ</span>
      </div>
    </section>
  );
}
