import React from 'react';
import { DollarSign } from 'lucide-react';
import { Invoice } from '../../types';

interface RecentActivityProps {
  invoices: Invoice[];
}

export function RecentActivity({ invoices }: RecentActivityProps) {
  if (invoices.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        Recent Activity
      </h2>
      <div className="mt-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <li key={invoice.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      Invoice #{invoice.id.slice(0, 8)}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {invoice.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {invoice.amount.toLocaleString('en-CA', {
                          style: 'currency',
                          currency: 'CAD'
                        })}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Created on{' '}
                        <time dateTime={invoice.createdAt.toISOString()}>
                          {new Intl.DateTimeFormat('en-CA').format(invoice.createdAt)}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}