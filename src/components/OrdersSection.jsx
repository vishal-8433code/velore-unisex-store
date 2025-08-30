import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Eye, Package, Truck } from "lucide-react";

const mockOrders = [
  { id: 1001, customer: "John Smith", total: 299.99, status: "pending", date: "2024-01-15", items: 2 },
  { id: 1002, customer: "Sarah Johnson", total: 599.98, status: "processing", date: "2024-01-14", items: 3 },
  { id: 1003, customer: "Mike Wilson", total: 199.99, status: "shipped", date: "2024-01-13", items: 1 },
  { id: 1004, customer: "Emma Davis", total: 799.97, status: "delivered", date: "2024-01-12", items: 4 },
  { id: 1005, customer: "Chris Brown", total: 399.99, status: "processing", date: "2024-01-11", items: 2 },
];

const getStatusColor = (status) => {
  switch (status) {
    case "pending": return "bg-warning text-warning-foreground";
    case "processing": return "bg-primary text-primary-foreground";
    case "shipped": return "bg-blue-500 text-white";
    case "delivered": return "bg-success text-success-foreground";
    default: return "";
  }
};

export const OrdersSection = () => {
  const [orders] = useState(mockOrders);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">Orders Management</h2>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="premium-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-primary">Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{order.customer}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-primary text-lg">${order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="font-medium">{order.items} items</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center">
                      <Eye className="h-3 w-3" />
                      <span className="hidden xs:inline">View</span>
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 justify-center">
                      <Package className="h-3 w-3" />
                      <span className="hidden xs:inline">Process</span>
                    </Button>
                    <Button size="sm" className="btn-premium flex items-center gap-1 justify-center">
                      <Truck className="h-3 w-3" />
                      <span className="hidden xs:inline">Track</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
