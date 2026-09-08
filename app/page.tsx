import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Courses from "@/components/Courses";
import Differentials from "@/components/Differentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Results />
        <Courses />
        <Differentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
