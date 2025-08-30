import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Save, Shield, Bell, Globe, CreditCard } from "lucide-react";

export default function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">Settings</h2>
        <p className="text-muted-foreground">
          Manage your admin panel preferences
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Security Settings */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone signs into your account
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="bg-input border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates for important events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new orders are placed
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when products are running low on stock
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="Your Company Name"
                defaultValue="Premium Admin Corp"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@company.com"
                defaultValue="admin@premiumcorp.com"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                placeholder="UTC-5 (EST)"
                defaultValue="UTC-5 (EST)"
                className="bg-input border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Billing & Subscription */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CreditCard className="h-5 w-5" />
              Billing & Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Premium Plan</h4>
                <p className="text-sm text-muted-foreground">
                  $99/month - All features included
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">Active</p>
                <p className="text-sm text-muted-foreground">
                  Renews Jan 28, 2024
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Subscription
            </Button>
          </CardContent>
        </Card>

        {/* Save Settings Button */}
        <div className="flex justify-center sm:justify-end">
          <Button className="btn-premium flex items-center gap-2 w-full sm:w-auto">
            <Save className="h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
