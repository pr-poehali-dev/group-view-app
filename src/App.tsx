import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Feed from "./pages/Feed";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Icon from "@/components/ui/icon";

type Tab = "feed" | "groups" | "profile";

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen flex flex-col max-w-[480px] mx-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-50 glass px-5 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            МАРКЕТ
          </span>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center transition-all hover:border-violet-500/50">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center transition-all hover:border-violet-500/50">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 pb-24">
          {activeTab === "feed" && <Feed />}
          {activeTab === "groups" && <Groups />}
          {activeTab === "profile" && <Profile />}
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] glass border-t border-white/5 px-4 py-3 z-50">
          <div className="flex items-center justify-around">
            {[
              { id: "feed" as Tab, icon: "Layers", label: "Лента" },
              { id: "groups" as Tab, icon: "Grid3x3", label: "Группы" },
              { id: "profile" as Tab, icon: "User", label: "Профиль" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl tab-slide ${
                  activeTab === tab.id
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
};

export default App;
