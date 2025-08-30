import { useState } from "react";
import  AdminNavbar  from "../components/AdminNavbar.jsx";
import { AdminSidebar } from "../components/AdminSidebar.jsx";
import { DashboardStats } from "../components/DashboardStats.jsx";
import { ProductsSection } from "../components/ProductsSection.jsx";
import { OrdersSection } from "../components/OrdersSection.jsx";
import { UsersSection } from "../components/UsersSection.jsx";
import  SettingsSection  from "../components/SettingsSection.jsx";
import { Button } from "../components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { cn } from "../lib/utils";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardStats />;
      case "products":
        return <ProductsSection />;
      case "orders":
        return <OrdersSection />;
      case "users":
        return <UsersSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="theme-premium min-h-screen bg-background text-foreground">
      <AdminNavbar />
      
      <div className="flex">
        <AdminSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <main
          className={cn(
            "flex-1 transition-all duration-300 p-3 sm:p-6",
            "lg:ml-0",
            sidebarOpen ? "lg:ml-64" : "lg:ml-16"
          )}
        >
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Mobile menu button */}
      <Button
        className="fixed bottom-6 right-6 lg:hidden btn-premium rounded-full p-3 shadow-lg z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <LayoutDashboard className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AdminDashboard;
