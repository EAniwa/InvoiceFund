import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InvestorEmptyState() {
  return (
    <div className="text-center py-12">
      <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No investments yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Start growing your portfolio by investing in verified invoices.
      </p>
      <div className="mt-6">
        <Link
          to="/marketplace"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse Marketplace
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}