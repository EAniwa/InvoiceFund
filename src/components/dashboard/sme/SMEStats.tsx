
import React from 'react';
import { StatCard } from '../StatCard';
import { DollarSign, FileText, PieChart } from 'lucide-react';

interface SMEStatsProps {
  totalFunded: number;
  pendingInvoices: number;
  fundingProgress: number;
}

export function SMEStats({ totalFunded, pendingInvoices, fundingProgress }: SMEStatsProps) {
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
