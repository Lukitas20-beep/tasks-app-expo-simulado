import { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import TaskList from '../src/components/TaskList';

import { useTaskStore } from '../src/store/useTaskStore';

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);

  const addTask = useTaskStore((state) => state.addTask);

  const updateTask = useTaskStore((state) => state.updateTask);

  const deleteAllTasks = useTaskStore(
    (state) => state.deleteAllTasks
  );

  const [text, setText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [taskId, setTaskId] = useState('');

  const [completed, setCompleted] = useState(false);

  const [priority, setPriority] = useState<
    'Baixa' | 'Média' | 'Alta'
  >('Baixa');

  const [filter, setFilter] = useState<
    'all' | 'completed' | 'pending'
  >('all');

  const resetForm = () => {
    setText('');
    setCompleted(false);
    setPriority('Baixa');
    setIsUpdating(false);
    setTaskId('');
    setModalVisible(false);
  };

  const handleSave = () => {
    if (!text.trim()) return;

    if (isUpdating) {
      updateTask(
        taskId,
        text,
        completed,
        null,
        priority
      );
    } else {
      addTask(
        text,
        completed,
        null,
        priority
      );
    }

    resetForm();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Gerenciador de Tarefas
      </Text>

      <Text>Total: {tasks.length}</Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginVertical: 20,
        }}
      >
        <Pressable onPress={() => setFilter('all')}>
          <Text>Todas</Text>
        </Pressable>

        <Pressable onPress={() => setFilter('completed')}>
          <Text>Concluídas</Text>
        </Pressable>

        <Pressable onPress={() => setFilter('pending')}>
          <Text>Pendentes</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: 'black',
          padding: 15,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: 'white' }}>
          Nova tarefa
        </Text>
      </Pressable>

      <Pressable
        onPress={deleteAllTasks}
        style={{
          backgroundColor: 'red',
          padding: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'white' }}>
          Excluir todas
        </Text>
      </Pressable>

      <TaskList filter={filter} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ padding: 20 }}>
          <TextInput
            placeholder="Digite a tarefa"
            value={text}
            onChangeText={setText}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 20,
            }}
          />

          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: 'black',
              padding: 15,
            }}
          >
            <Text style={{ color: 'white' }}>
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={resetForm}
            style={{
              marginTop: 20,
            }}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}