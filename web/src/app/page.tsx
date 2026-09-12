import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import Portfolio from "@/components/Portfolio";
import Programs from "@/components/Programs";
import Reviews from "@/components/Reviews";
import Solutions from "@/components/Solutions";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Programs />
        <Solutions />
        <Portfolio />
        <Reviews />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
