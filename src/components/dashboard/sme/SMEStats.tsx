
import React from 'react';
import { StatCard } from '../StatCard';
import { DollarSign, FileText, PieChart } from 'lucide-react';

interface SMEStatsProps {
  totalFunded: number;
  pendingInvoices: number;
  invoices: Invoice[];
}

export function SMEStats({ totalFunded, pendingInvoices, invoices }: SMEStatsProps) {
  const fundingProgress = invoices.length === 0 ? 0 : 
    Math.round((invoices.reduce((sum, invoice) => {
      const fundedAmount = invoice.chunks
        .filter(chunk => chunk.status === 'funded')
        .reduce((total, chunk) => total + chunk.amount, 0);
      return sum + (fundedAmount / invoice.amount * 100);
    }, 0) / invoices.length));
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <StatCard
        icon={DollarSign}
        title="Total Funded"
        value={totalFunded.toLocaleString('en-CA', {
          style: 'currency',
          currency: 'CAD'
        })}
      />
      <StatCard
        icon={FileText}
        title="Pending Invoices"
        value={pendingInvoices}
      />
      <StatCard
        icon={PieChart}
        title="Funding Progress"
        value={`${fundingProgress}%`}
      />
    </div>
  );
}
