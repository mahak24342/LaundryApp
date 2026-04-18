"use client";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import Footer from "../components/Footer";

export default function Page() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false); // for nav consistency

  const fetchDashboard = async () => {
    const res = await fetch("/api/dashboard");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#07070A] text-white flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 border border-white/10 border-t-white rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-white">

      {/* SAME BACKGROUND AS ORDERS */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">

        {/* ✅ NAV INSIDE CONTAINER */}
        <Nav setOpen={setOpen} />

        {/* HEADER */}
        <div>
          <h1 className="pt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Overview of orders and revenue
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <p className="text-white/40 text-sm">Total Orders</p>
            <p className="text-3xl font-semibold mt-2">
              {data.totalOrders}
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <p className="text-white/40 text-sm">Total Revenue</p>
            <p className="text-3xl font-semibold mt-2 text-emerald-400">
              ₹{data.totalRevenue}
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <p className="text-white/40 text-sm">Status Types</p>
            <p className="text-3xl font-semibold mt-2">
              {data.statusData.length}
            </p>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* STATUS */}
          <div className="lg:col-span-2 rounded-2xl p-5 bg-white/5 border border-white/10">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">
                Order Status
              </h2>
              <span className="text-xs text-white/40">Live</span>
            </div>

            <div className="space-y-3">
              {data.statusData.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <span className="text-white/70">
                    {s._id}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/60"
                        style={{
                          width: `${Math.min(
                            (s.count / data.totalOrders) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    <span className="font-semibold w-8 text-right">
                      {s.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* INSIGHTS */}
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10">

            <h2 className="text-lg font-semibold mb-4">
              Insights
            </h2>

            <div className="space-y-3 text-sm text-white/50">
              <div>
                ⚡ Highest activity in{" "}
                <span className="text-white">processing</span>
              </div>

              <div>
                💰 Revenue trend is{" "}
                <span className="text-emerald-400">positive</span>
              </div>

              <div>
                📦 Orders evenly distributed
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/40">
              Tip: Add charts next 🚀
            </div>

          </div>

        </div>

      </div>
      <Footer/>
    </div>
  );
}