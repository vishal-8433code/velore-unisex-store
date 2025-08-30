import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      icon: Package,
      change: "+12%",
      positive: true,
    },
    {
      title: "Total Orders",
      value: "8,492",
      icon: ShoppingCart,
      change: "+23%",
      positive: true,
    },
    {
      title: "Total Users", 
      value: "2,847",
      icon: Users,
      change: "+8%",
      positive: true,
    },
    {
      title: "Revenue",
      value: "$124,832",
      icon: DollarSign,
      change: "+15%",
      positive: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="stats-card hover:scale-105 transition-transform duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <p
                  className={`text-xs ${
                    stat.positive ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New order #1234 received</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-success rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Product inventory updated</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Low stock alert: Premium Widget
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full btn-premium text-left p-4 rounded-lg font-medium">
              Add New Product
            </button>
            <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground p-4 rounded-lg font-medium transition-colors">
              Process Pending Orders
            </button>
            <button className="w-full bg-muted hover:bg-muted/80 text-muted-foreground p-4 rounded-lg font-medium transition-colors">
              Export Reports
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
