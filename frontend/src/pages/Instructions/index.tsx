import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

export default function Instructions() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Alimentação</Text>
      <Text style={styles.description}>
        Doar sangue 02 (Duas) horas após o almoço (observar o período da digestão); {'\n'}
        {'\n'}
        Almoçar normalmente, de preferência, com carnes grelhadas, saladas, arroz, feijão; {'\n'}
        {'\n'}
        Evitar a ingestão de alimentos gordurosos (frituras, ovos, massas, maionese, sorvetes, chocolates, etc.).
      </Text>
      <Text style={styles.title}>Idade e peso</Text>
      <Text style={styles.description}>
        Ter entre 16 e 69 anos, desde que a primeira doação tenha sido feita até 60 anos (menores de 18 anos, clique para ver documentos necessários e formulário de autorização). {'\n'}
        {'\n'}
        Pesar no mínimo 50kg.
      </Text>
      <Text style={styles.title}>Descanso</Text>
      <Text style={styles.description}>
        Estar descansado (ter dormido pelo menos 6 horas nas últimas 24 horas).
      </Text>
      <Text style={styles.title}>Documentação</Text>
      <Text style={styles.description}>
        Apresentar documento original com foto recente, que permita a identificação do candidato, emitido por órgão oficial (Carteira de Identidade ou cópia autenticada; Cartão de Identidade de Profissional Liberal; Carteira de Trabalho e Previdência Social; Carteira Nacional de Habilitação, digital ou física; RNE - Registro Nacional de Estrangeiro; Título de Eleitor Digital, desde que tenha a foto; e Passaporte brasileiro com filiação).
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3A9C7F',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    marginBottom: 30
  }
})