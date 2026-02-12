import Header from './components/Header';
import Hero from './components/Hero';
import TrustLogos from './components/TrustLogos';
import ProblemSolution from './components/ProblemSolution';
import FeaturesGrid from './components/FeaturesGrid';
import FeatureHighlight from './components/FeatureHighlight';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Security from './components/Security';
import Support from './components/Support';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { headerContent } from './content/headerContent';
import { heroContent } from './content/heroContent';
import { trustLogosContent } from './content/trustLogosContent';
import { problemSolutionContent } from './content/problemSolutionContent';
import { featuresGridContent } from './content/featuresGridContent';
import { featureHighlightContent } from './content/featureHighlightContent';
import { howItWorksContent } from './content/howItWorksContent';
import { useCasesContent } from './content/useCasesContent';
import { metricsContent } from './content/metricsContent';
import { testimonialsContent } from './content/testimonialsContent';
import { pricingContent } from './content/pricingContent';
import { securityContent } from './content/securityContent';
import { supportContent } from './content/supportContent';
import { finalCtaContent } from './content/finalCtaContent';
import { footerContent } from './content/footerContent';

// Optional: Import Smooth Scroll wrapper (e.g. Lenis) here for true Awwwards feel

export default function App() {
  return (
    <div className="bg-black min-h-screen selection:bg-indigo-500/30">
      <Header content={headerContent} />
      <main>
        <Hero content={heroContent} />
        <TrustLogos content={trustLogosContent} />
        <ProblemSolution content={problemSolutionContent} />
        <FeaturesGrid content={featuresGridContent} />
        <FeatureHighlight content={featureHighlightContent} />
        <HowItWorks content={howItWorksContent} />
        <UseCases content={useCasesContent} />
        <Metrics content={metricsContent} />
        <Testimonials content={testimonialsContent} />
        <Pricing content={pricingContent} />
        <Security content={securityContent} />
        <Support content={supportContent} />
        <FinalCTA content={finalCtaContent} />
      </main>
      <Footer content={footerContent} />
    </div>
  );
}
