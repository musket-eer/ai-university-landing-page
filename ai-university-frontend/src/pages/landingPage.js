import HeroSection from '../components/ui/heroSection';
import FeaturesSection from '../components/ui/featureSection';
import CTASection from '../components/ui/ctaSection';
import Header from '../components/ui/header';
import './landingPage.css';

function AIUniversity() {
  return (
    <div className="index-page">
    <Header />
      <HeroSection 
        tagline="Revolutionizing Education with AI-Driven Learning"
        description={<span className="description-text">Ditch outdated, rigid learning systems. Most Learned is the first AI-driven e-learning platform that adapts to you. Powered by intelligent AI agents, it designs a fully customized curriculum that evolves with your preferences, mastery, and progress. Start learning smarter, not harder—sign up now and experience education that finally understands you.
          </span>}
        primaryButton={{ text: "Join Now", link: "/signup" }}
        secondaryButton={{ text: "Learn More", link: "/learn-more" }}
      />

      <FeaturesSection 
        features={[
          {
            iconClass: "personalized-curriculum",
            title: "Tailored Learning Paths",
            description: "AI-powered algorithms design personalized curricula that adapt to your strengths, weaknesses, and learning preferences for maximum engagement and mastery.",
            link: "/personalized-curriculum"
          },
          {
            iconClass: "adaptive-platform",
            title: "Learning Style Adaptation",
            description: "The platform intelligently adjusts its teaching methods to match your preferred learning style, ensuring efficient and enjoyable learning experiences.",
            link: "/learning-style-adaptation"
          },
          {
            iconClass: "on-demand-scheduling",
            title: "Learn at Your Own Pace",
            description: "No more rigid schedules. Our AI-driven platform lets you learn when you’re ready, allowing you to progress on your own time and achieve mastery on your terms.",
            link: "/on-demand-learning"
          },
          {
            iconClass: "smart-progress",
            title: "Mastery-Based Progression",
            description: "The platform continuously assesses your progress, allowing you to move ahead only when you’ve truly mastered the material, ensuring deeper understanding and long-term retention.",
            link: "/mastery-based-learning"
          }
        ]}
      />

      <CTASection 
        title="Step into the Future of Education"
        description="Join the next generation of learners who are reshaping education with personalized, AI-driven experiences. The future of learning starts now."
        buttonText="Join the Waitlist"
        buttonLink="https://form.typeform.com/to/KyCKmBwe"  // This will direct users to your Typeform waitlist
      />
    </div>
  );
}

export default AIUniversity;

