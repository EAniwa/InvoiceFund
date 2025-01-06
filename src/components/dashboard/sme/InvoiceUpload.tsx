
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export function InvoiceUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    try {
      // Upload file to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create invoice record in database
      const { error: dbError } = await supabase
        .from('invoices')
        .insert({
          file_path: fileName,
          status: 'pending',
          amount: 0, // This should be extracted from the invoice
          sme_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (dbError) throw dbError;

      setFile(null);
      alert('Invoice uploaded successfully!');
    } catch (error) {
      console.error('Error uploading invoice:', error);
      alert('Error uploading invoice');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium">Upload New Invoice</h3>
      <form onSubmit={handleUpload} className="mt-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF or Image files</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,image/*"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!file}
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          Upload Invoice
        </button>
      </form>
    </div>
  );
}
