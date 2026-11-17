import React, { useState } from 'react';
import {
  Check,
  Sliders,
  ArrowUpRight,
  Building2,
  Smartphone,
  FileText,
  ShoppingBag,
  Clock,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

export default function PricingROI() {
  const [selectedModules, setSelectedModules] = useState(['simpe']);
  const [businessScale, setBusinessScale] = useState('emprendimiento');
  const [dailyTx, setDailyTx] = useState(30);
  const [contactData, setContactData] = useState({
    nombre: '',
    comercio: '',
    telefono: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleModule = (id) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter((m) => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const selectFullSuite = () => {
    setSelectedModules(['simpe', 'facturacion', 'pos']);
  };

  const monthlyHoursSaved = Math.round((dailyTx * 1.5 * 30) / 60);

  const modulesInfo = [
    {
      id: 'simpe',
      name: 'Simpify Simpe',
      subtitle: 'Centralización de pagos y CRM',
      icon: Smartphone,
      desc: 'Vinculá únicamente tu número receptor y organizá todas tus transferencias entrantes por cliente, día y mes.',
      deliverables: [
        'Registro de línea receptora SINPE Móvil',
        'Panel de métricas diarias y mensuales en vivo',
        'Directorio automático de clientes por teléfono',
        'Exportación contable limpia en Excel y CSV',
      ],
    },
    {
      id: 'facturacion',
      name: 'Simpify Facturación',
      subtitle: 'Ministerio de Hacienda v4.4',
      icon: FileText,
      desc: 'Emití Factura o Tiquete Electrónico oficial en un clic tomando los datos directamente desde el pago recibido.',
      deliverables: [
        'Emisión de Facturas y Tiquetes Electrónicos',
        'Catálogo CABYS e IVA 13% preconfigurado',
        'Recepción de facturas de proveedores',
        'Envío automático de XML y PDF al cliente',
      ],
    },
    {
      id: 'pos',
      name: 'Simpify POS',
      subtitle: 'Punto de Venta e Inventario',
      icon: ShoppingBag,
      desc: 'Control de mostrador, inventario y confirmación de pagos SINPE para cajeros sin exponer cuentas bancarias.',
      deliverables: [
        'Terminal de caja rápida para mostrador',
        'Vista segura de verificación SINPE para cajeros',
        'Impresión de tiquetes térmicos (80mm / 58mm)',
        'Cierre de caja unificado (SINPE, Tarjeta y Efectivo)',
      ],
    },
  ];

  const scales = [
    {
      id: 'emprendimiento',
      label: 'Emprendimiento / Independiente',
      detail: '1 número receptor • 1 usuario',
    },
    {
      id: 'pyme',
      label: 'Comercio / PYME en crecimiento',
      detail: '1 a 2 cajas • Equipo de ventas',
    },
    {
      id: 'multisede',
      label: 'Múltiples Sucursales / Corporativo',
      detail: 'Varios números • Integración a medida',
    },
  ];

  const handleRequestQuote = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header Editorial */}
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">
          Planes a la medida de tu operación
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
          Implementá únicamente los módulos que tu negocio necesita
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Cada comercio tiene un volumen de transacciones y estructura distinta. Configurá los productos de tu interés para recibir una propuesta adaptada a tu flujo de trabajo.
        </p>
      </div>

      {/* Main Configurator Grid */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left: Module Selection & Scale */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Select Modules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#0F172A]">
                1. Seleccioná los productos a integrar
              </h2>
              <button
                type="button"
                onClick={selectFullSuite}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Seleccionar Suite Completa (3 módulos)
              </button>
            </div>

            <div className="space-y-3.5">
              {modulesInfo.map((mod) => {
                const Icon = mod.icon;
                const isSelected = selectedModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#0F172A] shadow-[0_8px_30px_rgb(15,23,42,0.06)]'
                        : 'bg-white/60 border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-[#0F172A] text-[#10B981]'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-base font-bold text-[#0F172A]">{mod.name}</h3>
                            <span className="text-xs text-slate-400 font-medium">
                              — {mod.subtitle}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                            {mod.desc}
                          </p>

                          {isSelected && (
                            <div className="grid sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                              {mod.deliverables.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-xs text-slate-600"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-1 ${
                          isSelected
                            ? 'bg-[#10B981] border-[#10B981] text-[#0F172A]'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Business Size */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#0F172A]">
              2. Tamaño de tu operación
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {scales.map((s) => {
                const active = businessScale === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setBusinessScale(s.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-white text-[#0F172A] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-semibold leading-snug">{s.label}</p>
                    <p
                      className={`text-[11px] mt-1.5 ${
                        active ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {s.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Custom Proposal Summary & Direct Request */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-7 shadow-[0_8px_30px_rgb(15,23,42,0.05)] sticky top-28 space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              Resumen de Configuración
            </span>
            <h3 className="text-xl font-bold text-[#0F172A] mt-1">
              Solicitar propuesta y demo guiada
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nuestro equipo configurará un entorno de prueba adaptado a tu negocio sin compromiso.
            </p>
          </div>

          {/* Selected tags */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-500 block">
              Módulos seleccionados ({selectedModules.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedModules.map((id) => {
                const m = modulesInfo.find((x) => x.id === id);
                return (
                  <span
                    key={id}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-[#0F172A] text-xs font-semibold"
                  >
                    {m?.name}
                  </span>
                );
              })}
            </div>
          </div>

          {submitted ? (
            <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-[#10B981] mx-auto" />
              <h4 className="text-sm font-bold text-[#0F172A]">
                Solicitud lista para atención
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hemos registrado los módulos seleccionados para <strong>{contactData.comercio || 'tu negocio'}</strong>. Te contactaremos al <strong>{contactData.telefono}</strong> con los detalles de activación.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-emerald-700 underline pt-2 cursor-pointer"
              >
                Editar configuración
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequestQuote} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">
                  Tu nombre
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Andrés Morales"
                  value={contactData.nombre}
                  onChange={(e) => setContactData({ ...contactData, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">
                  Nombre del comercio o empresa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cafetería Central"
                  value={contactData.comercio}
                  onChange={(e) => setContactData({ ...contactData, comercio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">
                  WhatsApp o teléfono de contacto
                </label>
                <input
                  type="text"
                  required
                  placeholder="+506 8888-8888"
                  value={contactData.telefono}
                  onChange={(e) => setContactData({ ...contactData, telefono: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Solicitar cotización personalizada</span>
                <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Clean Operational Impact Estimator (No Prices, Pure Time Value) */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200/90 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Clock className="w-4 h-4 text-[#10B981]" />
            <span>Impacto operativo en el cierre de caja</span>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A]">
            ¿Cuánto tiempo administrativo recupera tu equipo al mes?
          </h3>
          <p className="text-sm text-slate-600">
            Indicá el promedio de transferencias por SINPE Móvil que reciben por jornada:
          </p>
          <div className="pt-2 max-w-md">
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-slate-500">Volumen diario estimado</span>
              <span className="font-mono text-[#0F172A]">{dailyTx} transacciones / día</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              value={dailyTx}
              onChange={(e) => setDailyTx(Number(e.target.value))}
              className="w-full accent-[#0F172A] cursor-pointer"
            />
          </div>
        </div>

        <div className="md:col-span-5 bg-[#F8FAFC] p-6 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 block">
              Ahorro estimado en conciliación manual
            </span>
            <p className="text-3xl font-bold text-[#0F172A] font-mono mt-1">
              {monthlyHoursSaved} horas / mes
            </p>
            <span className="text-xs text-emerald-700 font-medium mt-1 block">
              Cierres diarios automatizados sin hojas de cálculo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}