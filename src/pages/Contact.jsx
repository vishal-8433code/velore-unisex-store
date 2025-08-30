import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button } from "../components/ui/button.js";
import { Card, CardContent } from "../components/ui/card.js";
import { Input } from "../components/ui/input.js";
import { Textarea } from "../components/ui/textarea.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.js";
import { Badge } from "../components/ui/badge.js";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import "./contactStyle.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "vs1020847@gmail.com",
      description: "Get in touch for any inquiries",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 8433202373",
      description: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "MuzaffarNagar, MZN",
      description: "Our flagship showroom",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM",
      description: "Weekend: 10AM-4PM",
    },
  ];

  const supportCategories = [
    {
      icon: ShoppingBag,
      title: "Orders & Shipping",
      description: "Track orders, shipping info, and delivery questions",
    },
    {
      icon: MessageCircle,
      title: "Product Support",
      description: "Size guides, care instructions, and product details",
    },
    {
      icon: HeadphonesIcon,
      title: "Customer Care",
      description: "Returns, exchanges, and general assistance",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar darkMode />

      {/* Header */}
      <section className="pt-24 bg-dark-card/30 border-b border-dark-border/30">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Badge className="bg-veloreYellow text-black mb-6">
            Get in Touch
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif mb-6 tracking-wide">
            Contact <span className="text-yellow-500">VELORÉ</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're here to help with any questions about our premium collection
            or your shopping experience.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <motion.div
          className="lg:col-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Card className="glass-dark backdrop-blur-md border border-dark-border/30 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold font-serif mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Full Name
                    </label>
                    <Input
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="bg-dark-input border-dark-border focus:border-veloreYellow smooth-transition placeholder:text-gray-400"
                      required
                      style={{
                        backgroundColor: "oklab(0.14 0 0 / 50%)",
                        color: "#fff",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-dark-input border-dark-border focus:border-veloreYellow smooth-transition placeholder:text-gray-400"
                      required
                      style={{
                        backgroundColor: "oklab(0.14 0 0 / 50%)",
                        color: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subject
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleInputChange("subject", value)
                    }
                  >
                    <SelectTrigger
                      className="w-full rounded-md border border-white/20 bg-oklab-input px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-veloreYellow focus:border-veloreYellow smooth-transition"
                      style={{ backgroundColor: "oklab(0.14 0 0 / 100%)" }} // fully opaque dark
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>

                    <SelectContent
                      className="bg-oklab-input text-white border border-white/20 rounded-md"
                      style={{ backgroundColor: "oklab(0.14 0 0 / 100%)" }} // fully opaque dark
                    >
                      <SelectItem
                        value="general"
                        className="hover:bg-veloreYellow/20"
                      >
                        General Inquiry
                      </SelectItem>
                      <SelectItem
                        value="order"
                        className="hover:bg-veloreYellow/20"
                      >
                        Order Support
                      </SelectItem>
                      <SelectItem
                        value="product"
                        className="hover:bg-veloreYellow/20"
                      >
                        Product Question
                      </SelectItem>
                      <SelectItem
                        value="return"
                        className="hover:bg-veloreYellow/20"
                      >
                        Returns & Exchanges
                      </SelectItem>
                      <SelectItem
                        value="wholesale"
                        className="hover:bg-veloreYellow/20"
                      >
                        Wholesale Inquiry
                      </SelectItem>
                      <SelectItem
                        value="press"
                        className="hover:bg-veloreYellow/20"
                      >
                        Press & Media
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className="bg-dark-input border-dark-border focus:border-veloreYellow smooth-transition placeholder:text-gray-400"
                    required
                    style={{
                      backgroundColor: "oklab(0.14 0 0 / 50%)",
                      color: "#fff",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-veloreYellow to-veloreOrange text-black font-semibold smooth-transition hover:scale-105"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="glass-dark backdrop-blur-md border border-dark-border/30 shadow-md hover:shadow-xl hover:scale-105 smooth-transition cursor-pointer"
            >
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-veloreYellow/20 flex items-center justify-center">
                    <info.icon className="h-5 w-5 text-veloreYellow" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{info.title}</h4>
                  <p className="text-veloreYellow font-medium">
                    {info.details}
                  </p>
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {supportCategories.map((category, index) => (
            <Card
              key={index}
              className="glass-dark backdrop-blur-md border border-dark-border/20 shadow-md hover:shadow-xl hover:scale-105 smooth-transition cursor-pointer"
            >
              <CardContent className="p-4 flex items-start space-x-4">
                <category.icon className="h-5 w-5 text-veloreYellow mt-1" />
                <div>
                  <h4 className="font-medium">{category.title}</h4>
                  <p className="text-gray-400 text-sm">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Card className="glass-dark backdrop-blur-md border border-dark-border/30 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold font-serif mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-gray-400 mb-8">
              Experience VELORE's premium collection in person at our flagship
              location in MZN's Fashion District.
            </p>
            <div className="bg-dark-card/50 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-veloreYellow mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  VELORE Flagship Store
                </h3>
                <p className="text-gray-400">
                  123 Fashion District, MuzaffarNagar, MZN
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent text-veloreYellow hover:bg-veloreYellow/20"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Footer darkMode />
    </div>
  );
}
