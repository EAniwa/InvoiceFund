
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
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
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select(`
        id,
        first_name,
        last_name,
        user_type,
        company_name,
        verification_status,
        users:users(email)
      `)
      .eq('verification_status', 'pending');

    console.log('Pending profiles:', profiles);
    console.log('Error if any:', error);

    if (profiles) {
      setUsers(profiles.map(profile => ({
        id: profile.id,
        email: profile.users?.email || '',
        user_type: profile.user_type,
        company_name: profile.company_name,
        verification_status: profile.verification_status
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

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Verifications</h1>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No accounts to be verified
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
