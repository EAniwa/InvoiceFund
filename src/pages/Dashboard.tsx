import React from 'react';
import { DollarSign, FileText, PieChart, Users } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { EmptyState } from '../components/dashboard/EmptyState';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Invoice } from '../types';

export function Dashboard() {
  // TODO: Replace with actual data from Supabase
  const invoices: Invoice[] = [];
  
  const hasInvoices = invoices.length > 0;
  const stats = hasInvoices ? {
    totalFunded: invoices
      .filter(i => i.status === 'funded')
      .reduce((sum, i) => sum + i.amount, 0),
    activeInvoices: invoices.filter(i => 
      ['verified', 'funded'].includes(i.status)
    ).length,
    returnRate: 8.5, // TODO: Calculate actual return rate
    activeInvestors: new Set(
      invoices
        .flatMap(i => i.chunks)
        .filter(c => c.investorId)
        .map(c => c.investorId)
    ).size
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {hasInvoices ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={DollarSign}
              title="Total Funded"
              value={stats!.totalFunded.toLocaleString('en-CA', {
                style: 'currency',
                currency: 'CAD'
              })}
            />
            <StatCard
              icon={FileText}
              title="Active Invoices"
              value={stats!.activeInvoices}
            />
            <StatCard
              icon={PieChart}
              title="Return Rate"
              value={`${stats!.returnRate}%`}
            />
            <StatCard
              icon={Users}
              title="Active Investors"
              value={stats!.activeInvestors}
            />
          </div>
          <RecentActivity invoices={invoices} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}