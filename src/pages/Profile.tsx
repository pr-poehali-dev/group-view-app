import { useState } from "react";
import Icon from "@/components/ui/icon";

const HISTORY = [
  { id: 1, name: "Кроссовки Urban Runner", price: "12 990 ₽", date: "15 апр", status: "Доставлено", statusColor: "text-emerald-400" },
  { id: 2, name: "Наушники NeonSound Pro", price: "8 490 ₽", date: "10 апр", status: "В пути", statusColor: "text-violet-400" },
  { id: 3, name: "Часы Luxe Edition", price: "34 900 ₽", date: "2 апр", status: "Доставлено", statusColor: "text-emerald-400" },
  { id: 4, name: "Рюкзак Explorer", price: "6 799 ₽", date: "28 мар", status: "Доставлено", statusColor: "text-emerald-400" },
];

const SETTINGS = [
  { icon: "Bell", label: "Уведомления", value: "Включены" },
  { icon: "Shield", label: "Конфиденциальность", value: "Настроено" },
  { icon: "CreditCard", label: "Оплата", value: "2 карты" },
  { icon: "MapPin", label: "Адреса доставки", value: "3 адреса" },
  { icon: "Star", label: "Мои отзывы", value: "12 отзывов" },
  { icon: "Heart", label: "Избранное", value: "8 товаров" },
];

export default function Profile() {
  const [activeSection, setActiveSection] = useState<"main" | "history" | "settings">("main");

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Profile hero */}
      <div className="glass rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500/15 to-pink-500/15 blur-3xl" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-2xl font-black text-white font-display">
              АМ
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-background" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">Алексей Морозов</h2>
            <p className="text-muted-foreground text-sm">@alexmorozov</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-amber-400">4.9</span>
              <span className="text-xs text-muted-foreground ml-1">· Премиум</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Покупок", value: "47" },
            { label: "Отзывов", value: "12" },
            { label: "Бонусов", value: "3 420" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-black text-xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex items-center gap-2 p-1 glass rounded-2xl">
        {[
          { id: "main", label: "Главная" },
          { id: "history", label: "История" },
          { id: "settings", label: "Настройки" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as "main" | "history" | "settings")}
            className={`flex-1 text-xs font-semibold py-2 rounded-xl transition-all ${
              activeSection === s.id
                ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white"
                : "text-muted-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main section */}
      {activeSection === "main" && (
        <div className="space-y-3">
          {/* Promo card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/80 to-pink-600/80 p-5 glass">
            <div className="absolute right-4 top-4 text-4xl animate-float">🎁</div>
            <p className="text-white/70 text-xs uppercase tracking-wider font-semibold mb-1">Ваш бонус</p>
            <p className="text-white font-display font-black text-3xl">3 420 ₽</p>
            <p className="text-white/70 text-sm mt-1">Используй при следующей покупке</p>
            <button className="mt-3 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
              Использовать
            </button>
          </div>

          {/* Recent orders */}
          <div className="glass rounded-3xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Последние заказы</h3>
              <button
                onClick={() => setActiveSection("history")}
                className="text-xs text-violet-400 font-semibold"
              >
                Все →
              </button>
            </div>
            <div className="space-y-3">
              {HISTORY.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <Icon name="Package" size={16} className="text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                    <p className={`text-xs ${item.statusColor}`}>{item.status}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History section */}
      {activeSection === "history" && (
        <div className="space-y-3">
          {HISTORY.map((item, i) => (
            <div
              key={item.id}
              className="glass rounded-2xl p-4 flex items-center gap-3 card-enter"
              style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                <Icon name="ShoppingBag" size={18} className="text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                <span className={`text-xs font-semibold ${item.statusColor}`}>{item.status}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{item.price}</p>
                <button className="text-xs text-violet-400 mt-1">Повторить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings section */}
      {activeSection === "settings" && (
        <div className="glass rounded-3xl overflow-hidden">
          {SETTINGS.map((setting, i) => (
            <div
              key={setting.label}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-all ${
                i !== SETTINGS.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                <Icon name={setting.icon} size={16} className="text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{setting.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{setting.value}</span>
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logout */}
      {activeSection === "settings" && (
        <button className="w-full glass rounded-2xl p-4 text-rose-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-rose-500/10 transition-all">
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      )}
    </div>
  );
}
