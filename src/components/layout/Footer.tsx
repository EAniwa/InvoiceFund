import React from 'react';
import { Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">InvoiceFund</span>
            </div>
            <p className="mt-4 text-gray-600">
              Empowering SMEs with innovative invoice financing solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/about" className="text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
              <li><a href="/support" className="text-gray-600 hover:text-gray-900">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="/compliance" className="text-gray-600 hover:text-gray-900">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} InvoiceFund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}