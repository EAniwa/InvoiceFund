
import React, { useState, useEffect } from 'react';
import { FileText, Upload, DollarSign, CheckCircle } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { supabase } from '../lib/supabase';

interface Invoice {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'listed' | 'funded';
  created_at: string;
  funded_amount?: number;
}

export function SMEDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');

  const loadInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setInvoices(data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !amount) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    
    // Upload invoice document to storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from('invoices')
      .upload(`${Date.now()}-${selectedFile.name}`, selectedFile);

    if (fileError) {
      console.error('Error uploading file:', fileError);
      return;
    }

    // Create invoice record
    const { error: dbError } = await supabase
      .from('invoices')
      .insert([
        {
          amount: parseFloat(amount),
          status: 'pending',
          file_path: fileData?.path
        }
      ]);

    if (!dbError) {
      setSelectedFile(null);
      setAmount('');
      loadInvoices();
    }
  };

  const stats = {
    totalInvoices: invoices.length,
    approvedInvoices: invoices.filter(i => i.status === 'approved').length,
    listedInvoices: invoices.filter(i => i.status === 'listed').length,
    totalFunded: invoices.reduce((sum, i) => sum + (i.funded_amount || 0), 0)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          icon={FileText}
          title="Total Invoices"
          value={stats.totalInvoices}
        />
        <StatCard
          icon={CheckCircle}
          title="Approved Invoices"
          value={stats.approvedInvoices}
        />
        <StatCard
          icon={Upload}
          title="Listed Invoices"
          value={stats.listedInvoices}
        />
        <StatCard
          icon={DollarSign}
          title="Total Funded"
          value={stats.totalFunded.toLocaleString('en-CA', {
            style: 'currency',
            currency: 'CAD'
          })}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">Upload New Invoice</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Invoice File
            </label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full"
              accept=".pdf,.png,.jpg,.jpeg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter invoice amount"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Invoice
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <h2 className="text-lg font-medium p-6 border-b">Your Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funded Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.amount.toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'approved' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'listed' ? 'bg-blue-100 text-blue-800' :
                      invoice.status === 'funded' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.funded_amount?.toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD'
                    }) || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
