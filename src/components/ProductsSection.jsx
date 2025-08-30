import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockProducts = [
  { id: 1, name: "Premium Widget", price: 299.99, category: "Electronics", stock: 45, status: "active" },
  { id: 2, name: "Luxury Gadget", price: 499.99, category: "Electronics", stock: 23, status: "active" },
  { id: 3, name: "Designer Item", price: 199.99, category: "Fashion", stock: 12, status: "inactive" },
  { id: 4, name: "Pro Tool", price: 399.99, category: "Tools", stock: 67, status: "active" },
];

export const ProductsSection = () => {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const  navigate = useNavigate()

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigateToCreateProduct = () => {
navigate("/create-product")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Products Management</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button className="btn-premium flex items-center gap-2"
        onClick={navigateToCreateProduct}>
          <Plus className="h-4 w-4" />
          Create Product
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="premium-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-primary">{product.name}</CardTitle>
                <Badge
                  variant={product.status === "active" ? "default" : "secondary"}
                  className={product.status === "active" ? "bg-success text-success-foreground" : ""}
                >
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-muted-foreground">{product.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stock:</span>
                <span className={`font-medium ${product.stock < 20 ? "text-warning" : "text-success"}`}>
                  {product.stock} units
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center">
                  <Eye className="h-3 w-3" />
                  <span className="hidden xs:inline">View</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center">
                  <Edit className="h-3 w-3" />
                  <span className="hidden xs:inline">Edit</span>
                </Button>
                <Button size="sm" variant="destructive" className="flex items-center gap-1 justify-center">
                  <Trash2 className="h-3 w-3" />
                  <span className="hidden xs:inline">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
