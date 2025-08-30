// src/pages/ShopPage.jsx
import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button } from "../components/ui/button.js";
import { Card, CardContent } from "../components/ui/card.js";
import { Badge } from "../components/ui/badge.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.js";
import { Slider } from "../components/ui/slider.js";
import { Filter, Grid, List, Heart, ShoppingBag } from "lucide-react";

// Mock product data
const products = [
  { id: 1, name: "Luxury Oversized Hoodie", price: 299, originalPrice: 399, category: "hoodies", color: "black", sizes: ["XS","S","M","L","XL"], image: "/hoodie.png", isNew: true, isSale: true, gender:"male" },
  { id: 2, name: "Premium Silk Shirt", price: 459, category: "shirts", color: "black", sizes: ["S","M","L","XL"], image: "/silkShirt.png", isNew: false, isSale: false, gender:"male" },
  { id: 3, name: "Designer Cargo Pants", price: 349, category: "pants", color: "olive", sizes: ["28","30","32","34","36"], image: "/cargoPant.png", isNew: true, isSale: false, gender:"male" },
  { id: 4, name: "Cashmere Blend Sweater", price: 599, originalPrice: 799, category: "sweaters", color: "cream", sizes: ["XS","S","M","L"], image: "/sweater.png", isNew: false, isSale: true, gender:"female" },
  { id: 5, name: "Minimalist Blazer", price: 699, category: "blazers", color: "navy", sizes: ["S","M","L","XL"], image: "/mens-coat.png", isNew: true, isSale: false, gender:"male" },
  { id: 6, name: "Luxury Denim Jacket", price: 429, category: "jackets", color: "blue", sizes: ["S","M","L","XL","XXL"], image: "/jeans-jacket.png", isNew: false, isSale: false, gender:"male" },
];

const categories = ["all","hoodies","shirts","pants","sweaters","joggers","jackets"];
const colors = ["all","black","white","olive","cream","navy","indigo"];
const sortOptions = [
  { value:"featured", label:"Featured" },
  { value:"price-low", label:"Price: Low to High" },
  { value:"price-high", label:"Price: High to Low" },
  { value:"newest", label:"Newest First" },
];

export default function ShopPage() {
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Gender-based categories
  const maleCategories = ["all","hoodies","shirts","pants","jackets"];
  const femaleCategories = ["all","sweaters","blazers","joggers"];
  const availableCategories =
    selectedGender === "Male" ? maleCategories :
    selectedGender === "Female" ? femaleCategories : categories;

  // Filtered products
  const filteredProducts = products
    .filter(p => {
      if(selectedGender !== "All" && p.gender.toLowerCase() !== selectedGender.toLowerCase()) return false;
      if(selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if(selectedColor !== "all" && p.color !== selectedColor) return false;
      if(p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    })
    .sort((a,b)=>{
      switch(sortBy){
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "newest": return a.isNew ? -1 : 1;
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar className="bg-black text-white" />

      <div className="pt-16">
        {/* Header */}
        <div className="bg-gray-900/30 border-none" style={{backgroundColor:"#030407"}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-serif mb-4">
              Shop Latest <span className="text-yellow-500">Collection</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our curated selection of premium unisex fashion pieces
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Filters Sidebar */}
            <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="glass rounded-lg p-6 sticky top-24 bg-gray-900/20 border-none">
                <h3 className="text-lg font-semibold mb-6">Filters</h3>

                {/* Gender */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-3 block text-gray-300">Gender</label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger className="w-full rounded-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-veloreYellow focus:border-veloreYellow smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      <SelectValue placeholder="Select Gender"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-md text-white border border-white/20 smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      {["All","Male","Female"].map(g => <SelectItem key={g} value={g} className="hover:bg-veloreYellow/20 focus:bg-veloreYellow/20 rounded-md cursor-pointer px-3 py-2 smooth-transition">{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-3 block text-gray-300">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full rounded-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-veloreYellow focus:border-veloreYellow smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      <SelectValue placeholder="Select Category"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-md text-white border border-white/20 smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      {availableCategories.map(c => <SelectItem key={c} value={c} className="hover:bg-veloreYellow/20 focus:bg-veloreYellow/20 rounded-md cursor-pointer px-3 py-2 smooth-transition">{c.charAt(0).toUpperCase()+c.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-3 block text-gray-300">Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full rounded-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-veloreYellow focus:border-veloreYellow smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      <SelectValue placeholder="Select Color"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-md text-white border border-white/20 smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      {colors.map(c => <SelectItem key={c} value={c} className="hover:bg-veloreYellow/20 focus:bg-veloreYellow/20 rounded-md cursor-pointer px-3 py-2 smooth-transition">{c.charAt(0).toUpperCase()+c.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={10000} min={0} step={100} className="w-full bg-yellow-500 rounded-lg [&>span]:bg-yellow-500 [&>span]:rounded-full"/>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={()=>setShowFilters(!showFilters)} className="lg:hidden border-gray-700 text-white">
                    <Filter className="h-4 w-4 mr-2"/> Filters
                  </Button>
                  <p className="text-gray-300">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 rounded-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-veloreYellow focus:border-veloreYellow smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      <SelectValue placeholder="Sort By"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-md text-white border border-white/20 smooth-transition" style={{backgroundColor:"oklab(0.14 0 0 / 100%)"}}>
                      {sortOptions.map(opt => <SelectItem key={opt.value} value={opt.value} className="hover:bg-veloreYellow/20 focus:bg-veloreYellow/20 rounded-md cursor-pointer px-3 py-2 smooth-transition">{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <div className="flex border border-gray-700 rounded-md">
                    <Button variant={viewMode==="grid"?"default":"ghost"} size="sm" onClick={()=>setViewMode("grid")} className="rounded-r-none text-white"><Grid className="h-4 w-4"/></Button>
                    <Button variant={viewMode==="list"?"default":"ghost"} size="sm" onClick={()=>setViewMode("list")} className="rounded-l-none text-white"><List className="h-4 w-4"/></Button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className={viewMode==="grid"?"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6":"space-y-6"}>
                {filteredProducts.map(product => (
                  <Card key={product.id} className="glass group cursor-pointer overflow-hidden border-none bg-gray-900/20">
                    <a href={`/product/${product.id}`}>
                      <div className="relative">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover smooth-transition group-hover:scale-105"/>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isNew && <Badge className="bg-yellow-500 text-black">New</Badge>}
                          {product.isSale && <Badge className="bg-red-500 text-white">Sale</Badge>}
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 smooth-transition">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 text-white"><Heart className="h-4 w-4"/></Button>
                          <Button size="sm" className="h-8 w-8 p-0 bg-yellow-500 text-black"><ShoppingBag className="h-4 w-4"/></Button>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-semibold text-white mb-2 group-hover:text-yellow-500 smooth-transition">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-yellow-500">₹{product.price}</span>
                          {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹ {product.originalPrice}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {product.sizes.slice(0,4).map(size => <Badge key={size} variant="outline" className="text-xs border-gray-700 text-white">{size}</Badge>)}
                            {product.sizes.length>4 && <Badge variant="outline" className="text-xs border-gray-700 text-white">+{product.sizes.length-4}</Badge>}
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 border-gray-700 ${product.color==="black"?"bg-black":product.color==="white"?"bg-white":product.color==="olive"?"bg-green-600":product.color==="cream"?"bg-amber-100":product.color==="navy"?"bg-blue-900":"bg-indigo-600"}`}/>
                        </div>
                        <Button className="w-full rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 smooth-transition mt-5">Add to Cart</Button>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>

              {/* No results */}
              {filteredProducts.length===0 && (
                <div className="text-center py-12 text-white">
                  <p className="text-lg mb-4 text-gray-300">No products found matching your criteria</p>
                  <Button onClick={()=>{setSelectedCategory("all"); setSelectedColor("all"); setPriceRange([0,10000]); setSelectedGender("All");}} className="bg-yellow-500 text-black">Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer className="bg-black text-white"/>
    </div>
  );
}
