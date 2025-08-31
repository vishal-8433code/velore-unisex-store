"use client"

import React from "react"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Switch } from "../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Button } from "../components/ui/button"

export default function EditProductForm() {
  // Demo prefill — replace with real data as needed.
  const [form, setForm] = React.useState({
    name: "Midnight Leather Backpack",
    sku: "BK-MIDNIGHT-001",
    price: "149.00",
    sale: false,
    stock: "120",
    status: "active",
  })
  const [saving, setSaving] = React.useState(false)

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      // Simulated save — integrate with API/Server Action as needed.
      await new Promise((r) => setTimeout(r, 800))
      console.log("[v0] Saved:", form)
    } finally {
      setSaving(false)
    }
  }

  function onCancel() {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }

  return (
    <Card
      className={[
        // Premium glass-card with soft yellow glow
        "animate-in fade-in-50",
        "border border-yellow-400/15 bg-neutral-900/60 backdrop-blur",
        "ring-1 ring-yellow-400/10 shadow-lg shadow-yellow-400/10",
        "rounded-2xl transition-all duration-300 ease-out",
        "hover:shadow-yellow-400/20 hover:-translate-y-0.5",
      ].join(" ")}
    >
      <form onSubmit={onSubmit} aria-busy={saving} className="contents">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Product Name - read-only */}
            <div className="md:col-span-2">
              <Label htmlFor="name" className="text-sm text-neutral-200">
                Product Name
              </Label>
              <Input
                id="name"
                value={form.name}
                readOnly
                className={[
                  "mt-2",
                  "bg-black/40 border-yellow-400/20 text-white placeholder-neutral-500",
                  "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
                  "read-only:opacity-70 read-only:cursor-not-allowed",
                ].join(" ")}
              />
            </div>

            {/* SKU - read-only */}
            <div className="md:col-span-2">
              <Label htmlFor="sku" className="text-sm text-neutral-200">
                SKU
              </Label>
              <Input
                id="sku"
                value={form.sku}
                readOnly
                className={[
                  "mt-2",
                  "bg-black/40 border-yellow-400/20 text-white placeholder-neutral-500",
                  "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
                  "read-only:opacity-70 read-only:cursor-not-allowed",
                ].join(" ")}
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-sm text-neutral-200">
                Price
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="rounded-md border border-yellow-400/20 bg-black/40 px-2 py-2 text-neutral-300"
                >
                ₹
                </span>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="decimal"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className={[
                    "flex-1 min-w-0",
                    "bg-black/40 border-yellow-400/20 text-white placeholder-neutral-500",
                    "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
                  ].join(" ")}
                />
              </div>
            </div>

            {/* Stock Quantity */}
            <div>
              <Label htmlFor="stock" className="text-sm text-neutral-200">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
                className={[
                  "mt-2",
                  "bg-black/40 border-yellow-400/20 text-white placeholder-neutral-500",
                  "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
                ].join(" ")}
              />
            </div>

            {/* Sale Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-yellow-400/10 bg-black/30 p-4 md:col-span-2">
              <div>
                <p className="text-sm font-medium text-neutral-100">Sale</p>
                <p className="text-xs text-neutral-400">Toggle if the product is currently on sale.</p>
              </div>
              <Switch
                id="sale"
                checked={form.sale}
                onCheckedChange={(v) => update("sale", v)}
                className="data-[state=checked]:bg-yellow-400"
                aria-label="Toggle sale"
              />
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <Label className="text-sm text-neutral-200" htmlFor="status">
                Status
              </Label>
              <Select value={form.status} onValueChange={(v) => update("status", v)}>
                <SelectTrigger
                  id="status"
                  className={[
                    "mt-2",
                    "bg-black/40 border-yellow-400/20 text-white",
                    "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
                  ].join(" ")}
                  aria-label="Product status"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="border-yellow-400/20 bg-neutral-900/80 backdrop-blur text-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col-reverse gap-3 p-6 md:flex-row md:justify-end md:gap-4 md:p-8">
          {/* Cancel */}
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className={[
              "border border-yellow-400 text-yellow-400",
              "hover:bg-yellow-400/10",
              "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
            ].join(" ")}
            
          >
            Cancel
          </Button>

          {/* Save */}
          <Button
            type="submit"
            disabled={saving}
            className={[
              "bg-yellow-400 text-black hover:bg-yellow-300",
              "shadow-lg hover:shadow-yellow-400/30",
              "disabled:opacity-70 disabled:cursor-not-allowed",
              "focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0",
            ].join(" ")}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
