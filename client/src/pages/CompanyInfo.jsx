import React, { useState } from 'react';
import PageTemplate from './PageTemplate';
import { useNavigate, useLocation } from 'react-router-dom';
import { Github, Mail, Phone, Star, Target, ChevronRight, Users, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "Akib Reza",
      role: "MERN Stack Developer",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      email: "akib.reza23@gmail.com",
      phone: "+880 1644-343728",
      github: "github.com/AkibReza",
      image: "/images/team/akib.jpg",
      skills: ["MERN Stack", "Progressive Web Apps", "Data Structures & Algorithms"],
      aspiration: "To become a full-stack expert specializing in scalable web applications"
    },
    {
      id: 2,
      name: "Asmaul Husna Aishe",
      role: "UI/UX Developer",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      email: "asmaulhusnaoishe6@gmail.com",
      phone: "+880 0140-0588405",
      github:"github.com/aishe818",
      image: "/images/team/asmaul.jpg",
      skills: ["UI/UX Design", "JavaScript", "Frontend Development"],
      aspiration: "Creative Director for user experience design at a major tech company"
    },
    {
      id: 3,
      name: "Mehtab Mehjabin",
      role: "Machine Learning Specialist",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      email: "moumitamehtab@gmail.com",
      phone: "+880 1792-495685",
      github: "github.com/Mehtabwho",
      image: "/images/team/mehtab.jpg",
      skills: ["C++", "Python", "Frontend Development"],
      aspiration: "Software Architect specializing in scalable cloud solutions"
    },
    {
      id: 4,
      name: "Imam Hossain Jawad",
      role: "Database Engineer",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      email: "imamhossainjawad@gmail.com",
      phone: "+880 0157-2420048",
      github:"github.com/ImamHossain-Jawad",
      image: "/images/team/jawad.jpg",
      skills: ["Working closely with developers, data analysts, and DevOps engineers"],
      aspiration: "Optionally earn certifications and apply for roles like DB Engineer or DBA."
    }
  ];

  // Company specialties
  const specialties = [
    {
      title: "Premium Properties",
      description: "Exclusive access to high-end residential and commercial properties in prime locations",
      icon: <Building className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Digital Marketing",
      description: "Innovative digital marketing strategies to maximize property visibility and engagement",
      icon: <Star className="h-10 w-10 text-blue-500" />
    },
    
    {
      title: "Market Analysis",
      description: "Comprehensive market research and analysis to ensure optimal investment decisions",
      icon: <Target className="h-10 w-10 text-blue-500" />
    }
  ];

  const handleTeamMemberClick = (id) => {
    setActiveTeamMember(activeTeamMember === id ? null : id);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <PageTemplate>
      <div className="space-y-24 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white">
        {/* About Us Section */}
        <motion.section 
          id="about-us" 
          className="scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-16">
              <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow"></div>
              <h2 className="text-5xl font-bold mx-8 text-blue-800 relative">
                About TerraNova
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500"></div>
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Who We Are */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="prose max-w-none bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Building className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-800 m-0">Who We Are</h3>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  TerraNova is a premier real estate platform developed by students from the University of Information Technology and Sciences. 
                  Founded with a vision to revolutionize property searching, we combine technological innovation with real estate expertise to 
                  create a seamless experience for buyers, sellers, and agents.
                </p>
                
                <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl text-white">
                  <p className="text-lg font-medium italic m-0">
                    "Revolutionizing real estate through innovation and technology."
                  </p>
                </div>
              </motion.div>

              {/* Our Team Overview */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="prose max-w-none bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-800 m-0">Our Team</h3>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  Our diverse team consists of talented students specializing in different areas of technology:
                </p>
                <ul className="list-none p-0">
                  <li className="flex items-center space-x-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>Full-stack Development</span>
                  </li>
                  <li className="flex items-center space-x-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>UI/UX Design</span>
                  </li>
                  <li className="flex items-center space-x-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>Machine Learning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>Database Engineering</span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-blue-800 m-0">
                    All team members are third-year Computer Science & Engineering students at UITS
                  </p>
                </div>
              </motion.div>

              {/* Our Mission */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="prose max-w-none bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-800 m-0">Our Mission</h3>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  We're committed to revolutionizing the real estate industry through:
                </p>
                <ul className="list-none p-0">
                  <li className="flex items-center space-x-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>Innovative Technology Solutions</span>
                  </li>
                  <li className="flex items-center space-x-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>User-Centric Design</span>
                  </li>
                  <li className="flex items-center space-x-2 mb-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>Data-Driven Insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                    <span>Seamless User Experience</span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl text-white">
                  <p className="text-lg font-medium italic m-0">
                    "Making property search smarter and easier for everyone"
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section 
          id="our-team" 
          className="scroll-mt-20"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <div className="h-0.5 bg-blue-200 flex-grow"></div>
              <h2 className="text-4xl font-bold mx-6 text-blue-800">Our Team</h2>
              <div className="h-0.5 bg-blue-200 flex-grow"></div>
            </div>
            
            <p className="text-xl text-center text-gray-600 mb-12">
              Meet the talented students from University of Information Technology and Sciences behind TerraNova
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <motion.div 
                  key={member.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 
                    ${activeTeamMember === member.id ? 'ring-4 ring-blue-400' : ''}`}
                  onClick={() => handleTeamMemberClick(member.id)}
                >
                  <div className="relative h-64 overflow-hidden group cursor-pointer">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{member.name}</h3>
                      <p className="text-gray-100 drop-shadow-md">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 font-medium mb-3">{member.department} | {member.year}</p>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center">
                        <Mail size={18} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 text-sm">{member.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 text-sm">{member.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Github size={18} className="text-blue-500 mr-2" />
                        <a href={`https://${member.github}`} className="text-blue-600 hover:underline text-sm">{member.github}</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills & Aspirations Section */}
        <motion.section 
          id="careers" 
          className="scroll-mt-20 bg-gradient-to-br from-blue-50 to-indigo-50 py-16 rounded-3xl"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <div className="h-0.5 bg-blue-200 flex-grow"></div>
              <h2 className="text-4xl font-bold mx-6 text-blue-800">Skills & Aspirations</h2>
              <div className="h-0.5 bg-blue-200 flex-grow"></div>
            </div>
            
            <p className="text-xl text-center text-gray-600 mb-12">
              Get to know the skills and future aspirations of our team members
            </p>
            
            <div className="space-y-8">
              {teamMembers.map((member) => (
                <motion.div 
                  key={member.id}
                  variants={fadeInUp}
                  className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-blue-100 
                    hover:shadow-xl transition duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    />
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-blue-800">{member.name}</h3>
                          <p className="text-lg font-medium text-blue-600">{member.role}</p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <p className="text-gray-600">{member.department}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                            <Star size={16} className="mr-2" /> Key Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, index) => (
                              <span key={index} className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center">
                            <Target size={16} className="mr-2" /> Future Aspiration
                          </h4>
                          <p className="text-gray-700">{member.aspiration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Contact CTA Section */}
        <motion.section 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 rounded-3xl p-12 
              shadow-2xl text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Interested in working with us?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Reach out to our team for collaboration opportunities or to learn more about our real estate platform
              </p>
              <button 
                onClick={() => navigate('/contact')} 
                className="group inline-flex items-center px-8 py-4 bg-white text-blue-800 font-bold rounded-lg 
                         shadow-lg hover:bg-blue-50 transition-all duration-300 ease-out
                         hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-700"
              >
                Contact Us
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </PageTemplate>
  );
};

export default CompanyInfo;