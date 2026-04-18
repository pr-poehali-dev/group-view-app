import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import type { Product } from "@/data/products";

interface Message {
  id: number;
  from: "buyer" | "seller";
  text: string;
  time: string;
  type?: "order" | "text";
  orderStatus?: "pending" | "confirmed" | "declined";
}

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const now = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const QUICK_REPLIES = [
  "Этот товар ещё в наличии?",
  "Есть доставка в мой город?",
  "Можно торговаться?",
  "Когда смогу получить?",
];

export default function ChatDrawer({ open, onClose, product }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "seller",
      text: `Привет! Я продаю «${product.name}». Чем могу помочь?`,
      time: "сейчас",
    },
  ]);
  const [input, setInput] = useState("");
  const [orderSent, setOrderSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const sellerReply = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies: Record<string, string> = {
        "наличии": "Да, товар в наличии! Можете оформлять заказ.",
        "доставка": `Доставляем по всей России. Обычно 3–5 дней до вашего города.`,
        "торговаться": "Цена окончательная, но при заказе от 2 штук — скидка 10%.",
        "получить": "При заказе сегодня — отправка завтра. Доставка 3–5 рабочих дней.",
      };
      const key = Object.keys(replies).find(k => userText.toLowerCase().includes(k));
      const text = key ? replies[key] : "Хороший вопрос! Уточните детали — отвечу подробнее.";
      setMessages(prev => [...prev, { id: Date.now(), from: "seller", text, time: now() }]);
    }, 1200);
  };

  const sendMessage = (text?: string) => {
    const txt = (text ?? input).trim();
    if (!txt) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "buyer", text: txt, time: now() }]);
    setInput("");
    sellerReply(txt);
  };

  const sendOrder = () => {
    if (orderSent) return;
    setOrderSent(true);
    const orderMsg: Message = {
      id: Date.now(),
      from: "buyer",
      text: `Хочу оформить заказ:\n${product.name}\nЦена: ${product.price}`,
      time: now(),
      type: "order",
      orderStatus: "pending",
    };
    setMessages(prev => [...prev, orderMsg]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev =>
        prev.map(m => m.type === "order" ? { ...m, orderStatus: "confirmed" } : m)
      );
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "seller",
          text: "✅ Заказ принят! Пришлю реквизиты для оплаты. Ожидайте подтверждения.",
          time: now(),
        },
      ]);
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)" }}
        onClick={onClose}
      />

      {/* Panel — снизу вверх */}
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex flex-col transition-transform duration-400 ease-out`}
        style={{
          height: "88vh",
          transform: open ? "translateY(0)" : "translateY(100%)",
          background: "hsl(220 13% 7%)",
          borderRadius: "24px 24px 0 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/5 flex-shrink-0">
          {/* Drag handle */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-1">
            {product.sellerAvatar}
          </div>
          <div className="flex-1 min-w-0 mt-1">
            <p className="font-semibold text-foreground text-sm leading-none">{product.seller}</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Онлайн · отвечает быстро
            </p>
          </div>

          {/* Product pill */}
          <div className="flex items-center gap-2 glass rounded-2xl px-2.5 py-1.5 max-w-[120px] mt-1">
            <img src={product.images[0]} alt="" className="w-6 h-6 rounded-lg object-cover flex-shrink-0" />
            <span className="text-[10px] text-muted-foreground truncate leading-tight">{product.name}</span>
          </div>

          <button onClick={onClose} className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all mt-1 flex-shrink-0">
            <Icon name="X" size={15} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">

          {/* Product card mini */}
          <div className="flex items-center gap-3 glass rounded-2xl p-3 mx-auto max-w-xs">
            <img src={product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{product.name}</p>
              <p className="text-sm font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{product.price}</p>
            </div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "buyer" ? "justify-end" : "justify-start"}`}>
              {msg.from === "seller" && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[9px] font-bold text-white mr-2 mt-auto mb-0.5 flex-shrink-0">
                  {product.sellerAvatar[0]}
                </div>
              )}

              <div className={`max-w-[72%] ${msg.from === "buyer" ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                {msg.type === "order" ? (
                  <div className={`rounded-2xl overflow-hidden border ${
                    msg.orderStatus === "confirmed" ? "border-emerald-500/40" :
                    msg.orderStatus === "declined" ? "border-rose-500/40" :
                    "border-violet-500/40"
                  }`}>
                    <div className={`px-4 py-2 text-xs font-bold text-white flex items-center gap-2 ${
                      msg.orderStatus === "confirmed" ? "bg-emerald-500/20" :
                      msg.orderStatus === "declined" ? "bg-rose-500/20" :
                      "bg-violet-500/20"
                    }`}>
                      <Icon name={msg.orderStatus === "confirmed" ? "CheckCircle" : msg.orderStatus === "declined" ? "XCircle" : "ShoppingBag"} size={14} />
                      {msg.orderStatus === "confirmed" ? "Заказ подтверждён" :
                       msg.orderStatus === "declined" ? "Заказ отклонён" :
                       "Заявка на заказ"}
                    </div>
                    <div className="px-4 py-3 bg-white/3">
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i} className={`text-sm ${i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{line}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.from === "buyer"
                      ? "bg-gradient-to-br from-violet-500 to-pink-500 text-white rounded-br-sm"
                      : "bg-white/8 text-foreground rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                )}
                <span className="text-[10px] text-muted-foreground/50 px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                {product.sellerAvatar[0]}
              </div>
              <div className="bg-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="whitespace-nowrap text-xs font-medium px-3 py-2 rounded-2xl glass hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all flex-shrink-0"
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        {/* Order button */}
        {!orderSent && (
          <div className="px-4 pb-2 flex-shrink-0">
            <button
              onClick={sendOrder}
              className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              <Icon name="ShoppingBag" size={16} />
              Оформить заказ · {product.price}
            </button>
          </div>
        )}

        {/* Input row */}
        <div className="px-4 pb-6 pt-2 flex items-center gap-2 border-t border-white/5 flex-shrink-0">
          <div className="flex-1 flex items-center gap-2 glass rounded-2xl px-4 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Написать продавцу..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="text-violet-400 hover:text-violet-300 disabled:opacity-30 transition-all"
            >
              <Icon name="Mic" size={16} />
            </button>
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white disabled:opacity-40 transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
