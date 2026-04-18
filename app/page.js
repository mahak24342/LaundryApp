"use client";
import { useState, useEffect } from "react";
import Nav from "./components/nav";

export default function Home() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    garments: [{ type: "", quantity: 1, price: 0 }],
  });

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchOrders = async () => {
    const res = await fetch("/api/order");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGarmentChange = (index, field, value) => {
    const updated = [...form.garments];
    updated[index][field] = value;
    setForm({ ...form, garments: updated });
  };

  const addGarment = () => {
    setForm({
      ...form,
      garments: [...form.garments, { type: "", quantity: 1, price: 0 }],
    });
  };

  const total = form.garments.reduce(
    (sum, g) => sum + g.quantity * g.price,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        status: "RECEIVED", // ensure default
      }),
    });

    setForm({
      customerName: "",
      phone: "",
      garments: [{ type: "", quantity: 1, price: 0 }],
    });

    setOpen(false);
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white">

      {/* Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">

        {/* NAV */}
        <Nav setOpen={setOpen} />

        {/* ORDERS */}
        <div className="space-y-3">

          {orders.length === 0 && (
            <div className="text-center text-white/40 py-12">
              No orders yet. Create your first one 🚀
            </div>
          )}

          {orders.map((o) => {
            const currentStatus = (o.status || "RECEIVED").toUpperCase();

            return (
              <div
                key={o._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4
                p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >

                {/* LEFT */}
                <div>
                  <p className="font-medium text-white">
                    {o.customerName}
                  </p>
                  <p className="text-xs text-white/40">
                    #{o._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-between md:justify-end gap-4">

                  <p className="text-emerald-400 font-semibold text-sm md:text-base">
                    ₹{o.total}
                  </p>

                  {/* ✅ FIXED SELECT */}
                  <select
                    value={currentStatus}
                    onChange={async (e) => {
                      const newStatus = e.target.value;

                      await fetch(`/api/order/${o._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                      });

                      fetchOrders();
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white text-black outline-none"
                  >
                    <option value="RECEIVED">RECEIVED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="READY">READY</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>

                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">

          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0A0F] p-6 space-y-5 shadow-2xl">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create Order</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="customerName"
                placeholder="Customer Name"
                value={form.customerName}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none"
              />

              {/* GARMENTS */}
              <div className="space-y-2">
                {form.garments.map((g, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2">
                    <input
                      placeholder="Type"
                      value={g.type}
                      onChange={(e) =>
                        handleGarmentChange(i, "type", e.target.value)
                      }
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={g.quantity}
                      onChange={(e) =>
                        handleGarmentChange(i, "quantity", Number(e.target.value))
                      }
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={g.price}
                      onChange={(e) =>
                        handleGarmentChange(i, "price", Number(e.target.value))
                      }
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addGarment}
                  className="text-sm text-white/60 hover:text-white"
                >
                  + Add garment
                </button>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between text-sm text-white/50 pt-2">
                <span>Total</span>
                <span className="text-emerald-400 font-semibold">
                  ₹{total}
                </span>
              </div>

              {/* SUBMIT */}
              <button className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
                Create Order
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}