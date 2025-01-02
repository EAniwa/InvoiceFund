import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { InvoiceChunk } from '../../../types';

interface InvestmentsListProps {
  investments: InvoiceChunk[];
}

export function InvestmentsList({ investments }: InvestmentsListProps) {
  if (investments.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        Your Investments
      </h2>
      <div className="mt-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {investments.map((chunk) => (
              <li key={chunk.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      Invoice Chunk #{chunk.id.slice(0, 8)}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {chunk.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex space-x-6">
                      <p className="flex items-center text-sm text-gray-500">
                        <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {chunk.amount.toLocaleString('en-CA', {
                          style: 'currency',
                          currency: 'CAD'
                        })}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Expected Return: {chunk.expectedReturn}%
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Invested on{' '}
                        <time dateTime={chunk.fundedAt?.toISOString()}>
                          {chunk.fundedAt ? new Intl.DateTimeFormat('en-CA').format(chunk.fundedAt) : 'N/A'}
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