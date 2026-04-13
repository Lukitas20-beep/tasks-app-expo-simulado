import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

interface Props {
  onClose: () => void;
}

export default function AboutScreen({ onClose }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>

      <Image
        source={require('../../assets/task-app-banner.png')}
        style={styles.image}
      />

      <Text style={styles.text}>
        Este aplicativo foi desenvolvido com o objetivo de facilitar o gerenciamento de tarefas do dia a dia.
        Ele permite criar, editar e excluir tarefas de forma simples e intuitiva.
      </Text>

      <Text style={styles.text}>
        Além disso, o usuário pode organizar suas tarefas por status, visualizar pendências e manter o controle
        de suas atividades de maneira eficiente.
      </Text>

      <Text style={styles.text}>
        Este projeto também tem como finalidade o aprendizado prático de conceitos modernos de desenvolvimento
        mobile utilizando React Native e boas práticas de programação.
      </Text>

      <Text style={styles.subtitle}>Tecnologias utilizadas:</Text>
      <Text style={styles.text}>React Native</Text>
      <Text style={styles.text}>Expo</Text>
      <Text style={styles.text}>TypeScript</Text>
      <Text style={styles.text}>EAS</Text>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Fechar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});