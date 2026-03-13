import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, LogOut, Plus, Package, ShoppingCart, MessageSquare, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CropListing {
  id: string;
  crop_name: string;
  quality_grade: string;
  quantity: number;
  quantity_unit: string;
  price_per_unit: number;
  location: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

interface Order {
  id: string;
  quantity: number;
  offered_price: number;
  status: string;
  message: string | null;
  created_at: string;
  listing_id: string;
}

const Dashboard = () => {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"listings" | "orders">("listings");
  const [listings, setListings] = useState<CropListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    crop_name: "", quality_grade: "A", quantity: "", price_per_unit: "", location: "", description: "",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchListings();
      fetchOrders();
    }
  }, [user, role]);

  const fetchListings = async () => {
    if (!user) return;
    if (role === "farmer") {
      const { data } = await supabase.from("crop_listings").select("*").eq("farmer_id", user.id).order("created_at", { ascending: false });
      setListings((data as CropListing[]) || []);
    } else {
      const { data } = await supabase.from("crop_listings").select("*").eq("is_active", true).order("created_at", { ascending: false });
      setListings((data as CropListing[]) || []);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("crop_listings").insert({
      farmer_id: user.id,
      crop_name: form.crop_name,
      quality_grade: form.quality_grade,
      quantity: parseFloat(form.quantity),
      price_per_unit: parseFloat(form.price_per_unit),
      location: form.location,
      description: form.description || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Listing created!");
    setShowForm(false);
    setForm({ crop_name: "", quality_grade: "A", quantity: "", price_per_unit: "", location: "", description: "" });
    fetchListings();
  };

  const handlePlaceOrder = async (listing: CropListing) => {
    if (!user) return;
    const { error } = await supabase.from("orders").insert({
      listing_id: listing.id,
      dealer_id: user.id,
      farmer_id: listing.farmer_id as any,
      quantity: listing.quantity,
      offered_price: listing.price_per_unit,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Order placed!");
    fetchOrders();
  };

  const handleDeleteListing = async (id: string) => {
    const { error } = await supabase.from("crop_listings").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Listing deleted");
    fetchListings();
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) { toast.error(error.message); return; }
    toast.success(`Order ${status}`);
    fetchOrders();
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="glass border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold text-gradient">KrishiMitra</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground capitalize px-2 py-1 rounded-full bg-primary/10 text-primary">
              {role || "user"}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.h1 className="text-2xl font-bold text-foreground mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {role === "farmer" ? "🌾 Farmer Dashboard" : "🏪 Dealer Dashboard"}
        </motion.h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button variant={tab === "listings" ? "default" : "outline"} onClick={() => setTab("listings")} className={tab === "listings" ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground"}>
            <Package className="w-4 h-4 mr-1" /> {role === "farmer" ? "My Listings" : "Browse Crops"}
          </Button>
          <Button variant={tab === "orders" ? "default" : "outline"} onClick={() => setTab("orders")} className={tab === "orders" ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground"}>
            <ShoppingCart className="w-4 h-4 mr-1" /> Orders
          </Button>
        </div>

        {/* Listings Tab */}
        {tab === "listings" && (
          <div>
            {role === "farmer" && (
              <Button onClick={() => setShowForm(!showForm)} className="mb-4 bg-primary text-primary-foreground btn-glow">
                <Plus className="w-4 h-4 mr-1" /> Add Listing
              </Button>
            )}

            {showForm && role === "farmer" && (
              <motion.form onSubmit={handleCreateListing} className="glass rounded-xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Input placeholder="Crop Name" value={form.crop_name} onChange={(e) => setForm({ ...form, crop_name: e.target.value })} className="bg-secondary border-border" required />
                <select value={form.quality_grade} onChange={(e) => setForm({ ...form, quality_grade: e.target.value })} className="bg-secondary border border-border rounded-md px-3 py-2 text-foreground text-sm">
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                </select>
                <Input type="number" placeholder="Quantity (quintal)" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="bg-secondary border-border" required />
                <Input type="number" placeholder="Price per quintal (₹)" value={form.price_per_unit} onChange={(e) => setForm({ ...form, price_per_unit: e.target.value })} className="bg-secondary border-border" required />
                <Input placeholder="Farm Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="bg-secondary border-border" required />
                <Input placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary border-border" />
                <Button type="submit" className="bg-primary text-primary-foreground md:col-span-2">Create Listing</Button>
              </motion.form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((l) => (
                <motion.div key={l.id} className="glass rounded-xl p-5 card-hover" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-foreground text-lg">{l.crop_name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Grade {l.quality_grade}</span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>📦 {l.quantity} {l.quantity_unit}</p>
                    <p>💰 ₹{l.price_per_unit}/{l.quantity_unit}</p>
                    <p>📍 {l.location}</p>
                    {l.description && <p className="text-foreground/70">{l.description}</p>}
                  </div>
                  <div className="mt-4 flex gap-2">
                    {role === "dealer" && (
                      <Button size="sm" className="bg-primary text-primary-foreground btn-glow" onClick={() => handlePlaceOrder(l)}>
                        <ShoppingCart className="w-3 h-3 mr-1" /> Buy
                      </Button>
                    )}
                    {role === "farmer" && (
                      <Button size="sm" variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteListing(l.id)}>
                        <Trash2 className="w-3 h-3 mr-1" /> Delete
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
              {listings.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-12">
                  {role === "farmer" ? "No listings yet. Create your first crop listing!" : "No active listings available."}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="space-y-4">
            {orders.map((o) => (
              <motion.div key={o.id} className="glass rounded-xl p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground font-medium">Order #{o.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">Qty: {o.quantity} | ₹{o.offered_price}</p>
                    {o.message && <p className="text-sm text-foreground/70 mt-1">{o.message}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      o.status === "pending" ? "bg-accent/20 text-accent" :
                      o.status === "accepted" ? "bg-primary/20 text-primary" :
                      o.status === "rejected" ? "bg-destructive/20 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>{o.status}</span>
                    {role === "farmer" && o.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => handleUpdateOrderStatus(o.id, "accepted")}>Accept</Button>
                        <Button size="sm" variant="outline" className="border-destructive/30 text-destructive" onClick={() => handleUpdateOrderStatus(o.id, "rejected")}>Reject</Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {orders.length === 0 && <p className="text-muted-foreground text-center py-12">No orders yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
