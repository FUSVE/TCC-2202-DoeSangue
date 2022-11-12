import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../../services/apiClient';
import FormNotification from '../../components/FormNotification';

interface INotificationsProps {
  id: string;
  type: string;
  description: string;
}

function NotificationsTable() {

  const [notificationsData, setNotificationsData] = useState<INotificationsProps[]>([]);
  const [modal, setModal] = useState(false);

  function handleModal() {
    setModal(true);
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/notifications');
        setNotificationsData(response.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
  });

  return (
    <>
      <div className="flex flex-col justify-between rounded-md bg-white p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-medium text-gray-900">Notificações</h2>
          <button onClick={handleModal} className="inline-flex items-center gap-x-1 rounded-md bg-primary py-2 px-4 text-sm text-white hover:text-white hover:bg-gray-900">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 stroke-current"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 5.75v12.5M18.25 12H5.75"
              ></path>
            </svg>
            <span>Adicionar Notificação</span>
          </button>
        </div>
        <table className="mt-4">
          <thead>
            <tr>
              <td className="py-1 text-sm text-gray-600 font-semibold">Tipo</td>
              <td className="py-1 text-sm text-gray-600 font-semibold">Descrição</td>
            </tr>
          </thead>
          <tbody>
            {notificationsData.map((notification, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-none">
                <td className="py-4">
                  <span className="text-sm text-gray-400">{notification.type}</span>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-400">{notification.description}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <FormNotification />}
    </>
  )
}

export default NotificationsTable;