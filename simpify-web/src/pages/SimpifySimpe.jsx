import React, { useState } from 'react';
import {
  Smartphone,
  Plus,
  Download,
  Users,
  Search,
  ShieldCheck,
  FileText,
  Filter,
  ArrowUpRight,
  Clock,
  Check,
  Copy,
  RefreshCw,
  Lock,
  Zap,
  SlidersHorizontal,
  Building2,
} from 'lucide-react';

const BANK_OPTIONS = ['Todos', 'BAC Credomatic', 'Banco Nacional', 'Banco de Costa Rica', 'Promerica'];

export default function SimpifySimpe({ transactions = [], onAddTransaction, onGoToInvoice }) {
  const [subView, setSubView] = useState('monitor'); // 'monitor' | 'crm' | 'reglas'
  const [selectedLine, setSelectedLine] = useState('+506 8888-9999 • Caja Principal');
  const [bankFilter, setBankFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [chartPeriod, setChartPeriod] = useState('diario');
  const [inspectedTxId, setInspectedTxId] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Enrich incoming transactions with realistic banking metadata if not present
  const enrichedTransactions = transactions.map((tx, idx) => {
    const banks = ['BAC Credomatic', 'Banco Nacional', 'Banco de Costa Rica', 'Promerica'];
    return {
      ...tx,
      bank: tx.bank || banks[idx % banks.length],
      authCode: tx.authCode || `9904${8100 + idx * 17}`,
      channel: tx.channel || (idx % 2 === 0 ? 'SMS Bancario + Webhook' : 'Notificación Push App'),
      latency: tx.latency || `${140 + (idx * 23) % 90} ms`,
      concept: tx.concept || (idx % 2 === 0 ? 'Pago pedido mostrador' : 'Cancelación factura'),
    };
  });

  const activeTx =
    enrichedTransactions.find((t) => t.id === inspectedTxId) || enrichedTransactions[0];

  const handleSimulatePayment = () => {
    const samplePool = [
      {
        name: 'Valeria Mora Castro',
        phone: '+506 8321-4509',
        initials: 'VM',
        amount: 18500,
        bank: 'BAC Credomatic',
        concept: 'Pedido Express #402',
      },
      {
        name: 'Andrés Solís Quirós',
        phone: '+506 7102-9988',
        initials: 'AS',
        amount: 12400,
        bank: 'Banco Nacional',
        concept: 'Compra tienda online',
      },
      {
        name: 'Inversiones del Valle S.A.',
        phone: '+506 6044-1122',
        initials: 'IV',
        amount: 42000,
        bank: 'Banco de Costa Rica',
        concept: 'Abono cuenta mensual',
      },
      {
        name: 'Colrarda Santo',
        phone: '+506 8888-8888',
        initials: 'CS',
        amount: 15000,
        bank: 'Promerica',
        concept: 'Servicio técnico',
      },
    ];
    const pick = samplePool[Math.floor(Math.random() * samplePool.length)];
    const newId = `SMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTx = {
      id: newId,
      name: pick.name,
      phone: pick.phone,
      initials: pick.initials,
      amount: pick.amount,
      bank: pick.bank,
      concept: pick.concept,
      authCode: `${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: 'Hace unos segundos',
      status: 'Verificado',
      latency: '145 ms',
    };
    if (onAddTransaction) onAddTransaction(newTx);
    setInspectedTxId(newId);
  };

  // Real CSV Export for Accounting
  const handleExportCSV = () => {
    const headers = ['Referencia,Cliente,Telefono,Banco,Monto_CRC,Estado,Fecha\n'];
    const rows = enrichedTransactions.map(
      (t) => `${t.id},"${t.name}",${t.phone},"${t.bank}",${t.amount},${t.status},"${t.date}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conciliacion_simpify_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleCopyRef = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1800);
  };

  // Filter logic
  const filteredTransactions = enrichedTransactions.filter((t) => {
    const matchesBank = bankFilter === 'Todos' || t.bank === bankFilter;
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.authCode.includes(searchTerm);
    return matchesBank && matchesSearch;
  });

  // Group customers automatically by phone number for RFM CRM
  const customerMap = enrichedTransactions.reduce((acc, tx) => {
    if (!acc[tx.phone]) {
      acc[tx.phone] = {
        name: tx.name,
        phone: tx.phone,
        initials: tx.initials,
        bank: tx.bank,
        count: 0,
        total: 0,
        lastSeen: tx.date,
      };
    }
    acc[tx.phone].count += 1;
    acc[tx.phone].total += tx.amount;
    return acc;
  }, {});

  const customerList = Object.values(customerMap).sort((a, b) => b.total - a.total);
  const totalVolume = enrichedTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* WORKSPACE TOP COMMAND BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgb(15,23,42,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 pr-3 border-r border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Simpify Simpe
            </span>
          </div>

          {/* Line Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <select
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#0F172A] font-mono focus:outline-none cursor-pointer"
            >
              <option value="+506 8888-9999 • Caja Principal">
                +506 8888-9999 • Caja Principal
              </option>
              <option value="+506 8700-4411 • Sucursal #2">
                +506 8700-4411 • Sucursal #2
              </option>
              <option value="+506 6120-3300 • Ventas WhatsApp">
                +506 6120-3300 • Ventas WhatsApp
              </option>
            </select>
          </div>

          {/* Internal Sub-Navigation Tabs */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl">
            {[
              { id: 'monitor', label: 'Libro Mayor en Vivo' },
              { id: 'crm', label: `Clientes RFM (${customerList.length})` },
              { id: 'reglas', label: 'Seguridad & Reglas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubView(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  subView === tab.id
                    ? 'bg-white text-[#0F172A] shadow-2xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0F172A] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={handleSimulatePayment}
            className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Simular Entrada SINPE</span>
          </button>
        </div>
      </div>

      {/* HIGH-PRECISION TELEMETRY STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl border border-slate-200/90 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Volumen Conciliado (Hoy)</span>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
              +14.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A] font-mono tabular-nums mt-1.5">
            ₡{totalVolume.toLocaleString('es-CR')}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            0 diferencias contra estados bancarios
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Transacciones Verificadas</span>
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-2xl font-bold text-[#0F172A] font-mono tabular-nums mt-1.5">
            {enrichedTransactions.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Tiempo medio de lectura: <span className="font-mono text-slate-600">160 ms</span>
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Tasa de Recompra (CRM)</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-[#0F172A] font-mono tabular-nums mt-1.5">
            {customerList.length} números
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Perfiles creados sin intervención manual
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Ticket Promedio SINPE</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-[#0F172A] font-mono tabular-nums mt-1.5">
            ₡
            {enrichedTransactions.length
              ? Math.round(totalVolume / enrichedTransactions.length).toLocaleString('es-CR')
              : 0}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Hora pico: <span className="font-mono text-slate-600">12:00 md – 02:30 pm</span>
          </p>
        </div>
      </div>

      {/* VIEW 1: MONITOR TRANSACCIONAL + INSPECTOR LATERAL */}
      {subView === 'monitor' && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Columns: Chart + Dense Transaction Table */}
          <div className="lg:col-span-8 space-y-6">
            {/* Precision Financial Chart */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Flujo de Liquidez SINPE Móvil ({chartPeriod === 'diario' ? 'Últimos 7 días' : 'Histórico Semestral'})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Comparativa de ingresos reales confirmados vs período anterior
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start">
                  <button
                    onClick={() => setChartPeriod('diario')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                      chartPeriod === 'diario' ? 'bg-white text-[#0F172A] shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Diario
                  </button>
                  <button
                    onClick={() => setChartPeriod('mensual')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                      chartPeriod === 'mensual' ? 'bg-white text-[#0F172A] shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Mensual
                  </button>
                </div>
              </div>

              {/* Custom SVG Area + Bar Hybrid Chart */}
              <div className="pt-6">
                <div className="grid grid-cols-7 gap-3 items-end h-40 px-2">
                  {(chartPeriod === 'diario'
                    ? [
                        { label: 'Lun 11', val: 48, amount: '₡165,000', tx: '14 pagos' },
                        { label: 'Mar 12', val: 64, amount: '₡228,500', tx: '19 pagos' },
                        { label: 'Mié 13', val: 58, amount: '₡194,000', tx: '16 pagos' },
                        { label: 'Jue 14', val: 76, amount: '₡285,000', tx: '24 pagos' },
                        { label: 'Vie 15', val: 92, amount: '₡342,000', tx: '31 pagos' },
                        { label: 'Sáb 16', val: 85, amount: '₡310,000', tx: '28 pagos' },
                        {
                          label: 'Hoy 17',
                          val: 100,
                          amount: `₡${totalVolume.toLocaleString('es-CR')}`,
                          tx: `${enrichedTransactions.length} pagos`,
                        },
                      ]
                    : [
                        { label: 'Jun', val: 52, amount: '₡2.45M', tx: '310 pagos' },
                        { label: 'Jul', val: 61, amount: '₡2.89M', tx: '355 pagos' },
                        { label: 'Ago', val: 70, amount: '₡3.20M', tx: '402 pagos' },
                        { label: 'Sep', val: 78, amount: '₡3.68M', tx: '450 pagos' },
                        { label: 'Oct', val: 88, amount: '₡4.15M', tx: '512 pagos' },
                        { label: 'Nov (Act)', val: 100, amount: '₡4.72M', tx: '589 pagos' },
                        { label: 'Proy.', val: 94, amount: '₡5.10M', tx: 'Estimado' },
                      ]
                  ).map((col, idx) => {
                    const isToday = idx === 6 && chartPeriod === 'diario';
                    return (
                      <div key={idx} className="flex flex-col items-center h-full justify-end group">
                        <span className="text-[10px] font-mono font-semibold text-slate-500 mb-1.5">
                          {col.amount}
                        </span>
                        <div className="w-full bg-slate-100 rounded-lg h-28 flex items-end p-0.5 overflow-hidden">
                          <div
                            style={{ height: `${col.val}%` }}
                            className={`w-full rounded-md transition-all ${
                              isToday
                                ? 'bg-[#10B981]'
                                : 'bg-[#0F172A] group-hover:bg-slate-700'
                            }`}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-[#0F172A] mt-2">
                          {col.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{col.tx}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bank Filters + Ledger Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {BANK_OPTIONS.map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setBankFilter(bank)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        bankFilter === bank
                          ? 'bg-[#0F172A] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar cliente, teléfono o ref..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-full sm:w-56 focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
              </div>

              {/* Real SaaS Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-4">Cliente / Emisor</th>
                      <th className="py-3 px-4">Banco Origen</th>
                      <th className="py-3 px-4">Comprobante</th>
                      <th className="py-3 px-4 text-right">Monto</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredTransactions.map((tx) => {
                      const isSelected = activeTx?.id === tx.id;
                      return (
                        <tr
                          key={tx.id}
                          onClick={() => setInspectedTxId(tx.id)}
                          className={`transition-colors cursor-pointer ${
                            isSelected ? 'bg-emerald-50/50' : 'hover:bg-slate-50/90'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-8 h-8 rounded-lg font-mono font-bold text-[11px] flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-[#10B981] text-[#0F172A]'
                                    : 'bg-slate-100 text-[#0F172A]'
                                }`}
                              >
                                {tx.initials}
                              </span>
                              <div>
                                <p className="font-bold text-[#0F172A]">{tx.name}</p>
                                <p className="text-[11px] text-slate-500 font-mono">{tx.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-slate-700 block">{tx.bank}</span>
                            <span className="text-[10px] text-slate-400">{tx.date}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              #{tx.authCode}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-sm text-[#0F172A] tabular-nums">
                            ₡{tx.amount.toLocaleString('es-CR')}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onGoToInvoice) onGoToInvoice(tx);
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#0F172A] text-[#0F172A] font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <FileText className="w-3 h-3 text-emerald-600" />
                              <span>Facturar</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Live Transaction & Anti-Fraud Inspector */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 sticky top-28 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-semibold block">
                  Inspector de Comprobante
                </span>
                <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
                  {activeTx?.id}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Auténtico
              </span>
            </div>

            {/* Amount Box */}
            <div className="bg-[#0F172A] text-white p-5 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-400">Monto Acreditado en Cuenta</span>
              <p className="text-3xl font-bold font-mono tabular-nums text-[#10B981]">
                ₡{activeTx?.amount?.toLocaleString('es-CR')}.00
              </p>
              <p className="text-[11px] text-slate-300 pt-1">
                Receptor: <span className="font-mono">{selectedLine.split('•')[0]}</span>
              </p>
            </div>

            {/* Metadata Key-Value List */}
            <div className="space-y-2.5 text-xs border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Titular Emisor:</span>
                <span className="font-semibold text-[#0F172A]">{activeTx?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Teléfono Origen:</span>
                <span className="font-mono font-semibold text-[#0F172A]">{activeTx?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Entidad Bancaria:</span>
                <span className="font-semibold text-[#0F172A]">{activeTx?.bank}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Comprobante Bancario:</span>
                <button
                  onClick={() => handleCopyRef(activeTx?.authCode)}
                  className="font-mono font-semibold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded inline-flex items-center gap-1 cursor-pointer hover:bg-slate-200"
                >
                  <span>#{activeTx?.authCode}</span>
                  {copiedId ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Detalle / Motivo:</span>
                <span className="text-slate-700 font-medium">{activeTx?.concept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Latencia de Captura:</span>
                <span className="font-mono text-emerald-700 font-semibold">{activeTx?.latency}</span>
              </div>
            </div>

            {/* Raw Bank Notification Payload */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Mensaje Bancario Original Conciliado:
              </span>
              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed">
                [SINPE MÓVIL {activeTx?.bank?.toUpperCase()}] Se ha acreditado{' '}
                <span className="text-[#10B981]">
                  CRC {activeTx?.amount?.toLocaleString('es-CR')}.00
                </span>{' '}
                de {activeTx?.name} ({activeTx?.phone}). Ref: {activeTx?.authCode}.
              </div>
            </div>

            {onGoToInvoice && (
              <button
                onClick={() => onGoToInvoice(activeTx)}
                className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#10B981]" />
                <span>Emitir Factura Electrónica de este Pago</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: DIRECTORIO RFM DE CLIENTES */}
      {subView === 'crm' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden">
          <div className="p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Directorio Automático de Clientes (Segmentación RFM por Teléfono)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simpify agrupa cada pago según el número telefónico del comprador sin que tengas que pedirle sus datos.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-6">Posición / Cliente</th>
                  <th className="py-3.5 px-6">Teléfono Asociado</th>
                  <th className="py-3.5 px-6">Banco Frecuente</th>
                  <th className="py-3.5 px-6">Frecuencia</th>
                  <th className="py-3.5 px-6 text-right">Valor Total (LTV)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {customerList.map((cust, i) => (
                  <tr key={cust.phone} className="hover:bg-slate-50/80">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-[#10B981] font-mono font-bold flex items-center justify-center text-[11px]">
                          #{i + 1}
                        </span>
                        <div>
                          <p className="font-bold text-[#0F172A]">{cust.name}</p>
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            {cust.count > 1 ? '★ Cliente Recurrente VIP' : 'Cliente Verificado'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold text-slate-700">
                      {cust.phone}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{cust.bank}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#0F172A] font-mono font-semibold text-[11px]">
                        {cust.count} {cust.count === 1 ? 'transacción' : 'transacciones'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-sm text-[#0F172A] tabular-nums">
                      ₡{cust.total.toLocaleString('es-CR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: REGLAS Y ANTIFRAUDE */}
      {subView === 'reglas' && (
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Bloqueo de Capturas Falsas',
              status: 'Activo',
              desc: 'Simpify únicamente registra transacciones cuando recibe la confirmación directa de la entidad bancaria (SMS/Notificación firmada), ignorando imágenes editadas por WhatsApp.',
            },
            {
              title: 'Alerta de Comprobante Duplicado',
              status: 'Activo',
              desc: 'Si un cliente intenta presentar el mismo número de referencia bancaria dos veces en distintas cajas o turnos, el sistema bloquea la segunda orden de inmediato.',
            },
            {
              title: 'Modo Cajero Ciego (Solo Consulta)',
              status: 'Activo',
              desc: 'Tus empleados en mostrador pueden verificar si un pago SINPE de ₡15,000 ya ingresó, sin ver el saldo total de tu cuenta bancaria ni tus movimientos privados.',
            },
          ].map((rule, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#10B981] flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                    ● {rule.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">{rule.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Política de seguridad v2.4 aplicada
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}