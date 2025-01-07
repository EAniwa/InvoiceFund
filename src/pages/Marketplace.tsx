
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Invoice } from '../types';

export function Marketplace() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [chunks, setChunks] = useState(1);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('status', 'verified');
    if (data) setInvoices(data);
  };

  const calculateAvailableChunks = (invoice: Invoice) => {
    const fundedChunks = invoice.chunks.filter(c => c.status === 'funded').length;
    return Math.floor(invoice.amount / 10) - fundedChunks;
  };

  const handleBuy = async (invoice: Invoice) => {
    const totalAmount = chunks * 10;
    // TODO: Implement payment processing
    const { error } = await supabase.from('invoice_chunks').insert(
      Array(chunks).fill({
        invoice_id: invoice.id,
        amount: 10,
        status: 'funded',
        investor_id: (await supabase.auth.getUser()).data.user?.id,
        expected_return: 8.5
      })
    );
    if (!error) {
      loadInvoices();
      setSelectedInvoice(null);
      setChunks(1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Invoice Marketplace</h1>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Dashboard
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {invoices.map(invoice => (
          <div key={invoice.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Invoice #{invoice.id.slice(0, 8)}</h3>
                <p className="text-gray-500">Due in {Math.ceil((new Date(invoice.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {calculateAvailableChunks(invoice)} chunks left
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">Total Amount: ${invoice.amount}</p>
              <p className="text-gray-700">Expected Return: 8.5%</p>
            </div>

            <button
              onClick={() => setSelectedInvoice(invoice)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Buy Chunks
            </button>
          </div>
        ))}
      </div>

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Buy Invoice Chunks</h2>
            <p className="mb-4">Invoice #{selectedInvoice.id.slice(0, 8)}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Number of Chunks ($10 each)</label>
              <input
                type="number"
                min="1"
                max={calculateAvailableChunks(selectedInvoice)}
                value={chunks}
                onChange={e => setChunks(parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBuy(selectedInvoice)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
