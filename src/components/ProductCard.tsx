import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Product, Reaction } from "@/data/products";

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const [reactions, setReactions] = useState<Reaction[]>(product.reactions);
  const [saved, setSaved] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const toggleReaction = (idx: number) => {
    setReactions((prev) =>
      prev.map((r, i) =>
        i === idx
          ? { ...r, active: !r.active, count: r.active ? r.count - 1 : r.count + 1 }
          : r
      )
    );
    setShowReactions(false);
  };

  const totalReactions = reactions.reduce((s, r) => s + r.count, 0);
  const activeReaction = reactions.find((r) => r.active);

  return (
    <article
      className="glass rounded-3xl overflow-hidden card-enter glass-hover"
      style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${product.badgeColor}`}>
            {product.badge}
          </span>
        )}

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all ${
            saved ? "text-pink-400" : "text-white/70"
          }`}
        >
          <Icon name={saved ? "Heart" : "Heart"} size={16} className={saved ? "fill-pink-400" : ""} />
        </button>

        {/* Price on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-xl leading-none">{product.price}</p>
            {product.oldPrice && (
              <p className="text-white/50 text-sm line-through">{product.oldPrice}</p>
            )}
          </div>
          <button className="bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-2xl hover:opacity-90 transition-opacity">
            Купить
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Seller */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
            {product.sellerAvatar}
          </div>
          <span className="text-xs text-muted-foreground">{product.seller}</span>
          <span className="text-muted-foreground/40 text-xs ml-auto">{product.time}</span>
        </div>

        <h3 className="font-semibold text-foreground text-base mb-3 leading-tight">{product.name}</h3>

        {/* Reactions row */}
        <div className="flex items-center gap-2">
          {/* Active reactions display */}
          <div className="flex items-center gap-1 flex-1">
            {reactions.filter(r => r.count > 0).slice(0, 3).map((r, i) => (
              <button
                key={i}
                onClick={() => toggleReaction(reactions.indexOf(r))}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                  r.active
                    ? "bg-violet-500/25 border border-violet-500/50 text-violet-300"
                    : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
                }`}
              >
                <span>{r.emoji}</span>
                <span className="font-medium">{r.count}</span>
              </button>
            ))}
          </div>

          {/* Add reaction */}
          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-white/10 transition-all"
            >
              <Icon name="SmilePlus" size={14} />
            </button>

            {showReactions && (
              <div className="absolute bottom-10 right-0 glass rounded-2xl p-2 flex gap-1 z-10 reaction-pop">
                {reactions.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => toggleReaction(i)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all hover:scale-110 ${
                      r.active ? "bg-violet-500/30" : "hover:bg-white/10"
                    }`}
                    title={r.label}
                  >
                    {r.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-white/10 transition-all">
            <Icon name="Share2" size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
