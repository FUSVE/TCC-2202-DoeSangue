import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { api } from '../../services/apiClient';
import { Flex, Box, Text, Button, Input, Select } from '@chakra-ui/react';
import { setupAPIClient } from '../../services/api';

interface IDonationsProps {
  id: string;
  quantity: string;
  createdAt: string;
  userId: string;
  user: {
    name: string;
    bloodType: string;
  };
}

type UserProps = {
  id: string;
  name: string;
  role: string;
}

function DonationsTable() {

  const [donationsData, setDonationsData] = useState<IDonationsProps[]>([]);
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [userList, setUserList] = useState<UserProps[]>([]);
  const [userSelected, setUserSelected] = useState('');
 
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/donations');
        setDonationsData(response.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users');
        setUserList(response.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      if (userSelected === '') {
        alert('Selecione um usuário');
        return;
      }

      if (quantity === '') {
        alert('Selecione uma quantidade');
        return;
      }

      const apiClient = setupAPIClient();
      const response = await apiClient.post('/donations', {
        quantity: Number(quantity),
        userId: userSelected,
      });

      if (response.status === 200) {
        alert('Doação cadastrada com sucesso');
        setQuantity('');
        setUserSelected('');
        setModal(false);
        setDonationsData([...donationsData, response.data]);
      }

    } catch (err) {
      console.log(err);
    }
  }, [quantity, userSelected]);

  function handleModal() {
    setModal(true);
  }

  function dateFormat(date: any) {
    const newDate = new Date(date);
    let formattDate = newDate.getDate().toString().padStart(2,"0") + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
    
    return formattDate;
  }

  return (
    <>
      <div className="flex flex-col justify-between rounded-md bg-white p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-medium text-gray-900">Doações</h2>
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
            <span>Adicionar Doação</span>
          </button>
        </div>
        <table className="mt-4">
          <thead>
            <tr>
              <td className="py-1 text-sm text-gray-600 font-semibold">Nome</td>
              <td className="py-1 text-sm text-gray-600 font-semibold">Quantidade</td>
              <td className="py-1 text-sm text-gray-600 font-semibold">Tipo Sanguíneo</td>
              <td className="py-1 text-sm text-gray-600 font-semibold">Data</td>
            </tr>
          </thead>
          <tbody>
            {donationsData.map((donation, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-none">
                <td className="py-4">
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm text-gray-400">{donation?.user.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-400">{donation?.quantity} ml</span>
                </td>
                <td className="py-4">
                  {donation?.user.bloodType === 'APositivo' && (
                  <span className="text-sm text-gray-400">A+</span>
                  )}
                  {donation?.user.bloodType === 'BPositivo' && (
                    <span className="text-sm text-gray-400">B+</span>
                  )}
                  {donation?.user.bloodType === 'ABPositivo' && (
                    <span className="text-sm text-gray-400">AB+</span>
                  )}
                  {donation?.user.bloodType === 'ANegativo' && (
                    <span className="text-sm text-gray-400">A-</span>
                  )}
                  {donation?.user.bloodType === 'BNegativo' && (
                    <span className="text-sm text-gray-400">B-</span>
                  )}
                  {donation?.user.bloodType === 'ABNegativo' && (
                    <span className="text-sm text-gray-400">AB-</span>
                  )}
                  {donation?.user.bloodType === 'OPositivo' && (
                    <span className="text-sm text-gray-400">O+</span>
                  )}
                  {donation?.user.bloodType === 'ONegativo' && (
                    <span className="text-sm text-gray-400">O-</span>
                  )}
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-400">{dateFormat(donation?.createdAt)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <>
      <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
        <Flex pt={8} pb={8} background="rgb(255 255 255 / var(--tw-bg-opacity));" maxW="700px" w="100%" direction="column" alignItems="center" justifyContent="center">
          <Flex direction="column" w="90%">
            <Text className="py-1 text-sm text-gray-600 font-semibold" mb={3}>Quantidade doada</Text>
            <Input w="100%" background="#f1f1f1" placeholder="Informe a quantidade doada" type="number" value={quantity} onChange={ (e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value) } />
          </Flex>
          <Flex direction="column" w="90%">
            <Text className="py-1 text-sm text-gray-600 font-semibold" mb={3} mt={7}>Doador</Text>
            <Select w="100%" background="#f1f1f1" value={userSelected} onChange={(e) => setUserSelected(e.target.value)}>
              <option value="" disabled>Selecione...</option>
            {userList?.filter(user => user.role !== 'admin').map((user, index) => {
                return (
                  <option key={user?.id} value={user?.id}>
                    {user?.name}
                  </option>
                )
              }
            )}
            </Select>

            <Button w="100%" mt={10} _hover={{ bg: '#3A9C7F' }} onClick={handleRegister}>
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>}
    </>
  )
}

export default DonationsTable;