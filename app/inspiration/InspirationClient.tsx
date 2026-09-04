"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Footer from "@/app/components/Footer";
import ImageModal from "@/app/components/ImageModal";
import { useLang, type Lang } from "@/app/context/LangContext";

type IconName="all"|"living"|"kitchen"|"restaurant"|"cafe"|"bedroom"|"fireplace"|"bathroom"|"facade";
type SpaceImage={file:string;model:string};
type Space={id:IconName;title:Record<Lang,string>;images:SpaceImage[]};

const spaces:Space[]=[
  {id:"living",title:{mk:"ДНЕВНИ СОБИ",en:"LIVING ROOMS"},images:[
    {file:"living-arena-final.webp",model:"ARENA"},
    {file:"living-loft-final-02.webp",model:"LOFT"},
    {file:"living-santo-running-bond-v2.webp",model:"SANTO"},
    {file:"living-azura-catalog-v4.webp",model:"AZURA"},
    {file:"living-lago-pattern-v4.webp",model:"LAGO"},
      {file:"living-colos-black-detail-v5.webp",model:"COLOS"},
  ]},
  {id:"kitchen",title:{mk:"КУЈНИ",en:"KITCHENS"},images:[
    {file:"kitchen-rustik-final.webp",model:"RUSTIK"},
    {file:"kitchen-metro-final-02.webp",model:"METRO"},
    {file:"kitchen-santo-relief-v4.webp",model:"SANTO"},
    {file:"kitchen-azura-relief-v4.webp",model:"AZURA"},
    {file:"kitchen-lago-relief-v4.webp",model:"LAGO"},
    {file:"kitchen-colos-relief-v4.webp",model:"COLOS"},
  ]},
  {id:"restaurant",title:{mk:"РЕСТОРАНИ",en:"RESTAURANTS"},images:[
    {file:"restaurant-gotik-final.webp",model:"GOTIK"},
    {file:"restaurant-metro-final-02.webp",model:"METRO"},
    {file:"restaurant-santo-realistic-v4.webp",model:"SANTO"},
    {file:"restaurant-azura-model-v2.webp",model:"AZURA"},
    {file:"restaurant-lago-realistic-v4.webp",model:"LAGO"},
    {file:"restaurant-colos-model-v2.webp",model:"COLOS"},
  ]},
  {id:"cafe",title:{mk:"КАФУЛИЊА",en:"CAFÉS"},images:[
    {file:"cafe-amber-running-bond-v3.webp",model:"AMBER"},
    {file:"cafe-cooper-final-02.webp",model:"COOPER"},
    {file:"cafe-santo-real-v2.webp",model:"SANTO"},
    {file:"cafe-azura-real-v2.webp",model:"AZURA"},
    {file:"cafe-lago-real-v2.webp",model:"LAGO"},
    {file:"cafe-colos-real-v2.webp",model:"COLOS"},
  ]},
  {id:"fireplace",title:{mk:"КАМИНИ",en:"FIREPLACES"},images:[
    {file:"fireplace-notte-final.webp",model:"NOTTE"},
    {file:"fireplace-magma-final-02.webp",model:"MAGMA"},
    {file:"fireplace-santo-v1.webp",model:"SANTO"},
    {file:"fireplace-azura-geometry-v2.webp",model:"AZURA"},
    {file:"fireplace-lago-v1.webp",model:"LAGO"},
    {file:"fireplace-colos-v1.webp",model:"COLOS"},
  ]},
  {id:"bedroom",title:{mk:"СПАЛНИ СОБИ",en:"BEDROOMS"},images:[
    {file:"bedroom-arena-final.webp",model:"ARENA"},
    {file:"bedroom-luna-running-bond-v3.webp",model:"LUNA"},
    {file:"bedroom-santo-v1.webp",model:"SANTO"},
    {file:"bedroom-azura-geometry-v2.webp",model:"AZURA"},
    {file:"bedroom-lago-geometry-v2.webp",model:"LAGO"},
    {file:"bedroom-colos-geometry-v2.webp",model:"COLOS"},
  ]},
  {id:"bathroom",title:{mk:"БАЊИ",en:"BATHROOMS"},images:[
    {file:"bathroom-aura-final.webp",model:"AURA"},
    {file:"bathroom-lumina-final-02.webp",model:"LUMINA"},
    {file:"bathroom-santo-running-bond-v3.webp",model:"SANTO"},
    {file:"bathroom-azura-geometry-v2.webp",model:"AZURA"},
    {file:"bathroom-lago-geometry-v2.webp",model:"LAGO"},
    {file:"bathroom-colos-geometry-v2.webp",model:"COLOS"},
  ]},
  {id:"facade",title:{mk:"ФАСАДИ",en:"FACADES"},images:[
    {file:"facade-virtus-final.webp",model:"VIRTUS"},
    {file:"facade-fortis-house-v5.webp",model:"FORTIS"},
    {file:"facade-santo-modern-v8.webp",model:"SANTO"},
    {file:"facade-azura-fixed-v3.webp",model:"AZURA"},
    {file:"facade-lago-fixed-v3.webp",model:"LAGO"},
    {file:"facade-colos-fixed-v3.webp",model:"COLOS"},
  ]},
];

function Icon({name}:{name:IconName}){
  const paths:Record<IconName,React.ReactNode>={
    all:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h10M7 9h.01m3 4 2-2 4 4 2-2 3 3"/></>,
    living:<><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 12h2a2 2 0 0 1 2 2v2h8v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2Z"/><path d="M5 18v2m14-2v2"/></>,
    kitchen:<><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10h18M10 4v16M6 7h1m6 0h5m-5 6h5m-5 4h5"/></>,
    restaurant:<><path d="M3 18h18M5 18a7 7 0 0 1 14 0M12 7V4m-2 0h4"/></>,
    cafe:<><path d="M4 7h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V7Zm13 2h2a3 3 0 0 1 0 6h-3M3 21h17M8 3v2m4-2v2"/></>,
    bedroom:<><path d="M3 12h18v7H3zM5 12V8h6a3 3 0 0 1 3 3v1m-9 7v2m14-2v2"/></>,
    fireplace:<><path d="M4 3h16v18H4zM7 7h10v11H7zM9 18c0-3 3-3 3-7 3 2 4 4 3 7"/></>,
    bathroom:<><path d="M3 11h18v2a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-2Zm3 9v2m12-2v2M6 11V6a3 3 0 0 1 6 0"/><path d="M10 7h4"/></>,
    facade:<><path d="m3 11 9-8 9 8v10H3V11Zm4 10v-7h4v7m4 0v-7h3v7"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function InspirationClient(){
  const {lang}=useLang();
  const [category,setCategory]=useState<IconName>("all");
  const [selected,setSelected]=useState<string|null>(null);
  const visible=useMemo(()=>category==="all"?spaces.map(space=>({space,image:space.images[0]})):spaces.filter(x=>x.id===category).flatMap(space=>space.images.map(image=>({space,image}))),[category]);
  const selectedIndex=selected?visible.findIndex(({image})=>image.file===selected):-1;
  const closePreview=useCallback(()=>setSelected(null),[]);
  const previousPreview=useCallback(()=>setSelected(current=>{
    const index=current?visible.findIndex(({image})=>image.file===current):-1;
    return visible[(index-1+visible.length)%visible.length]?.image.file??null;
  }),[visible]);
  const nextPreview=useCallback(()=>setSelected(current=>{
    const index=current?visible.findIndex(({image})=>image.file===current):-1;
    return visible[(index+1)%visible.length]?.image.file??null;
  }),[visible]);
  const selectCategory=(nextCategory:IconName)=>{setCategory(nextCategory);setSelected(null);};
  return <main className="inspo-v2">
    <section className="inspo-v2-hero"><Image src="/images/inspiration/final-rooms/fireplace-notte-final.webp" alt="" fill priority sizes="100vw"/><div className="inspo-v2-overlay"/><div className="inspo-v2-hero-copy"><p>{lang==="mk"?"ИНСПИРАЦИЈА":"INSPIRATION"}</p><h1>{lang==="mk"?<>Инспирираме<br/>ваши простори</>:<>We inspire<br/>your spaces</>}</h1><span>{lang==="mk"?"Погледнете како нашите декоративни гипсени цигли го трансформираат секој простор во нешто посебно.":"See how our decorative gypsum bricks transform every space into something special."}</span></div></section>
    <section className="inspo-v2-shell">
      <div className="inspo-v2-filters" role="group" aria-label={lang==="mk"?"Категории":"Categories"}><button className={category==="all"?"active":""} onClick={()=>selectCategory("all")}><Icon name="all"/>{lang==="mk"?"СИТЕ ПРОСТОРИ":"ALL SPACES"}</button>{spaces.map(space=><button className={category===space.id?"active":""} onClick={()=>selectCategory(space.id)} key={space.id}><Icon name={space.id}/>{space.title[lang]}</button>)}</div>
      <div className={`inspo-v2-grid${category!=="all"?" selected":""}`}>{visible.map(({space,image},index)=><article key={`${space.id}-${image.file}`} role="button" tabIndex={0} aria-label={`${lang==="mk"?"Отвори слика":"Open image"}: ${space.title[lang]} ${image.model}`} onClick={()=>setSelected(image.file)} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();setSelected(image.file);}}}><Image src={`/images/inspiration/final-rooms/${image.file}`} alt={`${space.title[lang]} — ${image.model}`} fill sizes="(max-width:700px) 100vw, 25vw"/><div className="inspo-card-shade"/><div className="inspo-card-copy"><b>{space.title[lang]}</b><small>{lang==="mk"?"Модел":"Model"} {image.model} · {String(index+1).padStart(2,"0")}</small></div><span className="inspo-card-arrow" aria-hidden="true">→</span></article>)}</div>
      <aside className="inspo-v2-cta"><div className="inspo-v2-cta-icon"><Icon name="all"/></div><div><h2>{lang==="mk"?"Имате проект?":"Have a project?"}</h2><p>{lang==="mk"?"Испратете ни фотографија и ние ќе ви помогнеме да го изберете најдобриот модел.":"Send us a photo and we'll help you choose the best model."}</p></div><Link href="/contact" className="gold-button">{lang==="mk"?"КОНТАКТИРАЈТЕ НÈ":"CONTACT US"}<span>→</span></Link></aside>
    </section><Footer/>
    {selected&&selectedIndex>=0&&<ImageModal src={`/images/inspiration/final-rooms/${selected}`} alt={`${visible[selectedIndex].space.title[lang]} — ${visible[selectedIndex].image.model}`} onClose={closePreview} onPrevious={previousPreview} onNext={nextPreview} currentPosition={selectedIndex+1} total={visible.length}/>} 
  </main>;
}
