// src/pages/Home.tsx
import { motion } from 'framer-motion';
import poornima from './images/poornima.png'; 
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  ArrowRight, 
  Bot, 
  GraduationCap, 
  PenTool, 
  Award, 
  TrendingUp, 
  Users, 
  Target, 
  Eye, 
  Gem 
} from 'lucide-react';

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  learningOutcomes: string;
  formLink: string;
  imageUrl: string;
  description: string;
}

export default function Home() {
  const [nextWebinar, setNextWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the next upcoming webinar from Firestore
  useEffect(() => {
    const fetchNextWebinar = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
          collection(db, 'webinars'),
          orderBy('date', 'asc'),
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const webinar = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Webinar;
          const webinarDate = new Date(webinar.date);
          webinarDate.setHours(0, 0, 0, 0);

          if (webinarDate >= today) {
            setNextWebinar(webinar);
          }
        }
      } catch (error) {
        console.error('Error fetching next webinar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextWebinar();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Bot size={22} />,
      title: "Master AI Tools",
      description: "Learn top AI tools & prompt engineering"
    },
    {
      icon: <GraduationCap size={22} />,
      title: "AI for Education & Training",
      description: "Teach smart, save time & engage better"
    },
    {
      icon: <PenTool size={22} />,
      title: "Content Creation",
      description: "Create impactful content faster with AI"
    },
    {
      icon: <Award size={22} />,
      title: "Personal Branding",
      description: "Build your online presence & authority"
    },
    {
      icon: <TrendingUp size={22} />,
      title: "New Income Opportunities",
      description: "Monetize your skills & build multiple income streams"
    },
    {
      icon: <Users size={22} />,
      title: "Community",
      description: "Learn, collaborate & grow together"
    }
  ];

  const missionCards = [
    {
      icon: <Target size={24} />,
      title: "Our Purpose",
      description: "To empower people with AI skills that make a real impact in their teaching, work and life."
    },
    {
      icon: <Eye size={24} />,
      title: "Our Vision",
      description: "To build the world's most trusted AI learning ecosystem for educators and creators."
    },
    {
      icon: <Gem size={24} />,
      title: "Our Promise",
      description: "Practical learning, real-world impact and continuous support to help you grow."
    }
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
  ];

  return (
    <div className="flex flex-col bg-[#faf9fe]">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf9fe] to-[#f5f3ff] py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-6">
                AI Educator | Trainer | Content Creator
              </div>
              
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0f0726] leading-[1.1] tracking-tight mb-6">
                Empowering People. <br />
                Transforming Education. <br />
                <span className="text-primary-600">Building AI-Ready Futures.</span>
              </h1>
              
              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl font-medium">
                We help educators, trainers, teachers, homemakers, creators and professionals confidently master AI, simplify their work, build their personal brand and create new income opportunities.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
                <button
                  onClick={() => scrollToSection('what-i-do')}
                  className="px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-base"
                >
                  Explore Programs <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => scrollToSection('community')}
                  className="px-8 py-3.5 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200 flex items-center justify-center gap-2 text-base"
                >
                  Join AIINFLUENCERS HUB 👥
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 overflow-hidden">
                  {avatars.map((url, index) => (
                    <img
                      key={index}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                      src={url}
                      alt="User Avatar"
                    />
                  ))}
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600 text-white text-xs font-bold ring-2 ring-white select-none">
                    5000+
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Educators & Professionals</span>
                  <span className="text-xs text-gray-800 font-extrabold leading-tight">Growing With AI</span>
                </div>
              </div>
            </div>

            {/* Right Column: Image with Floating Badges & Quote Card */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center px-4 sm:px-6">
              {/* Beautiful background circle */}
              <div className="absolute -z-10 top-[10%] left-[10%] w-[80%] h-[80%] bg-[#eedfff]/60 rounded-full blur-2xl"></div>
              <div className="absolute -z-10 top-[5%] left-[5%] w-[90%] h-[90%] bg-[#eedfff]/30 rounded-full border border-purple-100"></div>

              {/* Image Frame Container */}
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={poornima}
                  alt="Poornima Sandeep"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Float Badge 1 (Co-Founder) */}
              <div className="absolute -top-3 -right-2 md:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 z-20 max-w-[180px] sm:max-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-gray-900 leading-tight">Co-Founder</span>
                  <span className="text-[10px] text-gray-500 font-medium">Momentum X AI</span>
                </div>
              </div>

              {/* Float Badge 2 (Founder) */}
              <div className="absolute top-[40%] -left-2 md:-left-8 bg-white p-3 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 z-20 max-w-[180px] sm:max-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                  <Users size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-gray-900 leading-tight">Founder</span>
                  <span className="text-[10px] text-gray-500 font-medium">AIINFLUENCERS HUB</span>
                </div>
              </div>

              {/* Float Quote Card */}
              <div className="absolute -bottom-6 -right-2 md:-right-6 bg-[#0f0726] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-primary-950/50 max-w-[240px] sm:max-w-[280px] z-20">
                <span className="text-3xl text-accent-500 font-serif leading-none block mb-1">“</span>
                <p className="text-xs text-gray-200 leading-relaxed font-medium mb-3">
                  AI is not just for techies. It's for teachers, dreamers, doers and anyone who wants to grow in this new world.
                </p>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-accent-400 font-serif italic">- Poornimma S ♡</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Overlapping Feature Section */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 mb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-primary-50/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 mb-2 leading-snug">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side Content */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-50 border border-accent-100 text-accent-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
                ♥ Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0726] mb-6 leading-tight">
                Our Mission is to <br />
                <span className="text-primary-600">Empower & Elevate</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                We believe AI should amplify human potential, not replace it. Our mission is to make AI simple, practical and accessible for everyone through ethical education and a strong community.
              </p>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
              >
                Know More About Us <ArrowRight size={16} />
              </button>
            </div>
            
            {/* Right Side Cards */}
            <div className="lg:col-span-7 flex flex-col sm:grid sm:grid-cols-3 lg:flex lg:flex-col gap-6">
              {missionCards.map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Upcoming Webinar Preview Section */}
      {!loading && !nextWebinar ? null : (
        <section className="py-16 bg-[#0f0726] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-950 border border-primary-800 text-primary-300 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
                ★ Live Sessions
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Expert-Led Webinars</h2>
              <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base font-medium">
                Join our interactive sessions led by industry experts to master essential skills and connect with like-minded professionals.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : nextWebinar ? (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto hover:border-white/20 transition-all duration-300">
                <div className="mb-4 text-accent-400 font-extrabold tracking-wider text-xs uppercase">NEXT WEBINAR</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{nextWebinar.title}</h3>
                <p className="mb-4 text-sm text-gray-300">
                  Date: {new Date(nextWebinar.date).toLocaleDateString()} • {nextWebinar.time} • Duration: {nextWebinar.duration}
                </p>
                <p className="mb-6 text-sm text-gray-400 leading-relaxed">
                  {nextWebinar.learningOutcomes}
                </p>
                {nextWebinar.formLink && (
                  <a
                    href={nextWebinar.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:bg-primary-700 transition-all duration-300 text-sm"
                  >
                    Register Now <ArrowRight size={16} />
                  </a>
                )}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto text-center">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 mx-auto text-accent-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">Stay Tuned!</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    We're currently planning our next exciting webinar. Check back soon for updates!
                  </p>
                </div>
                <button
                  onClick={() => scrollToSection('webinars')}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:bg-primary-700 transition-all duration-300 text-sm"
                >
                  View Past Webinars
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900">Start Your Success Story Today</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Join hundreds of successful students and entrepreneurs who have transformed their careers and businesses through our proven programs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
            >
              Get in Touch
            </button>
            <button 
              onClick={() => scrollToSection('community')} 
              className="px-6 py-3 bg-primary-50 text-primary-600 font-semibold rounded-lg hover:bg-primary-100 transition-colors duration-200 text-sm"
            >
              Explore Communities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
