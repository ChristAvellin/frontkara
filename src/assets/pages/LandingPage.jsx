import React, { useState } from 'react';
import { Music, Users, PlayCircle, Mic, Star, Globe, ArrowRight, Menu, X, Mail, Phone, MapPin } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleGetStarted = () => {
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Music className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">KaraArema</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Join the Experience</h2>
            <p className="text-white/70">Fill out the form to get started</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (Optional)"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell us what you're looking for..."
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm resize-none"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">KaraArema</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Features</span>
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Gallery</span>
              <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Contact</span>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Features</span>
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Gallery</span>
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer">Contact</span>
                <button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 self-start"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="h-full flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-purple-300 font-medium">Welcome to Our Music Store</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  From Starters to
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    Professional
                  </span>
                </h1>
                
                <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
                  Here you'll find a huge range of musical experiences. Transform any moment into a celebration with our premium karaoke platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-8 py-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white/30 text-white text-lg px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">10K+</div>
                  <div className="text-white/60 text-sm">Songs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">50+</div>
                  <div className="text-white/60 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">1M+</div>
                  <div className="text-white/60 text-sm">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">24/7</div>
                  <div className="text-white/60 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl">
                <img 
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Karaoke Experience" 
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all cursor-pointer group">
                      <PlayCircle className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-white font-medium text-lg">Experience the Magic</p>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Sing Anywhere</h3>
                    <p className="text-white/70 text-sm">Access from any device</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Premium Quality</h3>
                    <p className="text-white/70 text-sm">Crystal clear audio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full bg-black/20 backdrop-blur-sm py-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 KaraArema. Made with ❤️ for music lovers.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Mail className="w-4 h-4" />
              <span>contact@karaarema.com</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Phone className="w-4 h-4" />
              <span>+229 XX XX XX XX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;