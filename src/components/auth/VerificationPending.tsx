import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function VerificationPending() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShieldCheck className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verification Pending
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w-md mx-auto">
          Your account is currently pending verification by an administrator. You will not be able to log in until your account has been verified. Please check back later.
        </p>
      </div>
    </div>
  );
}