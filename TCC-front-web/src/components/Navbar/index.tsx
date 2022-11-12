import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../../services/apiClient';
import Profile from '../../assets/images/profile.png';

type UserProps = {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
}

function Navbar() {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/user-detail');
        setUser(response.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <nav className="flex items-center gap-x-6">
      <div className="flex w-3/5 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 flex items-center px-3">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 stroke-current text-gray-400"
              >
                <path
                  stroke="currentColor"
                  d="M19.25 19.25 15.5 15.5M4.75 11a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0Z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Pesquisar"
              className="rounded-md bg-white py-3 pr-4 pl-10 text-sm text-gray-400 focus:text-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex w-2/5 items-center justify-end">
        <button className="flex h-11 items-center justify-center rounded-full bg-white px-2 text-gray-400 hover:bg-primary hover:text-white">
          <img
            src={Profile}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="pl-2 text-sm">{user?.name}</span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 stroke-current"
          >
            <path
              stroke="currentColor"
              d="M15.25 10.75 12 14.25l-3.25-3.5"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar