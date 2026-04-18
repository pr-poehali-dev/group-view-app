import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import ChatDrawer from "@/components/ChatDrawer";
import Icon from "@/components/ui/icon";

type ChatPreview = {
  id: number;
  product: Product;
  lastMessage: string;
  time: string;
  unread: number;
  status: "online" | "offline" | "away";
};

const CHAT_LIST: ChatPreview[] = [
  {
    id: 1,
    product: PRODUCTS[0],
    lastMessage: "Да, товар в наличии! Можете оформлять заказ.",
    time: "сейчас",
    unread: 2,
    status: "online",
  },
  {
    id: 2,
    product: PRODUCTS[1],
    lastMessage: "Доставляем по всей России. Обычно 3–5 дней.",
    time: "15 мин",
    unread: 0,
    status: "online",
  },
  {
    id: 3,
    product: PRODUCTS[2],
    lastMessage: "Цена окончательная, при заказе от 2 штук — скидка 10%",
    time: "1 ч",
    unread: 0,
    status: "away",
  },
  {
    id: 4,
    product: PRODUCTS[3],
    lastMessage: "✅ Заказ принят! Пришлю реквизиты для оплаты.",
    time: "3 ч",
    unread: 1,
    status: "offline",
  },
  {
    id: 5,
    product: PRODUCTS[4],
    lastMessage: "Хороший вопрос! Уточните детали — отвечу подробнее.",
    time: "вчера",
    unread: 0,
    status: "offline",
  },
];

const statusColors: Record<string, string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
  offline: "bg-white/20",
};

const statusLabels: Record<string, string> = {
  online: "Онлайн",
  away: "Недавно",
  offline: "Не в сети",
};

export default function Chats() {
  const [openChat, setOpenChat] = useState<Product | null>(null);
  const [chats, setChats] = useState(CHAT_LIST);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const openChatWith = (chat: ChatPreview) => {
    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
    setOpenChat(chat.product);
  };

  const totalUnread = chats.reduce((s, c) => s + c.unread, 0);
  const visible = filter === "unread" ? chats.filter(c => c.unread > 0) : chats;

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-black text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent leading-none">
              Сообщения
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {totalUnread > 0 ? `${totalUnread} непрочитанных` : "Все прочитаны"}
            </p>
          </div>
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <Icon name="PenSquare" size={16} />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 p-1 glass rounded-2xl">
          {[
            { id: "all", label: "Все чаты" },
            { id: "unread", label: `Непрочитанные${totalUnread > 0 ? ` · ${totalUnread}` : ""}` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as "all" | "unread")}
              className={`flex-1 text-xs font-semibold py-2 rounded-xl transition-all ${
                filter === f.id
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white"
                  : "text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 scrollbar-hide">
        {visible.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💬</div>
            <p className="font-semibold text-foreground">Нет непрочитанных</p>
            <p className="text-sm text-muted-foreground mt-1">Все сообщения просмотрены</p>
          </div>
        )}

        {visible.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => openChatWith(chat)}
            className="w-full flex items-center gap-3 glass rounded-2xl p-3.5 hover:bg-white/7 active:scale-[0.99] transition-all text-left card-enter"
            style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
          >
            {/* Seller avatar with product thumb */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                {chat.product.sellerAvatar}
              </div>
              {/* Product mini thumbnail */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg overflow-hidden border-2 border-background">
                <img src={chat.product.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              {/* Online dot */}
              <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColors[chat.status]}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-semibold text-foreground text-sm">{chat.product.seller}</p>
                <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">{chat.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate leading-relaxed">
                {chat.lastMessage}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <img src={chat.product.images[0]} alt="" className="w-3.5 h-3.5 rounded object-cover opacity-60" />
                <span className="text-[10px] text-muted-foreground/60 truncate">{chat.product.name}</span>
              </div>
            </div>

            {/* Unread badge */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {chat.unread > 0 ? (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {chat.unread}
                </span>
              ) : (
                <Icon name="CheckCheck" size={14} className="text-violet-400" />
              )}
              <span className={`text-[9px] font-medium ${statusColors[chat.status] === "bg-emerald-400" ? "text-emerald-400" : "text-muted-foreground/50"}`}>
                {statusLabels[chat.status]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Chat drawer */}
      {openChat && (
        <ChatDrawer
          open={!!openChat}
          onClose={() => setOpenChat(null)}
          product={openChat}
        />
      )}
    </div>
  );
}
