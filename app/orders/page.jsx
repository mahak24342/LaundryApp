"use client";
import { useEffect, useState } from "react";
import Nav from "../components/nav";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    let url = "/api/order?";

    if (status) url += `status=${status}&`;
    if (search) url += `name=${search}&phone=${search}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const getStatusColor = (s) => {
    switch (s) {
      case "RECEIVED":
        return "bg-gray-700 text-gray-200";
      case "PROCESSING":
        return "bg-yellow-500/20 text-yellow-400";
      case "READY":
        return "bg-blue-500/20 text-blue-400";
      case "DELIVERED":
        return "bg-emerald-500/20 text-emerald-400";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white">
      
      {/* Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">

        <Nav />

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="pl-4 text-2xl md:text-3xl font-semibold tracking-tight">
            ORDERS
          </h1>
          <a href="/" className="text-sm text-white/50 hover:text-white">
            ← Back
          </a>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-3 backdrop-blur">

          <input
            placeholder="Search by name / phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm outline-none"
          >
            <option value="">All Status</option>
            <option value="RECEIVED">RECEIVED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="READY">READY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>

          <button
            onClick={fetchOrders}
            className="px-5 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            Search
          </button>
        </div>

        {/* Orders */}
        <div className="space-y-3">

          {orders.length === 0 && (
            <div className="text-center text-white/40 py-12">
              No orders found
            </div>
          )}

          {orders.map((o) => (
            <div
              key={o._id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4
              p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {/* Left */}
              <div>
                <p className="font-medium text-white">
                  {o.customerName}
                </p>
                <p className="text-xs text-white/40">
                  {o.phone}
                </p>
                <p className="text-xs text-white/30">
                  #{o._id.slice(-6).toUpperCase()}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center justify-between md:justify-end gap-4">

                <p className="text-emerald-400 font-semibold text-sm md:text-base">
                  ₹{o.total}
                </p>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}