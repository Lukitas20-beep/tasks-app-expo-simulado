import {
  View,
  Text,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { useTaskStore } from '../../src/store/useTaskStore';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();

  const task = useTaskStore((state) =>
    state.tasks.find((t) => t._id === id)
  );

  if (!task) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Tarefa não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
        }}
      >
        {task.text}
      </Text>

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
        }}
      >
        Status:{' '}
        {task.completed
          ? 'Concluída'
          : 'Pendente'}
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontSize: 18,
        }}
      >
        Prioridade: {task.priority}
      </Text>
    </View>
  );
}