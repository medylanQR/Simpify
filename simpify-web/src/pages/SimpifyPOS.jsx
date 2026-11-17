import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Printer,
  Smartphone,
  CreditCard,
  Banknote,
  CheckCircle2,
  Search,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const POS_ITEMS = [
  { id: 1, sku: 'CAF-01', name: 'Café Latte Especial 12oz', price: 2800, category: 'Cafetería', stock: 42 },
  { id: 2, sku: 'CAF-04', name: 'Cold Brew Vainilla', price: 3100, category: 'Cafetería', stock: 18 },
  { id: 3, sku: 'PAN-02', name: 'Croissant de Almendras', price: 3200, category: 'Repostería', stock: 14 },
  { id: 4, sku: 'ALM-01', name: 'Bowl Ejecutivo Proteína', price: 6500, category: 'Cocina', stock: 25 },
  { id: 5, sku: 'ALM-05', name: 'Sándwich Ciabatta Pesto', price: 5400, category: 'Cocina', stock: 19 },
  { id: 6, sku: 'SER-01', name: 'Servicio / Corte Premium', price: 8500, category: 'Servicios', stock: 99 },
  { id: 7, sku: 'RET-03', name: 'Café en Grano Reserva 340g', price: 7800, category: 'Retail', stock: 11 },
  { id: 8, sku: 'RET-09', name: 'Tarjeta Regalo Simpify', price: 15000, category: 'Retail', stock: 50 },
];

const CATEGORIES = ['Todos', 'Cafetería', 'Repostería', 'Cocina', 'Servicios', 'Retail'];

export default function SimpifyPOS({ onAddTransaction }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderType, setOrderType] = useState('Mostrador');
  const [cart, setCart] = useState([
    { id: 1, sku: 'CAF-01', name: 'Café Latte Especial 12oz', price: 2800, qty: 2 },
    { id: 4, sku: 'ALM-01', name: 'Bowl Ejecutivo Proteína', price: 6500, qty: 1 },
  ]);
  const [discountPct, setDiscountPct] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('SINPE Móvil');
  const [customerPhone, setCustomerPhone] = useState('+506 8450-1122');
  const [customerName, setCustomerName] = useState('Cliente Mostrador');
  const [cashTendered, setCashTendered] = useState(15000);
  const [lastOrder, setLastOrder] = useState(null);

  const updateQty = (item, delta) => {
    const exists = cart.find((c) => c.id === item.id);
    if (!exists && delta > 0) {
      setCart([...cart, { ...item, qty: 1 }]);
    } else if (exists) {
      const nextQty = exists.qty + delta;
      if (nextQty <= 0) {
        setCart(cart.filter((c) => c.id !== item.id));
      } else {
        setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: nextQty } : c)));
      }
    }
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = Math.round(subtotal * (discountPct / 100));
  const total = subtotal - discountAmount;
  const vuelto = Math.max(0, cashTendered - total);

  const filteredCatalog = POS_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    const orderId = `POS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTx = {
      id: orderId,
      name: customerName || 'Cliente POS',
      phone: customerPhone,
      initials: 'POS',
      amount: total,
      bank: paymentMethod === 'SINPE Móvil' ? 'BAC Credomatic' : paymentMethod,
      date: 'Hace un instante (Caja #01)',
      status: 'Verificado',
    };
    if (onAddTransaction) onAddTransaction(newTx);
    setLastOrder({ ...newTx, itemsCount: cart.reduce((a, b) => a + b.qty, 0) });
    setCart([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* POS HARDWARE & TERMINAL STATUS BAR */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Simpify POS — Terminal #01
            </span>
          </div>
          <span className="text-xs text-slate-300">
            Modo: <strong className="text-white">Verificación de Cajero (Sin acceso bancario)</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400">
            ● Impresora 80mm ESC/POS: Lista
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
            Gaveta: Conectada
          </span>
        </div>
      </div>

      {/* MAIN POS WORKSPACE */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: CATALOG & FILTERS */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Pills + SKU Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    activeCategory === cat
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar producto o SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-full sm:w-48 focus:outline-none focus:border-[#0F172A]"
              />
            </div>
          </div>

          {/* Product Touch Grid */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            {filteredCatalog.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => updateQty(item, 1)}
                  className={`bg-white p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer group ${
                    inCart
                      ? 'border-[#0F172A] shadow-xs'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.sku}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#0F172A]">{item.name}</p>
                    <p className="text-sm font-mono font-bold text-emerald-700 tabular-nums">
                      ₡{item.price.toLocaleString('es-CR')}
                    </p>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      inCart
                        ? 'bg-[#0F172A] text-[#10B981]'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-[#0F172A] group-hover:text-white'
                    }`}
                  >
                    {inCart ? `${inCart.qty}x` : <Plus className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: CASHIER REGISTER + THERMAL TICKET PREVIEW */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_12px_40px_rgb(15,23,42,0.05)] sticky top-28 space-y-5">
          {/* Order Type Switcher */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['Mostrador', 'Para Llevar', 'Express'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setOrderType(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    orderType === mode ? 'bg-white text-[#0F172A] shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCart([])}
              className="text-xs text-slate-400 hover:text-rose-600 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Limpiar
            </button>
          </div>

          {/* Line Items with +/- Controls */}
          <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">
                Seleccioná productos del catálogo para iniciar el cobro en caja.
              </p>
            ) : (
              cart.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="pr-2">
                    <p className="font-bold text-[#0F172A]">{c.name}</p>
                    <p className="text-[11px] font-mono text-slate-400">
                      ₡{c.price.toLocaleString('es-CR')} c/u
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-1.5 py-0.5">
                      <button
                        type="button"
                        onClick={() => updateQty(c, -1)}
                        className="p-1 text-slate-600 hover:text-[#0F172A] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-xs w-4 text-center">{c.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(c, 1)}
                        className="p-1 text-slate-600 hover:text-[#0F172A] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono font-bold text-[#0F172A] w-20 text-right tabular-nums">
                      ₡{(c.qty * c.price).toLocaleString('es-CR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Discount Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" /> Descuento comercial:
            </span>
            <div className="flex gap-1.5">
              {[0, 5, 10, 15].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPct(pct)}
                  className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold cursor-pointer ${
                    discountPct === pct
                      ? 'bg-[#0F172A] text-[#10B981]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'SINPE Móvil', icon: Smartphone },
                { label: 'Datáfono', icon: CreditCard },
                { label: 'Efectivo', icon: Banknote },
              ].map((m) => {
                const Icon = m.icon;
                const active = paymentMethod === m.label;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setPaymentMethod(m.label)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                      active
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-slate-50 text-slate-600 border-slate-200/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#10B981]' : 'text-slate-400'}`} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditional Payment Helper: SINPE Radar vs Cash Change */}
            {paymentMethod === 'SINPE Móvil' && (
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-950 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    Verificador de Cajero en Vivo
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 font-semibold">
                    Escuchando +506 8888-9999
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Teléfono cliente"
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-xs font-mono font-semibold text-[#0F172A]"
                  />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nombre cliente"
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-xs font-semibold text-[#0F172A]"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'Efectivo' && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Paga con billete de:</span>
                  <div className="flex gap-1.5 mt-1">
                    {[5000, 10000, 20000].map((bill) => (
                      <button
                        key={bill}
                        type="button"
                        onClick={() => setCashTendered(bill)}
                        className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold cursor-pointer ${
                          cashTendered === bill
                            ? 'bg-[#0F172A] text-white'
                            : 'bg-white border border-slate-200 text-slate-700'
                        }`}
                      >
                        ₡{(bill / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[11px] block">Su vuelto:</span>
                  <span className="font-mono font-bold text-base text-emerald-700">
                    ₡{vuelto.toLocaleString('es-CR')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Simulated 80mm Thermal Receipt Preview */}
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-dashed border-slate-300 font-mono text-[11px] space-y-1.5 text-slate-700">
            <div className="text-center border-b border-dashed border-slate-300 pb-2">
              <p className="font-bold text-[#0F172A]">SIMPIFY POS — TIQUETE 80MM</p>
              <p className="text-[10px] text-slate-400">
                Modalidad: {orderType} • Pago: {paymentMethod}
              </p>
            </div>
            <div className="flex justify-between pt-1">
              <span>Subtotal:</span>
              <span>₡{subtotal.toLocaleString('es-CR')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Descuento ({discountPct}%):</span>
                <span>-₡{discountAmount.toLocaleString('es-CR')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-1 border-t border-dashed border-slate-300">
              <span>TOTAL A COBRAR:</span>
              <span>₡{total.toLocaleString('es-CR')}</span>
            </div>
          </div>

          <button
            onClick={handleCompleteSale}
            className="w-full py-3.5 rounded-xl bg-[#10B981] hover:bg-emerald-500 text-[#0F172A] font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Confirmar Cobro ({paymentMethod}) e Imprimir 80mm</span>
          </button>

          {lastOrder && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                Orden <strong>{lastOrder.id}</strong> sincronizada con Simpify Simpe.
              </span>
              <span className="font-mono font-bold">
                ₡{lastOrder.amount.toLocaleString('es-CR')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}