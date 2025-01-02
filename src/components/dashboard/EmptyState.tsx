import React from 'react';
import { FileText, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <FileText className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No invoices</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by uploading your first invoice.
      </p>
      <div className="mt-6">
        <Link
          to="/invoices/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Invoice
        </Link>
      </div>
    </div>
  );
}