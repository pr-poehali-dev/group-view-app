import { useState, useEffect } from "react";
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
  const [activePhoto, setActivePhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(0);

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

  const openLightbox = (i: number) => { setLightboxPhoto(i); setLightbox(true); };
  const closeLightbox = () => setLightbox(false);
  const lbPrev = () => setLightboxPhoto((p) => (p - 1 + product.images.length) % product.images.length);
  const lbNext = () => setLightboxPhoto((p) => (p + 1) % product.images.length);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, product.images.length]);

  const prevPhoto = () => setActivePhoto((p) => (p - 1 + product.images.length) % product.images.length);
  const nextPhoto = () => setActivePhoto((p) => (p + 1) % product.images.length);

  const makeSwipeHandlers = (onLeft: () => void, onRight: () => void) => {
    let startX = 0;
    return {
      onTouchStart: (e: React.TouchEvent) => { startX = e.touches[0].clientX; },
      onTouchEnd: (e: React.TouchEvent) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { if (diff > 0) onLeft(); else onRight(); }
      },
    };
  };

  const gallerySwipe = makeSwipeHandlers(nextPhoto, prevPhoto);
  const lbSwipe = makeSwipeHandlers(lbNext, lbPrev);

  return (
    <article
      className="glass rounded-3xl overflow-hidden card-enter"
      style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
    >
      {/* ── GALLERY ── */}
      <div className="relative overflow-hidden h-64 group" {...gallerySwipe}>
        {/* Photos */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activePhoto * 100}%)`, width: `${product.images.length * 100}%` }}
        >
          {product.images.map((src, i) => (
            <div key={i} className="h-full flex-shrink-0" style={{ width: `${100 / product.images.length}%` }}>
              <img src={src} alt={`${product.name} фото ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Prev / Next arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="ChevronLeft" size={16} className="text-white" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="ChevronRight" size={16} className="text-white" />
            </button>
          </>
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${product.badgeColor}`}>
            {product.badge}
          </span>
        )}

        {/* Save */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all"
        >
          <Icon name="Heart" size={16} className={saved ? "fill-pink-400 text-pink-400" : "text-white/70"} />
        </button>

        {/* Open fullscreen button */}
        <button
          onClick={() => openLightbox(activePhoto)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-all"
        >
          <Icon name="Expand" size={14} />
        </button>

        {/* Dot indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`transition-all rounded-full ${
                  i === activePhoto ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
          onClick={closeLightbox}
          {...lbSwipe}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
          >
            <Icon name="X" size={18} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 glass rounded-full px-3 py-1.5 text-xs text-white/70 font-semibold">
            {lightboxPhoto + 1} / {product.images.length}
          </div>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxPhoto}
              src={product.images[lightboxPhoto]}
              alt={`${product.name} фото ${lightboxPhoto + 1}`}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl"
              style={{ animation: "lbFadeIn 0.25s ease" }}
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={lbPrev}
                  className="absolute -left-14 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={lbNext}
                  className="absolute -right-14 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxPhoto(i)}
                  className={`w-12 h-12 rounded-xl overflow-hidden transition-all ${
                    i === lightboxPhoto ? "ring-2 ring-violet-500 scale-110" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Thumbnail strip */}
      {product.images.length > 1 && (
        <div className="flex gap-2 px-4 pt-3">
          {product.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                i === activePhoto ? "ring-2 ring-violet-500 ring-offset-1 ring-offset-background" : "opacity-50 hover:opacity-80"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* ── INFO BLOCK ── */}
      <div className="p-4 pt-3 space-y-3">

        {/* Seller row */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
            {product.sellerAvatar}
          </div>
          <span className="text-xs text-muted-foreground">{product.seller}</span>
          <span className="text-muted-foreground/40 text-xs ml-auto">{product.time}</span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-foreground text-base leading-tight">{product.name}</h3>

        {/* Description */}
        <div>
          <p className={`text-sm text-muted-foreground leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
            {product.description}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-violet-400 font-semibold mt-1"
          >
            {expanded ? "Свернуть" : "Читать далее"}
          </button>
        </div>

        {/* Specs (shown when expanded) */}
        {expanded && (
          <div className="grid grid-cols-2 gap-1.5">
            {product.specs.map((spec, i) => (
              <div key={i} className="bg-white/5 rounded-xl px-3 py-2 text-xs text-muted-foreground">
                {spec}
              </div>
            ))}
          </div>
        )}

        {/* Separator */}
        <div className="border-t border-white/5" />

        {/* Price + Buy */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display font-black text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent leading-none">
              {product.price}
            </p>
            {product.oldPrice && (
              <p className="text-muted-foreground text-xs line-through mt-0.5">{product.oldPrice}</p>
            )}
          </div>
          <button className="bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            В корзину
          </button>
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-2">
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