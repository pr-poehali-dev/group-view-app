import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Feed from "./pages/Feed";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import MainMenu from "./components/MainMenu";
import Icon from "@/components/ui/icon";

type Tab = "feed" | "groups" | "chats" | "profile";

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const UNREAD_COUNT = 3;

  const handleSelectGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    setActiveTab("groups");
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <MainMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectGroup={handleSelectGroup}
      />

      <div className="min-h-screen flex flex-col max-w-[480px] mx-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-30 glass px-4 py-3.5 flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-2xl glass flex flex-col items-center justify-center gap-[5px] flex-shrink-0 hover:bg-white/10 transition-all"
          >
            <span className="w-4 h-[1.5px] bg-foreground rounded-full" />
            <span className="w-4 h-[1.5px] bg-foreground rounded-full" />
            <span className="w-2.5 h-[1.5px] bg-muted-foreground rounded-full self-start ml-[8px]" />
          </button>

          <button onClick={() => setActiveTab("feed")} className="flex-1 text-left">
            <span className="font-display text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              МАРКЕТ
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center transition-all hover:bg-white/10">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setActiveTab("chats")}
              className="relative w-9 h-9 rounded-full glass flex items-center justify-center transition-all hover:bg-white/10"
            >
              <Icon name="MessageCircle" size={16} className={activeTab === "chats" ? "text-violet-400" : "text-muted-foreground"} />
              {UNREAD_COUNT > 0 && activeTab !== "chats" && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {UNREAD_COUNT}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 pb-24">
          {activeTab === "feed" && <Feed />}
          {activeTab === "groups" && (
            <Groups initialGroupId={activeGroupId} onGroupChange={setActiveGroupId} />
          )}
          {activeTab === "chats" && <Chats />}
          {activeTab === "profile" && <Profile />}
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] glass border-t border-white/5 px-2 py-3 z-30">
          <div className="flex items-center justify-around">
            {[
              { id: "feed" as Tab, icon: "Layers", label: "Лента", badge: 0 },
              { id: "groups" as Tab, icon: "Grid3x3", label: "Группы", badge: 0 },
              { id: "chats" as Tab, icon: "MessageCircle", label: "Чаты", badge: UNREAD_COUNT },
              { id: "profile" as Tab, icon: "User", label: "Профиль", badge: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== "groups") setActiveGroupId(null);
                }}
                className={`relative flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl tab-slide ${
                  activeTab === tab.id
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {tab.badge > 0 && activeTab !== tab.id && (
                  <span className="absolute top-0.5 right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
};

export default App;
