
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  user_type: 'sme' | 'investor';
  company_name: string | null;
  verification_status: 'pending' | 'approved' | 'rejected';
}

export function AdminVerification() {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    const { data: profiles } = await supabase
      .from('user_profiles')
      .select(`
        id,
        user_type,
        company_name,
        verification_status,
        users!inner(email)
      `)
      .eq('verification_status', 'pending');

    if (profiles) {
      setUsers(profiles.map(profile => ({
        ...profile,
        email: profile.users.email
      })));
    }
  };

  const updateStatus = async (userId: string, status: 'approved' | 'rejected') => {
    await supabase
      .from('user_profiles')
      .update({ verification_status: status })
      .eq('id', userId);
    
    await loadPendingUsers();
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Pending Verifications</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {users.map(user => (
            <li key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.user_type.toUpperCase()}
                    {user.company_name && ` - ${user.company_name}`}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateStatus(user.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(user.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
