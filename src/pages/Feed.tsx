import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Feed() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy, setSortBy] = useState<"new" | "popular">("new");

  const filtered = PRODUCTS.filter(
    (p) => activeCategory === "Все" || p.category === activeCategory
  );

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Sort + Filter row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 glass rounded-2xl">
          <button
            onClick={() => setSortBy("new")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
              sortBy === "new"
                ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white"
                : "text-muted-foreground"
            }`}
          >
            Новые
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
              sortBy === "popular"
                ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white"
                : "text-muted-foreground"
            }`}
          >
            Популярные
          </button>
        </div>
        <div className="text-xs text-muted-foreground">
          {filtered.length} товаров
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-2xl transition-all flex-shrink-0 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/20"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="space-y-4">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуй другую категорию</p>
        </div>
      )}
    </div>
  );
}
