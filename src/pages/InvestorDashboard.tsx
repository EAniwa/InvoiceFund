
import React from 'react';
import { Link } from 'react-router-dom';
import { InvestorStats } from '../components/dashboard/investor/InvestorStats';
import { InvestmentsList } from '../components/dashboard/investor/InvestmentsList';
import { InvestorEmptyState } from '../components/dashboard/investor/InvestorEmptyState';
import { Settings, User } from 'lucide-react';
import { InvoiceChunk } from '../types';

export function InvestorDashboard() {
  // TODO: Replace with actual data from Supabase
  const investments: InvoiceChunk[] = [];
  const userProfile = {
    name: 'John Doe',
    totalInvested: 10000
  };
  
  const hasInvestments = investments.length > 0;
  const stats = {
    totalInvested: investments.reduce((sum, chunk) => sum + chunk.amount, 0),
    averageReturn: investments.reduce((sum, chunk) => sum + chunk.expectedReturn, 0) / investments.length || 0,
    activeInvestments: investments.filter(chunk => chunk.status === 'funded').length,
    availableFunds: 10000,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userProfile.name}</h1>
          <p className="text-gray-600">Your Investment Dashboard</p>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/profile"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
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
