import React from 'react';
import { InvestorStats } from '../components/dashboard/investor/InvestorStats';
import { InvestmentsList } from '../components/dashboard/investor/InvestmentsList';
import { InvestorEmptyState } from '../components/dashboard/investor/InvestorEmptyState';
import { InvoiceChunk } from '../types';

export function InvestorDashboard() {
  // TODO: Replace with actual data from Supabase
  const investments: InvoiceChunk[] = [];
  
  const hasInvestments = investments.length > 0;
  const stats = {
    totalInvested: investments.reduce((sum, chunk) => sum + chunk.amount, 0),
    averageReturn: investments.reduce((sum, chunk) => sum + chunk.expectedReturn, 0) / investments.length || 0,
    activeInvestments: investments.filter(chunk => chunk.status === 'funded').length,
    availableFunds: 10000, // TODO: Get from user's wallet/account
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Investment Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/marketplace"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Marketplace
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <InvestorStats {...stats} />
      
      {hasInvestments ? (
        <InvestmentsList investments={investments} />
      ) : (
        <InvestorEmptyState />
      )}
    </div>
  );
}