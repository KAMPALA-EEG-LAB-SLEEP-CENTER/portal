import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PatientStories from '../components/PatientStories';
import FAQ from '../components/FAQ';
import CTABanner from "../components/CTABanner";
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <PatientStories />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  );
}

export default Home;
