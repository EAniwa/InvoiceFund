import React from 'react';
import { Building2, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isInvestorDashboard = location.pathname === '/dashboard';
  const isSMEDashboard = location.pathname === '/sme/dashboard';
  const isAdminVerification = location.pathname === '/admin/verification';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">InvoiceFund</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            {!isAdminVerification && !isSMEDashboard && location.pathname !== '/marketplace' && ( //Hide buttons on admin verification, SME dashboard and marketplace
              <>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">
                  How it Works
                </Link>
                {isInvestorDashboard ? (
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}