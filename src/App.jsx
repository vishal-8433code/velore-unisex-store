import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar.jsx";
import Footer from "../src/components/Footer.jsx";
import { Button } from "./components/ui/button.js";
import { ArrowRight, Star, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const navigateToAbout = () => {
    navigate("/about");
  };
  const navigateToShop = () => {
    navigate("/shop");
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.remove(
            "opacity-0",
            "translate-y-10",
            "translate-x-[-50px]",
            "translate-x-[50px]",
            "scale-95",
            "translate-y-5"
          );
          element.classList.add(
            "opacity-100",
            "translate-y-0",
            "translate-x-0",
            "scale-100"
          );
          console.log(
            "[v0] Animation triggered for element:",
            element.className
          );
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".scroll-animate");
    console.log("[v0] Found animated elements:", animatedElements.length);
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const fadeOpacity = Math.max(0, 1 - scrollY / 800);
  const contentOpacity = Math.min(1, scrollY / 400);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ease-out"
          style={{
            backgroundImage: `url('/hero.jpg')`,
            opacity: fadeOpacity,
            zIndex: -1,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight fade-in">
                <span className="block text-white">Premium</span>
                <span className="block text-yellow-400 font-bold">Fashion</span>
                <span className="block text-white">Collection</span>
              </h1>

              <p
                className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                Discover our exclusive range of luxury streetwear designed for
                those who dare to stand out
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 scale-in"
                style={{ animationDelay: "0.6s" }}
              >
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg transition-all duration-300 group"
                  onClick={navigateToShop}
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg transition-all duration-300 bg-transparent"
                  onClick={navigateToAbout}
                >
                  View Lookbook
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-white text-sm font-medium">Scroll</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
            <ChevronDown className="h-4 w-4 text-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <div
        className="relative z-20 bg-black transition-opacity duration-500 ease-out"
        style={{ opacity: contentOpacity }}
      >
        <section className="py-20 bg-black scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 scroll-animate opacity-0 -translate-x-12 transition-all duration-1000 ease-out delay-200">
                <div className="space-y-6">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                    About <span className="text-yellow-400">VELORÉ</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                </div>

                <div className="space-y-6 text-gray-300">
                  <p className="text-xl leading-relaxed">
                    VELORÉ represents the{" "}
                    <span className="text-white font-semibold">
                      pinnacle of premium fashion
                    </span>
                    , where luxury seamlessly meets contemporary streetwear in
                    perfect harmony.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Our meticulously curated collection features{" "}
                    <span className="text-yellow-400">exclusive designs</span>{" "}
                    crafted from the world's finest materials, designed for
                    discerning individuals who refuse to compromise on quality
                    and sophisticated style.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Each piece tells a story of{" "}
                    <span className="text-white font-semibold">
                      uncompromising craftsmanship
                    </span>
                    , attention to detail, and the relentless pursuit of
                    perfection that defines the VELORÉ legacy.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white font-medium">
                      Premium Materials
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white font-medium">
                      Exclusive Designs
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white font-medium">
                      Luxury Experience
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibent px-8 py-3 text-lg transition-all duration-300 group mt-8"
                  onClick={navigateToAbout}
                >
                  Discover Our Story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              <div className="relative scroll-animate opacity-0 translate-x-12 transition-all duration-1000 ease-out delay-400 hidden lg:block">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/about-studio.png"
                    alt="VELORE Premium Fashion Studio"
                    className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm rounded-xl px-6 py-4">
                    <p className="text-white font-semibold text-lg">
                      Premium Craftsmanship
                    </p>
                    <p className="text-gray-300 text-sm">Since 2020</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-black scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="space-y-4 scroll-animate opacity-0 scale-95 transition-all duration-800 ease-out delay-200">
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  The <span className="text-yellow-400">VELORÉ</span> Story
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
              </div>

              <div className="max-w-3xl mx-auto space-y-6 scroll-animate opacity-0 translate-y-5 transition-all duration-800 ease-out delay-400">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Born from a vision to{" "}
                  <span className="text-white font-semibold">
                    redefine luxury streetwear
                  </span>
                  , VELORÉ combines cutting-edge design with uncompromising
                  quality and sophisticated craftsmanship.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Our journey began with a simple belief: fashion should be an
                  expression of individuality, crafted with the utmost precision
                  and care. Every piece reflects our commitment to
                  <span className="text-yellow-400">
                    {" "}
                    excellence and innovation
                  </span>
                  .
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                {[
                  {
                    title: "5.0 Customer Rating",
                    subtitle: "Trusted by thousands",
                    delay: "delay-600",
                  },
                  {
                    title: "Premium Materials",
                    subtitle: "Finest quality fabrics",
                    delay: "delay-700",
                  },
                  {
                    title: "Worldwide Shipping",
                    subtitle: "Global luxury delivery",
                    delay: "delay-800",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`glass-card p-6 rounded-xl scroll-animate opacity-0 translate-y-5 transition-all duration-800 ease-out ${item.delay}`}
                  >
                    {index === 0 ? (
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                      </div>
                    )}
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
