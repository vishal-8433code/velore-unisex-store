import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import { Button } from "../components/ui/button.js"
import { Card, CardContent } from "../components/ui/card.js"
import { Badge } from "../components/ui/badge.js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.js"
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"

// Mock product data (in real app, this would come from API)
const productData = {
  1: {
    id: 1,
    name: "Luxury Oversized Hoodie",
    price: 299,
    originalPrice: 399,
    category: "hoodies",
    color: "black",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/luxury-black-oversized-hoodie-premium-fashion.png",
      "/luxury-black-oversized-hoodie-premium-fashion.png",
      "/luxury-black-oversized-hoodie-premium-fashion.png",
    ],
    description:
      "Crafted from premium cotton blend, this oversized hoodie embodies luxury streetwear. Features include a kangaroo pocket, adjustable drawstring hood, and our signature VELORE embroidery.",
    features: [
      "Premium 80% cotton, 20% polyester blend",
      "Oversized fit for contemporary style",
      "Signature VELORE embroidery",
      "Kangaroo pocket with hidden phone compartment",
      "Adjustable drawstring hood",
      "Pre-shrunk fabric",
    ],
    isNew: true,
    isSale: true,
    rating: 4.8,
    reviews: 127,
  },
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = productData[id]

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    console.log("Added to cart:", { id, size: selectedSize, quantity })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary smooth-transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary smooth-transition">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="glass rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 lg:h-[600px] object-cover"
                />
              </div>

              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glass rounded-lg overflow-hidden w-20 h-20 ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex gap-2">
                {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                {product.isSale && <Badge variant="destructive">Sale</Badge>}
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.isSale && (
                  <Badge variant="destructive" className="text-sm">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Sizes */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "gold-gradient" : ""}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-foreground font-medium">{quantity}</span>
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 gold-gradient text-primary-foreground font-semibold smooth-transition hover:scale-105"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`${isWishlisted ? "text-red-500 border-red-500" : ""}`}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Features */}
              <div className="glass rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Free Shipping</span>
                    <span className="text-xs text-muted-foreground">Orders over $200</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Secure Payment</span>
                    <span className="text-xs text-muted-foreground">SSL Protected</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Easy Returns</span>
                    <span className="text-xs text-muted-foreground">30-day policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 glass">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-8">
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Product Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Customer Reviews</h3>
                    <p className="text-muted-foreground">Reviews coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-8">
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Shipping Information</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>• Free shipping on orders over $200</p>
                      <p>• Standard delivery: 3-5 business days</p>
                      <p>• Express delivery: 1-2 business days</p>
                      <p>• International shipping available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
