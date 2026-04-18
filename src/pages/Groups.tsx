import { useState, useEffect } from "react";
import { GROUPS, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface Props {
  initialGroupId?: string | null;
  onGroupChange?: (id: string | null) => void;
}

export default function Groups({ initialGroupId, onGroupChange }: Props) {
  const [activeGroup, setActiveGroup] = useState<string | null>(initialGroupId ?? null);

  useEffect(() => {
    if (initialGroupId !== undefined) setActiveGroup(initialGroupId);
  }, [initialGroupId]);

  const setGroup = (id: string | null) => {
    setActiveGroup(id);
    onGroupChange?.(id);
  };

  const groupProducts = activeGroup
    ? PRODUCTS.filter((p) => p.group === GROUPS.find((g) => g.id === activeGroup)?.name)
    : [];

  if (activeGroup) {
    const group = GROUPS.find((g) => g.id === activeGroup)!;
    return (
      <div className="px-4 py-4 space-y-4">
        {/* Back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGroup(null)}
            className="w-9 h-9 glass rounded-2xl flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={16} />
          </button>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-xl shadow-md`}>
            {group.icon}
          </div>
          <div>
            <h2 className="font-display font-black text-lg leading-none">{group.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{group.count} товаров · {group.desc}</p>
          </div>
        </div>

        {groupProducts.length > 0 ? (
          <div className="space-y-4">
            {groupProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">{group.icon}</div>
            <p className="font-semibold text-foreground">Скоро появятся товары</p>
            <p className="text-sm text-muted-foreground mt-1">Следи за обновлениями</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Hero */}
      <div className="relative overflow-hidden glass rounded-3xl p-5">
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-2xl pointer-events-none" />
        <h2 className="font-display font-black text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-0.5">
          Категории
        </h2>
        <p className="text-sm text-muted-foreground">Выбери нужное направление</p>
      </div>

      {/* Groups grid */}
      <div className="grid grid-cols-2 gap-3">
        {GROUPS.map((group, i) => (
          <button
            key={group.id}
            onClick={() => setGroup(group.id)}
            className="glass rounded-3xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] card-enter"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
              {group.icon}
            </div>
            <h3 className="font-bold text-foreground text-base">{group.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight line-clamp-2">{group.desc}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-bold bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                {group.count}
              </span>
              <span className="text-xs text-muted-foreground">товаров</span>
            </div>
          </button>
        ))}
      </div>

      {/* Promo */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-pink-600 p-5">
        <div className="absolute right-0 top-0 bottom-0 w-28 opacity-20">
          <div className="w-28 h-28 rounded-full bg-white/40 -translate-x-4 -translate-y-4" />
        </div>
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Акция</p>
        <h3 className="text-white font-display font-black text-xl leading-tight">
          Новые товары<br />каждый день
        </h3>
        <p className="text-white/70 text-sm mt-2">Подпишись на группы и не пропусти</p>
      </div>
    </div>
  );
}
