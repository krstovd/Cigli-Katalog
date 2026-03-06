import { getGalleryImages } from "@/lib/images";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  const images = getGalleryImages();

  return (
    <div className="min-h-screen text-white">
      <Hero />
      <Gallery images={images} />
      <Footer />
    </div>
  );
}
