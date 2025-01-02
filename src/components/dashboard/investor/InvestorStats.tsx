import React from 'react';
import { Wallet, TrendingUp, Clock, PiggyBank } from 'lucide-react';
import { StatCard } from '../StatCard';

interface InvestorStatsProps {
  totalInvested: number;
  averageReturn: number;
  activeInvestments: number;
  availableFunds: number;
}

export function InvestorStats({
  totalInvested,
  averageReturn,
  activeInvestments,
  availableFunds,
}: InvestorStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Wallet}
        title="Total Invested"
        value={totalInvested.toLocaleString('en-CA', {
          style: 'currency',
          currency: 'CAD'
        })}
      />
      <StatCard
        icon={TrendingUp}
        title="Average Return"
        value={`${averageReturn}%`}
      />
      <StatCard
        icon={Clock}
        title="Active Investments"
        value={activeInvestments}
      />
      <StatCard
        icon={PiggyBank}
        title="Available Funds"
        value={availableFunds.toLocaleString('en-CA', {
          style: 'currency',
          currency: 'CAD'
        })}
      />
    </div>
  );
}