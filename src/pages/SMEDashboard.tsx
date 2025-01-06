
import React from 'react';
import { SMEStats } from '../components/dashboard/sme/SMEStats';
import { InvoiceUpload } from '../components/dashboard/sme/InvoiceUpload';
import { Invoice } from '../types';

export function SMEDashboard() {
  // TODO: Replace with actual data from Supabase
  const invoices: Invoice[] = [];
  const userProfile = {
    firstName: 'John',
    lastName: 'Doe',
    companyName: 'ACME Corp'
  };

  const stats = {
    totalFunded: invoices.filter(i => i.status === 'funded')
      .reduce((sum, i) => sum + i.amount, 0),
    pendingInvoices: invoices.filter(i => i.status === 'pending').length,
    fundingProgress: 75 // TODO: Calculate actual progress
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {userProfile.firstName} {userProfile.lastName}
        </h1>
        <p className="text-gray-600">{userProfile.companyName}</p>
      </div>

      <SMEStats {...stats} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InvoiceUpload />
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Recent Invoices</h3>
          {invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices.map(invoice => (
                <div key={invoice.id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Invoice #{invoice.id}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      invoice.status === 'funded' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>Amount: ${invoice.amount}</span>
                    <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No invoices uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
