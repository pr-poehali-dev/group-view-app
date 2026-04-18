import { useState } from "react";
import { GROUPS, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

export default function Groups() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groupProducts = activeGroup
    ? PRODUCTS.filter((p) => p.group === GROUPS.find((g) => g.id === activeGroup)?.name)
    : [];

  if (activeGroup) {
    const group = GROUPS.find((g) => g.id === activeGroup)!;
    return (
      <div className="px-4 py-4 space-y-4">
        {/* Back header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveGroup(null)}
            className="w-9 h-9 glass rounded-2xl flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={16} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{group.icon}</span>
            <div>
              <h2 className="font-display font-black text-lg">{group.name}</h2>
              <p className="text-xs text-muted-foreground">{group.count} товаров</p>
            </div>
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
    <div className="px-4 py-4 space-y-4">
      {/* Hero */}
      <div className="glass rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-2xl" />
        <h2 className="font-display font-black text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-1">
          Группы
        </h2>
        <p className="text-sm text-muted-foreground">Найди нужное по категориям</p>
      </div>

      {/* Groups grid */}
      <div className="grid grid-cols-2 gap-3">
        {GROUPS.map((group, i) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className="glass rounded-3xl p-4 text-left transition-all hover:scale-[1.02] card-enter"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
              {group.icon}
            </div>
            <h3 className="font-bold text-foreground text-base">{group.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{group.desc}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-semibold bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                {group.count}
              </span>
              <span className="text-xs text-muted-foreground">товаров</span>
            </div>
          </button>
        ))}
      </div>

      {/* Promo banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-pink-600 p-5">
        <div className="absolute right-0 top-0 w-32 h-full opacity-20">
          <div className="w-32 h-32 rounded-full bg-white/30 -translate-x-6 -translate-y-6" />
        </div>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Акция</p>
        <h3 className="text-white font-display font-black text-xl leading-tight">
          Новые товары<br />каждый день
        </h3>
        <p className="text-white/70 text-sm mt-2">Подпишись на группы и не пропусти</p>
      </div>
    </div>
  );
}
