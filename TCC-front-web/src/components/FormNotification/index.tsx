import React, { useState, ChangeEvent, useEffect } from 'react';
import { Flex, Box, Text, Button, Input, Select } from '@chakra-ui/react';
import { setupAPIClient } from '../../services/api';

export default function FormNotification() {

  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  async function handleRegister() {

    try {
      const apiClient = setupAPIClient();
      await apiClient.post('/notifications', {
        type: type,
        description: description,
      });

      setDescription('');
      setType('');
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
        <Flex pt={8} pb={8} background="rgb(255 255 255 / var(--tw-bg-opacity));" maxW="700px" w="100%" direction="column" alignItems="center" justifyContent="center">
          <Flex direction="column" w="90%">
            <Text className="py-1 text-sm text-gray-600 font-semibold" mb={3}>Tipo</Text>
            <Input w="100%" background="#f1f1f1" placeholder="Informe a quantidade doada" type="text" value={type} onChange={ (e: ChangeEvent<HTMLInputElement>) => setType(e.target.value) } />
          </Flex>
          <Flex direction="column" w="90%">
            <Text className="py-1 text-sm text-gray-600 font-semibold" mb={3} mt={7}>Mensagem</Text>
            <Input w="100%" background="#f1f1f1" placeholder="Informe a quantidade doada" type="text" value={description} onChange={ (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value) } />

            <Button w="100%" mt={10} _hover={{ bg: '#3A9C7F' }} onClick={handleRegister}>
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}