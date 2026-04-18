import { useEffect } from "react";
import { GROUPS } from "@/data/products";
import Icon from "@/components/ui/icon";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectGroup: (groupId: string) => void;
}

const QUICK_LINKS = [
  { icon: "Flame", label: "Хиты продаж", color: "text-orange-400", bg: "bg-orange-400/10" },
  { icon: "Tag", label: "Акции и скидки", color: "text-pink-400", bg: "bg-pink-400/10" },
  { icon: "Sparkles", label: "Новинки", color: "text-violet-400", bg: "bg-violet-400/10" },
  { icon: "Star", label: "Рекомендуем", color: "text-amber-400", bg: "bg-amber-400/10" },
];

export default function MainMenu({ open, onClose, onSelectGroup }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-400 ease-out`}
        style={{
          width: "min(340px, 88vw)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          background: "hsl(220 13% 8%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-6">
          <div>
            <span className="font-display font-black text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              МАРКЕТ
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">Каталог товаров</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Quick links */}
        <div className="px-4 mb-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 px-1">Быстрый доступ</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl ${link.bg} hover:brightness-125 transition-all text-left`}
              >
                <Icon name={link.icon} size={15} className={link.color} />
                <span className="text-xs font-semibold text-foreground leading-tight">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-white/5 mb-4" />

        {/* Groups list */}
        <div className="px-4 flex-1 overflow-y-auto scrollbar-hide">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 px-1">Категории</p>
          <div className="space-y-1">
            {GROUPS.map((group, i) => (
              <button
                key={group.id}
                onClick={() => { onSelectGroup(group.id); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/5 transition-all text-left group"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-xl flex-shrink-0 shadow-md`}>
                  {group.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{group.name}</p>
                  <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">{group.desc}</p>
                </div>

                {/* Count + arrow */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-xs font-bold bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                    {group.count}
                  </span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-white/5 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              АМ
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Алексей Морозов</p>
              <p className="text-xs text-muted-foreground">Премиум · 3 420 бонусов</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Settings" size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
