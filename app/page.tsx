import HeroSection        from '@/components/home/HeroSection';
import SejournSection     from '@/components/home/SejournSection';
import VoituresSection    from '@/components/home/VoituresSection';
import ImmoSection        from '@/components/home/ImmoSection';
import BlogSection        from '@/components/home/BlogSection';
import TemoignagesSection from '@/components/home/TemoignagesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SejournSection />
      <VoituresSection />
      <ImmoSection />
      <BlogSection />
      <TemoignagesSection />
    </>
  );
}
