import React, { useState } from 'react';
import {
  Smartphone,
  FileText,
  ShoppingBag,
  ArrowRight,
  Check,
  Bell,
} from 'lucide-react';
import { SimpifyLogo } from '../components/Navbar';

export default function EcosystemHome({ setActiveTab, transactions = [] }) {
  const [previewMode, setPreviewMode] = useState('simpe');

  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Clean Editorial Typography */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#0F172A] leading-[1.1]">
              Tus pagos por Simpe, por fin bajo control
            </h1>

            <p className="text-lg text-slate-600 font-normal leading-relaxed">
              La plataforma financiera que automatiza, rastrea y concilia tus transacciones móviles en tiempo real.
            </p>

            {/* Primary CTA Buttons matching reference image */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setActiveTab('simpe')}
                className="px-7 py-3.5 rounded-full bg-[#10B981] hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
              >
                Comenzar ahora
              </button>

              <button
                onClick={() => setActiveTab('precios')}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 font-medium text-sm transition-all cursor-pointer"
              >
                Ver demo
              </button>
            </div>

            {/* Minimalist Product Switcher */}
            <div className="pt-6 border-t border-slate-200/70">
              <p className="text-xs font-medium text-slate-400 mb-3">
                Ecosistema modular para comercios en Costa Rica:
              </p>
              <div className="flex flex-wrap gap-6 text-xs font-semibold text-[#0F172A]">
                <button
                  onClick={() => setActiveTab('simpe')}
                  className="hover:text-[#10B981] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Simpify Simpe
                </button>
                <button
                  onClick={() => setActiveTab('facturacion')}
                  className="hover:text-[#10B981] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
                  Simpify Facturación
                </button>
                <button
                  onClick={() => setActiveTab('pos')}
                  className="hover:text-[#10B981] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Simpify POS
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Window with Emerald Blur & Navy Backdrop */}
          <div className="lg:col-span-7 relative">
            {/* Soft Emerald Glow */}
            <div className="absolute -left-8 -top-8 w-72 h-72 bg-[#10B981]/30 rounded-full blur-3xl pointer-events-none" />
            {/* Deep Navy Shape behind right side */}
            <div className="hidden sm:block absolute -right-6 -bottom-8 w-88 h-88 bg-[#0F172A] rounded-[56px] rotate-12 pointer-events-none" />

            {/* Dashboard Window */}
            <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-[0_20px_60px_rgb(15,23,42,0.12)] overflow-hidden">
              {/* Top Window Controls */}
              <div className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                  {[
                    { id: 'simpe', label: 'Simpe' },
                    { id: 'facturacion', label: 'Facturación' },
                    { id: 'pos', label: 'POS' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPreviewMode(tab.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                        previewMode === tab.id
                          ? 'bg-white text-[#0F172A] shadow-2xs'
                          : 'text-slate-500 hover:text-[#0F172A]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-12 min-h-[410px]">
                {/* Left Sidebar (#0F172A) */}
                <div className="col-span-2 sm:col-span-1 bg-[#0F172A] py-5 flex flex-col items-center justify-between text-slate-400">
                  <div className="space-y-5 flex flex-col items-center">
                    <SimpifyLogo size={24} />
                    <button
                      onClick={() => setPreviewMode('simpe')}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        previewMode === 'simpe' ? 'bg-white/10 text-[#10B981]' : 'hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('facturacion')}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        previewMode === 'facturacion' ? 'bg-white/10 text-[#10B981]' : 'hover:text-white'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('pos')}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        previewMode === 'pos' ? 'bg-white/10 text-[#10B981]' : 'hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center">
                    QR
                  </div>
                </div>

                {/* Dashboard Inner Content */}
                <div className="col-span-10 sm:col-span-11 p-5 bg-[#F8FAFC]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      {previewMode === 'simpe' && 'Dashboard'}
                      {previewMode === 'facturacion' && 'Dashboard — Facturación Electrónica'}
                      {previewMode === 'pos' && 'Dashboard — Punto de Venta'}
                    </h3>
                    <Bell className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="grid sm:grid-cols-12 gap-4">
                    {/* Left Column inside Mockup */}
                    <div className="sm:col-span-7 space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#0F172A]">
                            Ventas Diarias y Mensuales
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            Mensuales ▾
                          </span>
                        </div>
                        <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">
                          <defs>
                            <linearGradient id="emeraldGradClean" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 10 95 Q 50 45, 90 68 T 175 40 T 255 52 T 310 18 L 310 100 L 10 100 Z"
                            fill="url(#emeraldGradClean)"
                          />
                          <path
                            d="M 10 95 Q 50 45, 90 68 T 175 40 T 255 52 T 310 18"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 10 98 Q 60 75, 110 80 T 195 32 T 265 65 T 310 42"
                            fill="none"
                            stroke="#0F172A"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#0F172A]">
                            Transacciones Simpe
                          </span>
                          <span className="text-[10px] text-slate-400">Más ▾</span>
                        </div>
                        <div className="space-y-2.5">
                          {transactions.slice(0, 3).map((tx) => (
                            <div
                              key={tx.id}
                              className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-none"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-semibold flex items-center justify-center text-[10px]">
                                  {tx.initials}
                                </span>
                                <div>
                                  <p className="font-semibold text-[#0F172A] leading-none">
                                    {tx.name}
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    {tx.phone}
                                  </p>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                                {tx.status}
                              </span>
                              <span className="font-semibold font-mono text-[#0F172A]">
                                ₡{tx.amount.toLocaleString('es-CR')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column inside Mockup */}
                    <div className="sm:col-span-5 space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#0F172A]">
                            Contactos recientes
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                            Directorio
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          {transactions.slice(0, 4).map((c) => (
                            <div key={c.id} className="flex items-center justify-between text-[11px]">
                              <div className="truncate pr-2">
                                <p className="font-semibold text-[#0F172A] truncate">{c.name}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{c.phone}</p>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium text-[10px]">
                                Activo
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200/70">
                        <span className="text-xs font-medium text-slate-400 block">
                          Balance Total
                        </span>
                        <p className="text-2xl font-bold font-mono text-[#0F172A] mt-1">
                          ₡{totalBalance.toLocaleString('es-CR')}.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS OVERVIEW SECTION */}
      <section className="bg-white border-t border-slate-200/70 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">
              Nuestros Productos
            </p>
            <h2 className="text-3xl font-bold text-[#0F172A]">
              Tres soluciones diseñadas para operar juntas o por separado
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                id: 'simpe',
                title: 'Simpify Simpe',
                subtitle: 'Control y Conciliación de SINPE Móvil',
                desc: 'Registrá un único número telefónico receptor y centralizá cada transferencia entrante organizada por cliente, día y mes.',
                items: [
                  'Vinculación de un único número receptor',
                  'Historial automático por teléfono del cliente',
                  'Métricas diarias, mensuales y cierres en Excel',
                ],
                icon: Smartphone,
              },
              {
                id: 'facturacion',
                title: 'Simpify Facturación',
                subtitle: 'Facturación Electrónica en 1 Clic',
                desc: 'Transformá cualquier pago recibido por SINPE en una Factura o Tiquete Electrónico oficial ante Hacienda sin digitar dos veces.',
                items: [
                  'Cumplimiento Ministerio de Hacienda v4.4',
                  'Catálogo CABYS e impuestos automatizados',
                  'Envío directo de comprobantes al cliente',
                ],
                icon: FileText,
              },
              {
                id: 'pos',
                title: 'Simpify POS',
                subtitle: 'Punto de Venta y Cajas',
                desc: 'Agilizá el cobro en mostrador permitiendo a tus cajeros verificar pagos entrantes sin darles acceso a tus cuentas bancarias.',
                items: [
                  'Terminal de venta ágil por categorías',
                  'Impresión de tiquetes térmicos en mostrador',
                  'Arqueo de caja unificado (SINPE, tarjeta y efectivo)',
                ],
                icon: ShoppingBag,
              },
            ].map((prod) => {
              const Icon = prod.icon;
              return (
                <div
                  key={prod.id}
                  className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-[#10B981] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A]">{prod.title}</h3>
                    <p className="text-xs font-medium text-emerald-700 mt-1">{prod.subtitle}</p>
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed">{prod.desc}</p>

                    <ul className="space-y-2.5 mt-6 pt-6 border-t border-slate-200/70 text-xs text-slate-600">
                      {prod.items.map((it, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveTab(prod.id)}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#0F172A] hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    <span>Explorar {prod.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}