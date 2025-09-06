import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Mail, Phone, ShoppingBag, Edit } from "lucide-react";

export const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getAllUsers`);
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-primary">Loading users...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">Users Management</h2>
        <p className="text-muted-foreground">Manage your customer base</p>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user._id} className="premium-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      <img src="/avatar.jpg" alt="" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-primary">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
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
                  <p className="font-medium">{user.phone || "N/A"}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                  </div>
                  <p className="font-medium text-primary">{user.orderCount || 0} orders</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Total Spent</span>
                  </div>
                  <p className="font-bold text-primary text-lg">
                    ${user.totalSpent?.toLocaleString() || 0}
                  </p>
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
