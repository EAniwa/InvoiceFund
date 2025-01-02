
import React from 'react';
import { FileText, Upload, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../lib/supabase';

export function EmptyState() {
  const { user } = useUser();
  const isSME = user?.userType === 'sme';

  return (
    <div className="text-center py-12">
      <FileText className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        {isSME ? 'No invoices' : 'No investments'}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {isSME 
          ? 'Get started by uploading your first invoice.'
          : 'Start exploring available invoices in the marketplace.'}
      </p>
      <div className="mt-6">
        {isSME ? (
          <Link
            to="/invoices/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Invoice
          </Link>
        ) : (
          <Link
            to="/marketplace"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Browse Marketplace
          </Link>
        )}
      </div>
    </div>
  );
}
