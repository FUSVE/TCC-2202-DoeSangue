import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {

  const { signIn } = useContext(AuthContext);

  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function handleLogin() {

    if(cpf === '' || password === '') {
      return;
    }

    await signIn({ cpf, password });
    
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ height: 250, width: 350 }} source={require('../../assets/logo.png')}/>
      </View>
      <View style={styles.areaTitle}>
        <Text style={styles.titleInput}>Entre em sua conta</Text>
      </View>
      <View style={styles.sectionInput}>
        <TextInput 
          placeholder='Digite seu CPF...'
          style={styles.input}
          value={cpf}
          onChangeText={setCPF}
        />
        <TextInput 
          placeholder='Digite sua senha...'
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.areaForgot}>
          <View />
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.textButton}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register' as never)}>
          <Text style={styles.textButtonRegister}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
  },
  sectionInput: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginLeft: 8,
  },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: '#FFF',
    marginBottom: 12,
    borderRadius: 6,
    paddingHorizontal: 8,
    borderColor: '#3A9C7F',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#3A9C7F',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  },
  titleInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A9C7F',
    marginBottom: 12,
  },
  forgot: {
    color: '#3A9C7F',
    marginRight: 8,
  },
  areaForgot: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'trasparent',
    marginBottom: 20
  },
  areaTitle: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'trasparent',
    marginLeft: 30
  },
  buttonRegister: {
    width: '95%',
    height: 40,
    marginTop: 12,
    backgroundColor: '#FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3A9C7F',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  textButtonRegister: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A9C7F'
  }
})