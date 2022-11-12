import React, { useContext, FormEvent, useState } from 'react'
import { Container } from "./styles";
import { AuthContext } from '../../contexts/AuthContext'

import loginImg from '../../assets/images/conference-login.jpg'
import logo from '../../assets/images/logo.png'

export default function Login() {

  const { signIn } = useContext(AuthContext);

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      cpf,
      password
    }

    await signIn(data)
  }

  return (
    <Container>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='content-photo'>
          <img src={logo} alt='Foto de uma conferencia na página de login' />
        </div>
        <div className='content-form flex flex-col justify-center'>
          <form onSubmit={handleLogin} className='max-w-[400px] w-full mx-auto form p-8 px-8 rounded-lg'>
            <div className='flex flex-col text-gray-400 py-2'>
              <label>CPF</label>
              <input value={cpf} onChange={ (e) => setCpf(e.target.value) } className='rounded-lg mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none' type='text' />
            </div>
            <div className='flex flex-col text-gray-400 py-2'>
              <label>Senha</label>
              <input value={password} onChange={ (e) => setPassword(e.target.value) } className='rounded-lg mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none' type='password' />
            </div>
            <div className='flex justify-between text-gray-400 py-2'>
              <p className='flex items-center'>
                <input type='checkbox' className='mr-2' />Manter conectado
              </p>
              <p>Esqueci minha senha</p>
            </div>
            <button className='button w-full my-5 py-2 bg-gray-200 shadow-lg shadow-gray-500/50 hover:shadow-gray-500/40 font-semibold rounded-lg'>Login</button>
          </form>
        </div>
      </div>
    </Container>
  )
}