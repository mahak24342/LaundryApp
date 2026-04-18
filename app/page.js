"use client";

import { useState, useEffect } from "react";
import Nav from "./components/nav";
import Footer from "./components/Footer";

export default function Home() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    garments: [{ type: "", quantity: 1, price: 0 }],
  });

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGarmentChange = (i, field, value) => {
    const updated = [...form.garments];
    updated[i][field] = value;
    setForm({ ...form, garments: updated });
  };

  const addGarment = () => {
    setForm({
      ...form,
      garments: [...form.garments, { type: "", quantity: 1, price: 0 }],
    });
  };

  const total = form.garments.reduce(
    (s, g) => s + (g.quantity || 0) * (g.price || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status: "RECEIVED" }),
    });

    setForm({
      customerName: "",
      phone: "",
      garments: [{ type: "", quantity: 1, price: 0 }],
    });

    setOpen(false);
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await fetch(`/api/order/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white">

      {/* glow bg */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-6 space-y-10">

        <Nav setOpen={setOpen} />

        {/* HERO */}
        <div className="text-center md:text-left space-y-3 pt-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Laundry Management Made Simple
          </h1>

          <p className="text-white/50 max-w-2xl text-sm md:text-base">
            Create, track, and manage all laundry orders in a clean and minimal dashboard.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 px-5 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90"
          >
            Get Started
          </button>
        </div>

        {/* ORDERS */}
        <div className="space-y-3">

          {orders.length === 0 && (
            <div className="text-center text-white/40 py-12">
              No orders yet 🚀
            </div>
          )}

          {orders.map((o) => {
            const status = (o.status || "RECEIVED").toUpperCase();

            return (
              <div
                key={o._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >

                {/* LEFT */}
                <div>
                  <p className="font-medium">{o.customerName}</p>
                  <p className="text-xs text-white/40">
                    #{o._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 flex-wrap md:justify-end">

                  <p className="text-emerald-400 font-semibold">
                    ₹{o.total}
                  </p>

                  {/* STATUS */}
                  <select
                    value={status}
                    onChange={async (e) => {
                      await fetch(`/api/order/${o._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: e.target.value }),
                      });
                      fetchOrders();
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white text-black"
                  >
                    <option>RECEIVED</option>
                    <option>PROCESSING</option>
                    <option>READY</option>
                    <option>DELIVERED</option>
                  </select>

                  {/* DELETE */}
                 <button
  onClick={() => deleteOrder(o._id)}
  className="text-xs px-3 py-1.5 rounded-lg 
  border border-red-500/30 bg-red-500/10 text-red-400
  hover:bg-red-500 hover:text-white
  transition-all duration-200"
>
  Delete
</button>

                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">

          <div className="w-full max-w-lg bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 space-y-5">

            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Create Order</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="customerName"
                placeholder="Customer Name"
                value={form.customerName}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />

              {form.garments.map((g, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">

                  <input
                    placeholder="Type"
                    value={g.type}
                    onChange={(e) => handleGarmentChange(i, "type", e.target.value)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />

                  <input
                    type="number"
                    placeholder="Qty"
                    value={g.quantity}
                    onChange={(e) => handleGarmentChange(i, "quantity", Number(e.target.value))}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={g.price}
                    onChange={(e) => handleGarmentChange(i, "price", Number(e.target.value))}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />

                </div>
              ))}

              <button
                type="button"
                onClick={addGarment}
                className="text-sm text-white/60"
              >
                + Add garment
              </button>

              <div className="flex justify-between text-sm text-white/50">
                <span>Total</span>
                <span className="text-emerald-400 font-semibold">₹{total}</span>
              </div>

              <button className="w-full py-3 rounded-xl bg-white text-black font-medium">
                Create Order
              </button>

            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}