import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const SimpifyLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M26 6C15.5 6 10 12.5 10 21C10 24.5 11.2 27.2 13.5 29L22.5 24.5C23.5 24 24 23 24 21.5V18.5C24 17.2 25 16.2 26.5 16H36C37.5 13 38 9.5 38 6H26Z"
      fill="#10B981"
    />
    <path
      d="M22 42C32.5 42 38 35.5 38 27C38 23.5 36.8 20.8 34.5 19L25.5 23.5C24.5 24 24 25 24 26.5V29.5C24 30.8 23 31.8 21.5 32H12C10.5 35 10 38.5 10 42H22Z"
      fill="#0F172A"
    />
  </svg>
);

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'simpe', label: 'Simpify Simpe' },
    { id: 'facturacion', label: 'Facturación' },
    { id: 'pos', label: 'Punto de Venta' },
    { id: 'precios', label: 'Planes a Medida' },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleSelect('home')}
          className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
        >
          <SimpifyLogo size={34} />
          <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Simpify
          </span>
        </button>

        {/* Clean Minimalist Center Links (Like Reference Image) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`text-sm transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'font-semibold text-[#0F172A]'
                    : 'font-medium text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Subtle Outlined CTA Button (Matching Reference Top-Right "Comenzar") */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleSelect('precios')}
            className="px-5 py-2 rounded-xl border border-slate-300 bg-white hover:border-[#0F172A] text-[#0F172A] font-semibold text-sm transition-all cursor-pointer"
          >
            Comenzar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm ${
                  isActive
                    ? 'bg-slate-100 font-semibold text-[#0F172A]'
                    : 'font-medium text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}