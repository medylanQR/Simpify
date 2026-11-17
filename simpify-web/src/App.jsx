import React, { useState } from 'react';
import Navbar, { SimpifyLogo } from './components/Navbar';
import EcosystemHome from './pages/EcosystemHome';
import SimpifySimpe from './pages/SimpifySimpe';
import SimpifyFacturacion from './pages/SimpifyFacturacion';
import SimpifyPOS from './pages/SimpifyPOS';
import PricingROI from './pages/PricingROI';

const INITIAL_TRANSACTIONS = [
  {
    id: 'SMP-849201',
    name: 'Colrarda Santo',
    phone: '+506 8888-8888',
    initials: 'CS',
    amount: 15000,
    date: 'Hoy, 10:42 AM',
    status: 'Recibido',
  },
  {
    id: 'SMP-849198',
    name: 'Jusan Smitiz',
    phone: '+506 8712-3456',
    initials: 'JS',
    amount: 15000,
    date: 'Hoy, 10:15 AM',
    status: 'Recibido',
  },
  {
    id: 'SMP-849145',
    name: 'Carlas Dluion',
    phone: '+506 7011-2233',
    initials: 'CD',
    amount: 15000,
    date: 'Hoy, 09:30 AM',
    status: 'Completado',
  },
  {
    id: 'SMP-849112',
    name: 'Marilia Britan',
    phone: '+506 6190-4455',
    initials: 'MB',
    amount: 15270,
    date: 'Ayer, 06:12 PM',
    status: 'Completado',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [selectedTxForInvoice, setSelectedTxForInvoice] = useState(null);

  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleGoToInvoice = (tx) => {
    setSelectedTxForInvoice(tx);
    setActiveTab('facturacion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === 'home' && (
          <EcosystemHome setActiveTab={setActiveTab} transactions={transactions} />
        )}
        {activeTab === 'simpe' && (
          <SimpifySimpe
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onGoToInvoice={handleGoToInvoice}
          />
        )}
        {activeTab === 'facturacion' && (
          <SimpifyFacturacion
            transactions={transactions}
            selectedTx={selectedTxForInvoice}
          />
        )}
        {activeTab === 'pos' && (
          <SimpifyPOS onAddTransaction={handleAddTransaction} />
        )}
        {activeTab === 'precios' && <PricingROI setActiveTab={setActiveTab} />}
      </main>

      {/* Corporate Footer */}
      <footer className="bg-[#0F172A] text-slate-400 py-10 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SimpifyLogo size={28} />
            <span className="text-white font-extrabold text-lg">Simpify</span>
            <span className="text-xs text-slate-500">
              — Tus pagos por SINPE, Facturación y POS bajo control
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 Simpify Costa Rica. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}