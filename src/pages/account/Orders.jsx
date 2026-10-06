import { useState } from "react";
import OrderCard from "./components/OrderCard";
import OrderDetailsModal from "./components/OrderDetailsModal";
import productImage from "../../assets/product/image.png";
import productImageAlt from "../../assets/product/images.png";

const tabs = [
  { label: "All Orders", getCount: (items) => items.length },
  {
    label: "Pending",
    getCount: (items) =>
      items.filter((order) => matchesTab(order, "Pending")).length,
  },
  {
    label: "In Progress",
    getCount: (items) =>
      items.filter((order) => matchesTab(order, "In Progress")).length,
  },
  {
    label: "Delivered",
    getCount: (items) =>
      items.filter((order) => matchesTab(order, "Delivered")).length,
  },
  {
    label: "Cancelled",
    getCount: (items) =>
      items.filter((order) => matchesTab(order, "Cancelled")).length,
  },
];

const orders = [
  {
    code: "#GS-1024",
    date: "Sep 14, 2026 at 10:24 AM",
    items: 3,
    total: "$190.00",
    payment: "Paid",
    status: "Processing",
    product: {
      name: "Nike Air Force 1 '07",
      color: "White / Black",
      size: "9 (US)",
      qty: 1,
      price: "$110.00",
      image: productImage,
    },
  },
  {
    code: "#GS-1023",
    date: "Sep 09, 2026 at 02:16 PM",
    items: 1,
    total: "$86.00",
    payment: "Paid",
    status: "Shipped",
    product: {
      name: "Adidas Ultraboost 1.0",
      color: "Core Black",
      size: "9 (US)",
      qty: 1,
      price: "$86.00",
      image: productImageAlt,
    },
  },
  {
    code: "#GS-1019",
    date: "Aug 28, 2026 at 09:42 AM",
    items: 2,
    total: "$120.00",
    payment: "Paid",
    status: "Delivered",
    product: {
      name: "New Balance 530",
      color: "Grey / Silver",
      size: "8 (US)",
      qty: 1,
      price: "$100.00",
      image: productImage,
    },
  },
  {
    code: "#GS-1016",
    date: "Aug 18, 2026 at 11:08 AM",
    items: 1,
    total: "$54.00",
    payment: "Pending payment",
    status: "Pending",
    product: {
      name: "Campus First Mesh Running Sports",
      color: "Navy / White",
      size: "8 (US)",
      qty: 1,
      price: "$54.00",
      image: productImageAlt,
    },
  },
  {
    code: "#GS-1012",
    date: "Aug 03, 2026 at 04:30 PM",
    items: 4,
    total: "$240.00",
    payment: "Refunded",
    status: "Cancelled",
    product: {
      name: "Air Motion Runner",
      color: "Purple / White",
      size: "10 (US)",
      qty: 1,
      price: "$60.00",
      image: productImage,
    },
  },
];

function matchesTab(order, activeTab) {
  if (activeTab === "All Orders") return true;
  if (activeTab === "In Progress") {
    return ["Pending", "Processing", "Shipped"].includes(order.status);
  }

  return order.status === activeTab;
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const filteredOrders = orders.filter((order) => matchesTab(order, activeTab));

  return (
    <div className="grid gap-5">
      <header className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E96400]">
          Orders
        </p>
        <h1 className="mt-3 font-michroma text-2xl font-semibold text-[#07182E] sm:text-3xl">
          My Orders
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
          Review your order history, payment status, and delivery progress.
        </p>
      </header>

      <section className="rounded-2xl border border-[#E6EAF0] bg-white/70 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.04)] sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;
            const count = tab.getCount(orders);

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`h-10 shrink-0 cursor-pointer rounded-full px-4 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#E96400] text-white shadow-[0_10px_20px_rgba(233,100,0,0.22)]"
                    : "bg-white text-[#64748B] ring-1 ring-[#E6EAF0] hover:bg-[#FFF3E8] hover:text-[#E96400]"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>
        <div className="mt-5 grid gap-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.code}
              order={order}
              onViewDetails={setSelectedOrder}
            />
          ))}
        </div>{" "}
      </section>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
