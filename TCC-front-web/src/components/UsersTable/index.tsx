import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../../services/apiClient';

type Role = 'admin' | 'user';

type IUserProps = {
  name: string;
  email: string;
  bloodType: string;
  role: Role;
}

function UsersTable() {
  const [user, setUser] = useState<IUserProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users');
        setUser(response.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
  });

  return (
    <div className="flex flex-col justify-between rounded-md bg-white p-7">
    <div className="flex items-center justify-between">
      <h2 className="text-[20px] font-medium text-gray-900">Usuários</h2>
    </div>
    <table className="mt-4">
      <thead>
        <tr>
          <td className="py-1 text-sm text-gray-600 font-semibold">Nome</td>
          <td className="py-1 text-sm text-gray-600 font-semibold">E-mail</td>
          <td className="py-1 text-sm text-gray-600 font-semibold">Tipo Sanguíneo</td>
        </tr>
      </thead>
      <tbody>
        {user.filter(user => user?.role !== 'admin').map((user, index) => (
          <tr key={index} className="border-b border-gray-200 last:border-none">
            <td className="py-4">
              <div className="flex items-center gap-x-2">
                <span className="text-sm text-gray-400">{user?.name}</span>
              </div>
            </td>
            <td className="py-4">
              <span className="text-sm text-gray-400">{user?.email}</span>
            </td>
            <td className="py-4">
              {user?.bloodType === 'APositivo' && (
                <span className="text-sm text-gray-400">A+</span>
              )}
              {user?.bloodType === 'BPositivo' && (
                <span className="text-sm text-gray-400">B+</span>
              )}
              {user?.bloodType === 'ABPositivo' && (
                <span className="text-sm text-gray-400">AB+</span>
              )}
              {user?.bloodType === 'ANegativo' && (
                <span className="text-sm text-gray-400">A-</span>
              )}
              {user?.bloodType === 'BNegativo' && (
                <span className="text-sm text-gray-400">B-</span>
              )}
              {user?.bloodType === 'ABNegativo' && (
                <span className="text-sm text-gray-400">AB-</span>
              )}
              {user?.bloodType === 'OPositivo' && (
                <span className="text-sm text-gray-400">O+</span>
              )}
              {user?.bloodType === 'ONegativo' && (
                <span className="text-sm text-gray-400">O-</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default UsersTable;