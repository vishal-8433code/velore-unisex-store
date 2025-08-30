import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Mail, Phone, ShoppingBag, Edit } from "lucide-react";

const mockUsers = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john@example.com", 
    phone: "+1-555-0123",
    orderCount: 12, 
    totalSpent: 2499.88, 
    status: "active", 
    joinDate: "2023-06-15" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    email: "sarah@example.com", 
    phone: "+1-555-0456",
    orderCount: 8, 
    totalSpent: 1299.92, 
    status: "active", 
    joinDate: "2023-08-22" 
  },
  { 
    id: 3, 
    name: "Mike Wilson", 
    email: "mike@example.com", 
    phone: "+1-555-0789",
    orderCount: 3, 
    totalSpent: 599.97, 
    status: "inactive", 
    joinDate: "2023-12-01" 
  },
  { 
    id: 4, 
    name: "Emma Davis", 
    email: "emma@example.com", 
    phone: "+1-555-0321",
    orderCount: 15, 
    totalSpent: 3799.85, 
    status: "active", 
    joinDate: "2023-03-10" 
  },
];

export const UsersSection = () => {
  const [users] = useState(mockUsers);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">Users Management</h2>
        <p className="text-muted-foreground">Manage your customer base</p>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id} className="premium-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-primary">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
                  </div>
                </div>
                <Badge 
                  variant={user.status === "active" ? "default" : "secondary"}
                  className={user.status === "active" ? "bg-success text-success-foreground" : ""}
                >
                  {user.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="font-medium break-all">{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <p className="font-medium">{user.phone}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                  </div>
                  <p className="font-medium text-primary">{user.orderCount} orders</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Total Spent</span>
                  </div>
                  <p className="font-bold text-primary text-lg">${user.totalSpent.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex justify-center sm:justify-end mt-4 pt-4 border-t border-border">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <Edit className="h-4 w-4" />
                  Edit User
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
