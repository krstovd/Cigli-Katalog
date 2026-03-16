import { getGalleryImages } from "@/lib/images";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export const metadata = {
  alternates: {
    canonical: "https://zmagacigli.com/",
  },
};

export default function Home() {
  const images = getGalleryImages();

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden text-white">
      <Hero />
      <Gallery images={images} />
      <Footer />
    </div>
  );
}
