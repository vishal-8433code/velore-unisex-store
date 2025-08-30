// src/pages/AboutPage.jsx

import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import { Card, CardContent } from "../components/ui/card.js"
import { Badge } from "../components/ui/badge.js"
import { Award, Users, Globe, Heart, Sparkles, Shield } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Every piece is crafted with meticulous attention to detail using only the finest materials.",
    },
    {
      icon: Users,
      title: "Inclusive Design",
      description: "Our unisex approach celebrates individuality and breaks traditional fashion boundaries.",
    },
    {
      icon: Globe,
      title: "Sustainable Future",
      description: "We're committed to ethical production and environmental responsibility.",
    },
    {
      icon: Heart,
      title: "Passionate Craft",
      description: "Fashion is our art form, and every design tells a story of dedication and creativity.",
    },
  ]

  const milestones = [
    { year: "2020", title: "Founded", description: "VELORE was born from a vision to redefine luxury fashion" },
    { year: "2021", title: "First Collection", description: "Launched our debut unisex premium collection" },
    { year: "2022", title: "Global Expansion", description: "Expanded to serve customers worldwide" },
    { year: "2023", title: "Sustainability Focus", description: "Committed to 100% sustainable materials" },
    { year: "2024", title: "Innovation Leader", description: "Leading the future of premium unisex fashion" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-16 ">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900/20"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <Badge className="bg-primary text-primary-foreground mb-6">Our Story</Badge>
            <h1 className="text-4xl sm:text-6xl font-bold font-serif mb-6">
              Crafting the Future of
              <span className="block text-yellow-400">Premium Fashion</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              VELORE represents more than clothing—we're a movement toward inclusive luxury, where premium quality meets
              contemporary design for every individual.
            </p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">
                    Where Luxury Meets Innovation
                  </h2>
                  <p className="leading-relaxed mb-6">
                    Founded in 2020, VELORE emerged from a simple yet revolutionary idea: luxury fashion should be
                    accessible, inclusive, and timeless. We believe that premium quality and contemporary design
                    shouldn't be confined by traditional gender boundaries.
                  </p>
                  <p className="leading-relaxed">
                    Our journey began with a small team of passionate designers and craftspeople who shared a vision of
                    creating clothing that transcends conventional fashion norms. Today, VELORE stands as a testament to
                    the power of inclusive luxury.
                  </p>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">50K+</div>
                    <div className="text-sm text-white/70">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">200+</div>
                    <div className="text-sm text-white/70">Premium Pieces</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">25+</div>
                    <div className="text-sm text-white/70">Countries</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glass rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Sparkles className="h-8 w-8 text-yellow-400/30" />
                  </div>
                  <img
                    src="/about-studio.png"
                    alt="VELORE Design Studio"
                    className="w-full h-80 object-cover rounded-lg mb-6"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Our Design Philosophy</h3>
                    <p className="text-sm text-white/70">
                      Every piece is thoughtfully designed to embody elegance, comfort, and versatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">Our Core Values</h2>
              <p className="text-xl max-w-2xl mx-auto">
                The principles that guide everything we do at VELORE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="glass glass-hover text-center bg-gray-800/30 border-none">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/10 mb-6">
                      <value.icon className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-4">{value.title}</h3>
                    <p className="text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">Our Journey</h2>
              <p className="text-xl text-white/70">Milestones that shaped VELORE</p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <Card className="flex-1 glass bg-gray-800/30 border-none">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <p>{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">Meet Our Team</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                The passionate individuals behind VELORE's success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Amir Hamza Khan",
                  role: "Creative Director",
                  image: "/hamza.jpeg",
                },
                {
                  name: "Vishal Kumar",
                  role: "Head of Design",
                  image: "/vishal.jpeg",
                },
                {
                  name: "Arpit Motla",
                  role: "Sustainability Lead",
                  image: "/professional-portrait-of-female-sustainability-exp.png",
                },
              ].map((member, index) => (
                <Card key={index} className="glass glass-hover text-center bg-gray-800/30 border-none">
                  <CardContent className="p-8">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    />
                    <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                    <p className="text-yellow-400 font-medium">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="py-20 ">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-2xl p-12 bg-gray-800/30 border-none">
              <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-8" />
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">Our Commitment</h2>
              <p className="text-xl leading-relaxed mb-8 text-white/70">
                We pledge to continue pushing the boundaries of luxury fashion while maintaining our commitment to
                quality, sustainability, and inclusivity. Every VELORE piece represents our dedication to excellence and
                our vision for the future of fashion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  Premium Quality Guaranteed
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  Sustainable Materials
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  Inclusive Design
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
