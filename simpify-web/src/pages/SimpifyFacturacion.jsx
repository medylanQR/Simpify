import React, { useState, useEffect } from 'react';
import {
  FileText,
  Send,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  FileCode,
  Download,
  Building2,
  Smartphone,
} from 'lucide-react';

export default function SimpifyFacturacion({ transactions = [], selectedTx }) {
  const [activeTx, setActiveTx] = useState(
    selectedTx ||
      transactions[0] || {
        id: 'SMP-849201',
        name: 'Colrarda Santo',
        phone: '+506 8888-8888',
        amount: 15000,
      }
  );

  const [docType, setDocType] = useState('01'); // 01 Factura, 04 Tiquete, 03 Nota Credito
  const [condicionVenta, setCondicionVenta] = useState('01 Contado');
  const [tipoCedula, setTipoCedula] = useState('Cédula Física');
  const [cedula, setCedula] = useState('1-1452-0892');
  const [correo, setCorreo] = useState('facturacion@cliente.cr');
  const [ivaRate, setIvaRate] = useState(13);
  const [cabys, setCabys] = useState('8314100000000 — Servicios comerciales / Orden SINPE');
  const [consecutivo, setConsecutivo] = useState('00100001010000001492');

  const [emittedHistory, setEmittedHistory] = useState([
    {
      consecutivo: '00100001010000001491',
      clave: '5061711260031018492010010000101000000149119482716',
      cliente: 'Jusan Smitiz',
      monto: 15000,
      tipo: 'Factura Electrónica',
      fecha: 'Hoy, 10:16 AM',
      estado: 'Aceptado por Hacienda',
    },
  ]);

  useEffect(() => {
    if (selectedTx) {
      setActiveTx(selectedTx);
    }
  }, [selectedTx]);

  // Tax calculations based on total SINPE received
  const totalAmount = activeTx?.amount || 15000;
  const subtotal =
    ivaRate === 0 ? totalAmount : Math.round(totalAmount / (1 + ivaRate / 100));
  const impuesto = totalAmount - subtotal;

  const docTypeLabel =
    docType === '01'
      ? 'Factura Electrónica'
      : docType === '04'
      ? 'Tiquete Electrónico'
      : 'Nota de Crédito Electrónica';

  const claveNumericaPreview = `506171126003101849201${consecutivo}19482716`;

  const handleEmit = (e) => {
    e.preventDefault();
    const nextNum = parseInt(consecutivo.slice(-4), 10) + 1;
    const nextConsecutivo = `0010000101000000${nextNum}`;
    const newDoc = {
      consecutivo,
      clave: claveNumericaPreview,
      cliente: activeTx.name,
      monto: totalAmount,
      tipo: docTypeLabel,
      fecha: 'Hace un instante',
      estado: 'Aceptado por Hacienda',
    };
    setEmittedHistory([newDoc, ...emittedHistory]);
    setConsecutivo(nextConsecutivo);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* TOP BAR HACIENDA STATUS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Simpify Facturación
            </span>
          </div>
          <span className="text-xs font-medium text-slate-600">
            Anexo y Estructuras <strong className="text-[#0F172A]">Ministerio de Hacienda v4.4</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[#0F172A] font-mono text-[11px] font-semibold">
            Certificado Criptográfico: Activo (.p12)
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-500">
            Medio de pago predefinido: <strong className="text-[#0F172A] font-mono">06 - SINPE Móvil</strong>
          </span>
        </div>
      </div>

      {/* MAIN WORKSTATION SPLIT */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: SINPE SELECTOR + FORM */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Queue of Incoming SINPE Payments */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Seleccioná la transacción SINPE a facturar
              </h3>
              <span className="text-[11px] text-emerald-700 font-semibold">
                Sincronizado con Simpify Simpe
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {transactions.slice(0, 4).map((tx) => {
                const isSelected = activeTx?.id === tx.id;
                return (
                  <button
                    key={tx.id}
                    type="button"
                    onClick={() => setActiveTx(tx)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-slate-50/70 text-[#0F172A] border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className="text-xs font-bold truncate">{tx.name}</p>
                      <p
                        className={`text-[11px] font-mono mt-0.5 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {tx.phone}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={`text-xs font-mono font-bold tabular-nums ${
                          isSelected ? 'text-[#10B981]' : 'text-[#0F172A]'
                        }`}
                      >
                        ₡{tx.amount.toLocaleString('es-CR')}
                      </p>
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-slate-400' : 'text-slate-400'
                        }`}
                      >
                        {tx.id}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Electronic Document Builder */}
          <form
            onSubmit={handleEmit}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#0F172A]">
                2. Parámetros del Comprobante Electrónico
              </h3>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { code: '01', label: 'Factura (01)' },
                  { code: '04', label: 'Tiquete (04)' },
                  { code: '03', label: 'Nota Crédito (03)' },
                ].map((t) => (
                  <button
                    key={t.code}
                    type="button"
                    onClick={() => setDocType(t.code)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      docType === t.code
                        ? 'bg-[#0F172A] text-white'
                        : 'text-slate-600 hover:text-[#0F172A]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Tipo de Identificación
                </label>
                <select
                  value={tipoCedula}
                  onChange={(e) => setTipoCedula(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0F172A] bg-white focus:outline-none focus:border-[#0F172A]"
                >
                  <option>Cédula Física</option>
                  <option>Cédula Jurídica</option>
                  <option>DIMEX / NITE</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Condición de Venta
                </label>
                <select
                  value={condicionVenta}
                  onChange={(e) => setCondicionVenta(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0F172A] bg-white focus:outline-none focus:border-[#0F172A]"
                >
                  <option>01 Contado</option>
                  <option>02 Crédito (15 días)</option>
                  <option>04 Apartado</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Razón Social / Receptor (Tomado de SINPE)
                </label>
                <input
                  type="text"
                  value={activeTx?.name || ''}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Correo para envío de XML y PDF
                </label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>
            </div>

            {/* CABYS + IVA Rate Selector */}
            <div className="grid sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Código CABYS (Catálogo de Bienes y Servicios)
                </label>
                <select
                  value={cabys}
                  onChange={(e) => setCabys(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-[#0F172A] bg-white focus:outline-none focus:border-[#0F172A]"
                >
                  <option value="8314100000000 — Servicios comerciales / Orden SINPE">
                    8314100000000 — Servicios comerciales / Orden SINPE
                  </option>
                  <option value="6331000000000 — Servicio de alimentos y bebidas">
                    6331000000000 — Servicio de alimentos y bebidas
                  </option>
                  <option value="9721000990000 — Servicios de barbería y estética">
                    9721000990000 — Servicios de barbería y estética
                  </option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Tarifa IVA
                </label>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
                  {[13, 4, 2, 0].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setIvaRate(rate)}
                      className={`py-1 rounded-lg text-xs font-mono font-bold cursor-pointer ${
                        ivaRate === rate
                          ? 'bg-[#0F172A] text-[#10B981]'
                          : 'text-slate-600 hover:text-[#0F172A]'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4 text-[#10B981]" />
              <span>Firmar XML y Emitir {docTypeLabel} ante Hacienda</span>
            </button>
          </form>

          {/* Ledger of Emitted Documents */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bitácora de Comprobantes Firmados (Respuesta ATV Hacienda)
            </h4>
            <div className="space-y-2">
              {emittedHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">{item.cliente}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                        #{item.consecutivo}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate max-w-md">
                      Clave: {item.clave}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono font-bold text-[#0F172A]">
                      ₡{item.monto.toLocaleString('es-CR')}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ {item.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: LIVE ELECTRONIC INVOICE GRAPHICAL PREVIEW */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0_12px_40px_rgb(15,23,42,0.06)] sticky top-28 space-y-5">
          {/* Top Document Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold block">
                Vista Previa en Vivo (PDF / XML)
              </span>
              <h3 className="text-base font-bold text-[#0F172A] mt-0.5">{docTypeLabel}</h3>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                No. {consecutivo}
              </p>
            </div>

            {/* Simulated Hacienda Verification QR */}
            <div className="w-12 h-12 rounded-lg border border-slate-200 p-1 flex flex-wrap gap-0.5 items-center justify-center bg-slate-50">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 ${
                    i % 3 === 0 ? 'bg-[#0F172A]' : i % 2 === 0 ? 'bg-[#10B981]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 50-Digit Key Box */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">
              Clave Numérica (50 dígitos)
            </span>
            <p className="text-[11px] font-mono text-[#0F172A] break-all mt-0.5">
              {claveNumericaPreview}
            </p>
          </div>

          {/* Receiver Details */}
          <div className="space-y-1.5 text-xs border-b border-slate-100 pb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Receptor:</span>
              <span className="font-bold text-[#0F172A]">{activeTx?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{tipoCedula}:</span>
              <span className="font-mono text-slate-700">{cedula}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Teléfono SINPE:</span>
              <span className="font-mono text-slate-700">{activeTx?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Medio de Pago:</span>
              <span className="font-semibold text-emerald-700">
                06 - SINPE Móvil ({activeTx?.id})
              </span>
            </div>
          </div>

          {/* Line Item Preview */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 uppercase">
              <span>Detalle (CABYS {cabys.slice(0, 13)})</span>
              <span>Monto</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-[#0F172A]">
                  Orden conciliada vía Simpify ({activeTx?.id})
                </p>
                <p className="text-[10px] text-slate-400 font-mono">Cant: 1.00 Unid • IVA {ivaRate}%</p>
              </div>
              <span className="font-mono font-bold text-[#0F172A]">
                ₡{subtotal.toLocaleString('es-CR')}
              </span>
            </div>
          </div>

          {/* Tax & Total Summary */}
          <div className="bg-[#0F172A] text-white p-4 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal Neto:</span>
              <span className="font-mono">₡{subtotal.toLocaleString('es-CR')}.00</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Impuesto al Valor Agregado ({ivaRate}%):</span>
              <span className="font-mono">₡{impuesto.toLocaleString('es-CR')}.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800">
              <span>Total Comprobante:</span>
              <span className="font-mono text-[#10B981] text-base">
                ₡{totalAmount.toLocaleString('es-CR')}.00
              </span>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400 leading-relaxed">
            Autorizado mediante resolución N° DGT-R-033-2019 de la Dirección General de Tributación.
          </p>
        </div>
      </div>
    </div>
  );
}