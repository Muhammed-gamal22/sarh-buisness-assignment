import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard, Building2, CreditCard, Package, LifeBuoy, Megaphone,
    ChevronLeft, LogOut,
    MessageCircle
} from "lucide-react";
import akar from "/hero-villa.jpg";
import { useTokenStore } from "@/store/services/token-store";

const items = [
    { icon: CreditCard, label: "الطلبات", path: "/order" },

];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { removeToken } = useTokenStore();
    const { pathname } = useLocation();
    const base = "/hq";

    return (
        <aside className={`fixed top-0 right-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-20" : "w-64"}`}>
            <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                    {/* <Crown className="w-5 h-5 text-primary-foreground" /> */}
                    <img src={akar} alt="HQ Logo" className=" text-primary-foreground" />
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <h1 className="font-heading font-bold text-base text-sidebar-primary-foreground truncate">عقارى</h1>
                        <p className="text-xs text-sidebar-muted">Real Estate Console</p>
                    </div>
                )}
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {items.map((it) => {

                    return (
                        <button key={it.label} onClick={() => navigate("/orders")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors bg-sidebar-primary text-sidebar-primary-foreground`}>
                            <it.icon className="w-5 h-5 shrink-0" />
                            {!collapsed && <span>{it.label}</span>}
                        </button>
                    );
                })}
            </nav>

            <button onClick={() => setCollapsed(!collapsed)} className="absolute top-7 -left-3 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>

            <div className="px-3 py-4 border-t border-sidebar-border">
                <button onClick={() => {
                    removeToken();
                    navigate("/")
                    localStorage.clear();

                }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>الخروج</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;