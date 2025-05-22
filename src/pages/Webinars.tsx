import { motion } from 'framer-motion';
import { useState } from 'react';

interface Speaker {
  name: string;
  role: string;
  image: string;
}

interface Webinar {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  speaker: Speaker;
  topics: string[];
}

const webinars: Webinar[] = [
  {
    id: 1,
    title: "Master Your Personal Brand: A Step-by-Step Guide",
    date: "June 15, 2024",
    time: "2:00 PM EST",
    duration: "90 minutes",
    description: "Learn how to create a compelling personal brand that attracts your ideal clients or employers. This hands-on webinar will cover brand story development, online visibility strategies, and practical implementation steps.",
    speaker: {
      name: "Dr. Sarah Johnson",
      role: "Personal Branding Expert",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    topics: [
      "Creating your unique brand story",
      "Building a professional online presence",
      "Content strategy for visibility",
      "Networking and community building"
    ]
  },
  {
    id: 2,
    title: "AI Tools for Business Growth",
    date: "June 22, 2024",
    time: "3:00 PM EST",
    duration: "120 minutes",
    description: "Discover how to leverage AI tools to streamline your business operations and drive growth. This comprehensive session will introduce practical AI applications and implementation strategies.",
    speaker: {
      name: "Michael Chen",
      role: "AI Implementation Specialist",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    topics: [
      "Introduction to AI tools for business",
      "Automation strategies",
      "Data analysis and insights",
      "Implementation roadmap"
    ]
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    date: "June 29, 2024",
    time: "1:00 PM EST",
    duration: "90 minutes",
    description: "Master the fundamentals of digital marketing and learn how to create effective campaigns that drive results. This session will cover key strategies and tools for success.",
    speaker: {
      name: "Emily Rodriguez",
      role: "Digital Marketing Strategist",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    topics: [
      "Social media strategy",
      "Content marketing",
      "Email marketing",
      "Analytics and optimization"
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Webinars() {
  const [selectedWebinar, setSelectedWebinar] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              Expert-Led Webinars
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our interactive sessions led by industry experts to master essential skills and connect with like-minded professionals.
            </p>
          </motion.div>

          {/* Featured Webinar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-lg mb-16"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="mb-4">
                  <span className="bg-primary-100 text-primary-600 px-4 py-1 rounded-full text-sm font-medium">
                    NEXT WEBINAR
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4">
                  {webinars[0].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {webinars[0].description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {webinars[0].date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {webinars[0].time} • {webinars[0].duration}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300"
                >
                  Register Now
                </motion.button>
              </div>
              <div className="md:w-1/3">
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={webinars[0].speaker.image}
                      alt={webinars[0].speaker.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-primary-700">{webinars[0].speaker.name}</h3>
                      <p className="text-gray-600 text-sm">{webinars[0].speaker.role}</p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-primary-700 mb-2">What You'll Learn:</h4>
                  <ul className="space-y-2">
                    {webinars[0].topics.map((topic, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Webinars */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {webinars.slice(1).map((webinar) => (
              <motion.div
                key={webinar.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-primary-700 mb-4">{webinar.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {webinar.date}
                </div>
                <p className="text-gray-600 mb-4">{webinar.description}</p>
                <div className="flex items-center mb-4">
                  <img
                    src={webinar.speaker.image}
                    alt={webinar.speaker.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-primary-700">{webinar.speaker.name}</p>
                    <p className="text-sm text-gray-500">{webinar.speaker.role}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary-50 text-primary-600 px-6 py-2 rounded-full font-medium hover:bg-primary-100 transition-colors duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6">
              Want to Stay Updated?
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive updates about upcoming webinars and exclusive content.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}