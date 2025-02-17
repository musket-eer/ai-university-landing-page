import HeroSection from '../components/ui/heroSection';
import FeaturesSection from '../components/ui/featureSection';
import CTASection from '../components/ui/ctaSection';
import './landingPage.css';

function AIUniversity() {
  return (
    <div className="index-page">
      <HeroSection 
        tagline="Revolutionizing Education with AI-Driven Learning"
        description={<span className="description-text">Traditional e-learning platforms force learners into rigid categories—visual, auditory, kinesthetic—assuming that learning preferences exist in neat, discrete boxes. But real learning isn’t that simple. Your ability, style, and pace exist on a continuum, shifting with context, subject matter, and even your daily mental state.
          Our AI-driven platform breaks free from this outdated approach. AI agents continuously observe, analyze, and adapt, learning how you learn with each interaction. Whether you grasp abstract concepts instantly or need hands-on application, whether you thrive on structure or require flexible exploration, the system reshapes itself in real-time—sourcing the right material, adjusting explanations, and pacing lessons to match your evolving needs.
          With seamless integration of expert tutors, this platform ensures mastery, not just progress bars—giving you the ultimate personalized learning experience that evolves as you do. No rigid courses. No artificial constraints. Just education built around you.
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

