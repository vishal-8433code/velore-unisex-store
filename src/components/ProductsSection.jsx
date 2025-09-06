import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {ConfirmDialog} from "../components/confirmDialog.jsx"

export const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setDialogOpen(true);
  };
  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/data`); // Replace with your endpoint
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product (Cloudinary + DB)
const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete/product/${selectedId}`);
      setProducts((prev) => prev.filter((p) => p._id !== selectedId));
      setDialogOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Navigation
  const navigateToCreateProduct = () => navigate("/create-product");
  const navigateToEditProduct = (id) => navigate(`/edit-product/${id}`);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Products Management</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button className="btn-premium flex items-center gap-2" onClick={navigateToCreateProduct}>
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

      {/* Loading */}
      {loading && <p className="text-muted-foreground">Loading products...</p>}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
  <Card key={product._id} className="premium-card">
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
      {/* Product Image */}
      {product.image && (
        <img
          src={product.image} // Cloudinary secure_url
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
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
          <span className="hidden sm:inline">View</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 justify-center"
          onClick={() => navigateToEditProduct(product._id)}
        >
          <Edit className="h-3 w-3" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex items-center gap-1 justify-center"
          onClick={() => openDeleteDialog(product._id)}
        >
          <Trash2 className="h-3 w-3" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </div>
    </CardContent>
  </Card>
))}

           <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
      </div>
    </div>
  );
};
