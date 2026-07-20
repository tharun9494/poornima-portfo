import { motion } from 'framer-motion';

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

export default function About() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#faf9fe]">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
                ★ About Poornimma S
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] mb-6 leading-tight">
                Empowering Minds, <span className="text-primary-600">Building Futures</span>
              </h2>
              <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  Hi, I'm Poornimma S — an AI Instructor, Career Coach, and Personal Branding Mentor. I help
                  students, women entrepreneurs, and teachers gain confidence and find their path in the digital world.
                </p>
                <p>
                  I have 6+ years of experience in IT and 3+ years in personal branding. I've seen firsthand how telling your
                  authentic story and building your online presence can unlock incredible career opportunities.
                </p>
                <p>
                  I've guided over 3,000+ individuals — from students starting out to women relaunching their careers and educators seeking growth. Through practical workshops, 1-on-1 coaching, and vibrant communities, I help you build a standout personal brand and master AI tools.
                </p>
                <p>
                  I also lead two specialized communities — <strong className="text-primary-600 font-bold">Ainxtgen</strong> for students and <strong className="text-accent-600 font-bold">Queenflluence Hub</strong> for women — where members support each other and grow together.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { number: '6+', label: 'Years in IT' },
                { number: '3+', label: 'Years in Personal Branding' },
                { number: '3000+', label: 'People Guided & Empowered' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-4xl font-extrabold text-primary-600 mb-2">{stat.number}</h3>
                  <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0f0726] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Ready to Transform Your Career?</h2>
            <p className="text-gray-300 text-base mb-8 max-w-2xl mx-auto font-medium">
              Join our community today and start your journey towards building a powerful personal brand and achieving your professional goals.
            </p>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-700 shadow-lg transition-all duration-300 text-base"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}