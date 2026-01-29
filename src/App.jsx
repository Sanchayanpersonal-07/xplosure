// UPDATED: Added Mail icon
import { BriefcaseIcon, Users, Calendar, Trophy, PhoneCall, HomeIcon, MenuIcon, MessageSquare, BarChart3, FileText, ClipboardList, Target, CheckCircle2, Code2, GraduationCap, Cpu, Mic, Music, Building2, Handshake, Facebook, Instagram, Mail } from 'lucide-react';
import { useState } from 'react';
import './index.css';

// Import local images
import LogoImage from './assets/Logo.png';
import sukhenImage from './assets/sukhen.jpg';
import rijuImage from './assets/riju.jpg';
import sanchayanImage from './assets/sanchayan.jpg';
import rumanImage from './assets/ruman.jpg';
import babanImage from './assets/baban.jpg';

// Import success story images
import asitImage from './assets/Asit.jpg';
import sayanImage from './assets/Sayan.jpeg';
import joydeepImage from './assets/Joydeep.jpeg';
import adarshaImage from './assets/Adarsha.jpeg';
import souravImage from './assets/Sourav.jpeg';
import soumyajitImage from './assets/Soumyajit.jpeg';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { title: 'Home', href: '#home', icon: <HomeIcon className="h-4 w-4 mr-1" /> },
    { title: 'Services', href: '#services', icon: <ClipboardList className="h-4 w-4 mr-1" /> },
    { title: 'About', href: '#about', icon: <Users className="h-4 w-4 mr-1" /> },
    { title: 'Mission', href: '#mission-vision', icon: <Target className="h-4 w-4 mr-1" /> },
    { title: 'Success', href: '#success', icon: <Trophy className="h-4 w-4 mr-1" /> },
    { title: 'Collaborators', href: '#collaborators', icon: <Handshake className="h-4 w-4 mr-1" /> },
    { title: 'Booking', href: '#booking', icon: <Calendar className="h-4 w-4 mr-1" /> },
    { title: 'Contact', href: '#contact', icon: <PhoneCall className="h-4 w-4 mr-1" /> },
  ];

  const founders = [
    { name: "Sayantan Das", image: rijuImage, alt: "Sayantan Das, Founder of Xplosure", role: "Founder", bio: "I am Sayantan Das, visionary behind Xplosure, established with the mission to direct students in proper way according to their talent & deliver sustainable solutions in their life. I have already completed my B. Tech & M. Tech, and now pursuing my PHD from recognized and Government Institutes since my Graduation time. I have already worked in a Communication Company (Core company of my domain), as Developer at an IT Company (CTS), and as an Assistant Professor at an Engineering College & cracked several interviews. On my personal interest, I already guided several students to achieve their goal & now I have founded this to reach out more students. With a strong background in Educational line & Passion for Solving real world Challenges combines innovation, leadership, and a deep understanding of student’s mindset, I can help many of you to choose proper carrier align with your talent." },
    { name: "Sukhen Mondal", image: sukhenImage, alt: "Sukhen Mondal, Co-Founder of Xplosure", role: "Co-Founder", bio: "An enthusiastic and driven Electronics and Communication Engineering graduate from Cooch Behar Government Engineering College , currently pursuing an integrated M.Tech + Ph.D. in VLSI Design at the prestigious Indian Institute of Information Technology, Allahabad .Qualified the GATE 2024 examination with a focus on VLSI and Digital Electronics , and actively engaged in advanced research spanning semiconductor device modeling, RTL to GDSII flows, and SoC verification methodologies." },
    { name: "Sanchayan Saha", image: sanchayanImage, alt: "Sanchayan Saha, Co-Founder of Xplosure", role: "Co-Founder", bio: "As a Full Stack Developer with a deep-rooted passion for Computer Science, I bring a unique blend of technical expertise and creative problem-solving to the Xplosure team. My skills span the MERN stack (MongoDB, Express, React, Node.js) and modern frameworks like Next.js, allowing me to craft robust and scalable web applications from the ground up. My foundation in algorithmic problem-solving and system design ensures that every solution I build is not only innovative but also efficient and user-friendly. I am dedicated to leveraging my technical abilities to help Xplosure deliver exceptional user experiences and empower our users on their career journeys." }
  ];

  const services = [
    { icon: <MessageSquare className="h-12 w-12 mx-auto text-blue-600" />, title: "Career Counselling", description: "One-on-one sessions to explore career paths, identify strengths, and make confident decisions." },
    { icon: <BarChart3 className="h-12 w-12 mx-auto text-blue-600" />, title: "Skill Development Coaching", description: "Personalized coaching to acquire new technical expertise and essential soft skills." },
    { icon: <FileText className="h-12 w-12 mx-auto text-blue-600" />, title: "Resume & Interview Prep", description: "Expert help to craft a compelling resume and ace interviews with mock sessions." },
    { icon: <Code2 className="h-12 w-12 mx-auto text-blue-600" />, title: "Programming Skills", description: "Targeted training to enhance your coding abilities in various languages and frameworks." },
    { icon: <GraduationCap className="h-12 w-12 mx-auto text-blue-600" />, title: "Final Year Project Guidance", description: "Expert mentorship to successfully complete your academic projects from concept to completion." },
    { icon: <Cpu className="h-12 w-12 mx-auto text-blue-600" />, title: "Ready-Made Simulation Models", description: "Access to pre-built project simulation models to accelerate your research and learning." },
    { icon: <Mic className="h-12 w-12 mx-auto text-blue-600" />, title: "Expert Talk Sessions", description: "Engage with industry leaders and gain invaluable insights through our curated talk sessions." },
    { icon: <Music className="h-12 w-12 mx-auto text-blue-600" />, title: "Cultural Tuition", description: "Explore your creative side with classes in singing, dancing, and instrument playing." },
    { icon: <Building2 className="h-12 w-12 mx-auto text-blue-600" />, title: "Placement Drive Arrangements", description: "We organize special placement drives to connect you with top hiring companies." },
  ];

  const collaborators = [
    { name: "Ruman Kundu", image: rumanImage, alt: "Ruman Kundu, Co-founder of OUY Consultancy", bio: "Ruman Kundu is a dedicated and adaptable Diploma holder in Electronics and Communication Engineering from Murarai Government Polytechnic (2021). With strong communication skills and a proactive approach to problem-solving, he effectively blends academic knowledge with practical experience. He gained valuable industry exposure during his six-month tenure at Sasmos Heat Technology Pvt. Ltd., where he developed expertise in consumer electronics sales, customer relationship management, and trust-building. Currently, he is the Co-founder of OUY Consultancy, where he continues to apply his skills and vision to empower students and professionals." },
    { name: "Baban Maji", image: babanImage, alt: "Baban Maji, Co-founder of OUY Consultancy", bio: "Baban Maji is an Electronics and Communication Engineer from Asansol, West Bengal, who has completed his B.Tech from Cooch Behar Government Engineering College. He also completed his MSME training at NIT Sikkim on the topic VLSI Design and Engineering and gained professional experience working at Centum Electronics, Bangalore. With a strong foundation in programming and hardware design, he has contributed to innovative projects such as a Smart Blind Stick. Recognized for his adaptability, teamwork, and problem-solving skills, Baban is also the co-founder of OUY Consultancy." }
  ];

  const successStories = [
    { name: "Joydip Sarkar", role: "Technology Analyst, INFOSYS", image: joydeepImage },
    { name: "Sayan Mondal", role: "Technology Analyst, INFOSYS", image: sayanImage },
    { name: "Adarsha Mondal", role: "M.TECH MECHATRONICS, IIT PATNA", image: adarshaImage },
    { name: "Sourav Addhya", role: "PhD Scholar, IIIT Guwahati", image: souravImage },
    { name: "Baban Maji", role: "Teacher, Mount Litera Public School", image: babanImage },
    { name: "Asit", role: "Junior Research Fellow, IIT PATNA", image: asitImage },
    { name: "Soumyajit Mandal", role: "MTech, VLSI & Embedded systems, DIAT, DRDO, Pune", image: soumyajitImage },
  ];

  const missionPoints = [ "Empower students mainly after Class 10 and beyond with Personalized, Unbiased Career guidance.", "Offer Innovative Assessments and Mentorship to help every student realize their Strengths.", "Support each learner’s journey with Transparent Information and Expert Counseling.", "Guide individuals towards Confidence and clarity in making Academic and Professional Choices.", "Provide online & offline tution, also for competitive exams like GATE & not only for course papers, but also for student’s extra curriculum activities.", "Provide Lifelong Growth Opportunities beyond Initial Career decisions." ];
  const visionPoints = [ "Become India’s most trusted career guidance platform for youth.", "Ensure every student can Discover and Pursue their best-fit stream or career path.", "Redefine career counseling using Advanced Technology and Real-world Expertise.", "Build a generation of Skilled, Passionate, and Purpose-driven Professionals for a changing world.", "Keep youth out of Depression & Frustration, having job satisfaction whatever they do in their life.", "Make expert guidance accessible to Every Student, Everywhere." ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={LogoImage} alt="Xplosure Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">Xplosure</span>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900" aria-label="Open menu"><MenuIcon className="h-6 w-6" /></button>
            </div>

            <div className="hidden md:flex space-x-6">
              {navItems.map(item => (
                <a key={item.title} href={item.href} className="text-gray-600 hover:text-blue-600 flex items-center">{item.icon}{item.title}</a>
              ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a key={item.title} href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-blue-600">{item.title}</a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <header id="home" className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Shape Your Future Career</h1>
          <p className="text-xl mb-8">Professional guidance to help you make informed career decisions</p>
          <a href="#booking" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Book a Session</a>
        </div>
      </header>

      <main>
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {services.map((service) => (
                <div key={service.title} className="p-6 shadow-lg rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="space-y-20">
              {founders.map((founder, index) => (
                <div key={founder.name} className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 !== 0 ? 'md:order-last' : ''}>
                    <img src={founder.image} alt={founder.alt} className="rounded-lg shadow-lg w-2/3 mx-auto h-auto object-cover"/>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{founder.name}</h3>
                    <p className="text-lg font-semibold text-blue-600 mb-4">{founder.role}</p>
                    <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
                  </div>
                </div>
              ))}
              <p className="text-gray-600 text-center text-lg italic pt-8">Xplosure was founded with a mission to provide personalized career guidance using data-driven approaches and years of industry expertise.</p>
            </div>
          </div>
        </section>

        <section id="mission-vision" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Our Mission</h3>
                <ul className="space-y-4">
                  {missionPoints.map((point) => ( <li key={point} className="flex items-start"><CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span className="text-gray-700">{point}</span></li> ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Our Vision</h3>
                 <ul className="space-y-4">
                  {visionPoints.map((point) => ( <li key={point} className="flex items-start"><CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span className="text-gray-700">{point}</span></li> ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {successStories.map((story) => (
                <div key={story.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center flex flex-col">
                  <img src={story.image} alt={story.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover flex-shrink-0" />
                  <div className="flex flex-col flex-grow justify-center">
                    <h3 className="text-xl font-semibold text-center mb-2">{story.name}</h3>
                    <p className="text-blue-600 text-center">{story.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="collaborators" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Collaborators</h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              We are proud to collaborate with OUY Consultancy, an organisation known for its excellence in organising Placement Drives. Through this partnership, the students gain valuable opportunities for Off Campus placements. This collaboration strengthens Industry-Academia Relations.
            </p>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {collaborators.map((collaborator) => (
                <div key={collaborator.name} className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
                  <img src={collaborator.image} alt={collaborator.alt} className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-blue-200" />
                  <h3 className="text-2xl font-semibold mb-4">{collaborator.name}</h3>
                  <p className="text-gray-600 leading-relaxed text-left">{collaborator.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Book a Session</h2>
            <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-6 text-lg">Ready to take the next step in your career? Click the button below to schedule your consultation session.</p>
              <a href="https://forms.gle/akJDYmA2P1KKhvWw8" target="_blank" rel="noopener noreferrer" className="inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">Schedule Consultation</a>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-600"><PhoneCall className="h-5 w-5 mr-2 text-blue-600" />+91 7980247918</p>
                  {/* UPDATED: Added email address */}
                  <a href="mailto:xplosure.carrier@gmail.com" className="flex items-center text-gray-600 hover:text-blue-600">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    xplosure.carrier@gmail.com
                  </a>
                  <p className="flex items-start text-gray-600">
                    <HomeIcon className="h-5 w-5 mr-2 text-blue-600 mt-1 flex-shrink-0" />
                    NH17, Bijoynagar - Jalukbari Rd, Bongora,<br />Guwahati, Assam 781015
                  </p>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                  <p className="text-gray-600">Monday - Sunday: 10:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.716954271815!2d91.59768077524959!3d26.14081397711583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a44332348b6ad%3A0x63369325492a259c!2sNH17%2C%20Bongora%2C%20Assam%20781015!5e0!3m2!1sen!2sin!4v1716982888258!5m2!1sen!2sin"
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  className="rounded-lg shadow-lg" 
                  title="Google Maps Location for Guwahati">
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src={LogoImage} alt="Xplosure Logo" className="h-10 w-auto" />
                <span className="ml-2 text-xl font-bold">Xplosure</span>
              </div>
              <p className="text-gray-400">Empowering individuals to make informed career decisions and achieve their professional goals.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map(item => ( <li key={item.title}><a href={item.href} className="text-gray-400 hover:text-white">{item.title}</a></li> ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe for career tips and updates.</p>
              <form className="flex">
                <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-900" aria-label="Email for newsletter" />
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">Subscribe</button>
              </form>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1GoGPjVLSx/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Facebook size={24} /></a>
                <a href="https://www.instagram.com/xplosure2025?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Xplosure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;