import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button"; // "@/components/ui/button" ko relative path me badal do

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="h-16 bg-card border-b border-border flex items-center justify-between px-3 sm:px-6 sticky top-0 z-50">
      <div className="flex-1 sm:block hidden" />
      
      <div className="flex-1 flex justify-center">
        <h1 className="text-lg sm:text-2xl font-bold text-primary glow">
          Admin Panel
        </h1>
      </div>
      
      <div className="flex-1 flex justify-end">
        <Button 
          onClick={handleLogout}
          className="btn-premium flex items-center gap-1 sm:gap-2 hover:scale-105 transition-transform text-sm sm:text-base px-3 sm:px-4"
        >
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Logout</span>
          <span className="xs:hidden">Exit</span>
        </Button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
