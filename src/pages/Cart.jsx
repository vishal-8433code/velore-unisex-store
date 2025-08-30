import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button } from "../components/ui/button.js";
import { Card, CardContent } from "../components/ui/card.js";
import { Badge } from "../components/ui/badge.js";
import { Input } from "../components/ui/input.js";
import { Separator } from "../components/ui/separator.js";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Luxury Oversized Hoodie",
    price: 299,
    originalPrice: 399,
    size: "L",
    color: "Black",
    quantity: 1,
    image: "/hoodie.png",
    isSale: true,
  },
  {
    id: 2,
    name: "Premium Silk Shirt",
    price: 459,
    size: "M",
    color: "White",
    quantity: 2,
    image: "/silkShirt.png",
    isSale: false,
  },
  {
    id: 3,
    name: "Cashmere Blend Sweater",
    price: 599,
    originalPrice: 799,
    size: "S",
    color: "Cream",
    quantity: 1,
    image: "/sweater.png",
    isSale: true,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "velore10") {
      setAppliedPromo("VELORE10");
      setPromoCode("");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice
        ? (item.originalPrice - item.price) * item.quantity
        : 0),
    0
  );
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  return (
    <div className="min-h-screen text-white  bg-black" >
      <Navbar />

      <div className="pt-16">
        {/* Header */}
      <div style={{ backgroundColor: "#1a1a1a" }} className="border-b border-gray-400/50 border-none">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl sm:text-5xl font-bold font-serif mb-2 text-white">Shopping <span className="text-yellow-500">Cart</span></h1>
    <p className="text-lg text-gray-200">
      {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
    </p>
  </div>
</div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6 ">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card style={{ backgroundColor: "#1a1a1a",border:"none" }}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6 border-none ">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full sm:w-32 h-32 object-cover rounded-lg"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {item.name}
                              </h3>
                              <div className="flex gap-4 text-gray-400 mt-1 text-sm">
                                <span>Size: {item.size}</span>
                                <span>Color: {item.color}</span>
                              </div>
                              {item.isSale && (
                                <Badge variant="destructive">Sale</Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Price */}
                            <div className="flex gap-2">
                              <span className="font-bold text-yellow-400">
                                ₹{item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-gray-400 line-through">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center bg-[oklab(0.14_0_0/0.5)] rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4 text-white" />
                              </Button>
                              <span className="px-4 py-2">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4 text-white" />
                              </Button>
                            </div>

                            {/* Total */}
                            <div className="text-right">
                              <span className="font-bold">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                style={{ backgroundColor: "#1a1a1a",border:"none" }}
                className="sticky top-24"
                
              >
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-bold font-serif">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        style={{
                          backgroundColor: "oklab(0.14 0 0 / 0.5)",
                          color: "white",
                        }}
                        className="placeholder:text-gray-400"
                      />
                      <Button
                        onClick={applyPromoCode}
                        variant="outline"
                        size="sm"
                        className="text-white border-white/20"
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="flex items-center justify-between text-sm text-green-500">
                        <span>✓ {appliedPromo} applied</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAppliedPromo("")}
                          className="text-xs text-gray-400"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-gray-700/50" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>You Save</span>
                        <span>-₹{savings.toFixed(2)}</span>
                      </div>
                    )}
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Promo Discount</span>
                        <span>-₹{promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-gray-700/50" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-yellow-400">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
<Button
  size="lg"
  className="w-full bg-[#FFD700] text-black font-semibold smooth-transition hover:bg-yellow-600 hover:scale-105 flex items-center justify-center"
>
  Proceed to Checkout
  <ArrowRight className="ml-2 h-5 w-5 text-black" />
</Button>


                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
