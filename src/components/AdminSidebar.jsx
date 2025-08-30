import { Button } from "../components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { cn } from "../lib/utils";

export const AdminSidebar = ({ 
  activeSection, 
  setActiveSection, 
  isOpen, 
  setIsOpen 
}) => {
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-40",
          // Desktop behavior
          "lg:translate-x-0",
          isOpen ? "lg:w-64" : "lg:w-16",
          // Mobile behavior  
          "lg:relative lg:top-0 lg:h-full",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:w-16 lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between lg:justify-end items-center p-4">
            <h2 className="lg:hidden text-primary font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:bg-primary/20 "
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

         <nav className="flex-1 px-4 space-y-2">
  {sidebarItems.map((item) => (
    <Button
  key={item.id}
  variant="ghost"
  className={cn(
    "w-full h-12 flex items-center gap-3 px-4 rounded-lg transition-all duration-200 !text-black ",
    activeSection === item.id
      ? "bg-primary font-semibold"
      : "bg-muted hover:bg-primary/80",
    !isOpen && "lg:justify-center lg:px-0"
  )}
  onClick={() => {
    setActiveSection(item.id);
    if (window.innerWidth < 1024) setIsOpen(false);
  }}
>
  <item.icon className="h-5 w-5" />
  {(isOpen || window.innerWidth < 1024) && (
    <span className="flex-1 text-left">{item.label}</span>
  )}
</Button>

  ))}
</nav>
        </div>
      </div>
    </>
  );
};
