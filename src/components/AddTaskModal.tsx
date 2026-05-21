import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function AddTaskModal() {
  const [title, setTitle] = useState('');

  const addTask = useTaskStore(
    (state) => state.addTask
  );

  function handleAddTask() {
    if (!title.trim()) return;

    addTask(title);

    setTitle('');
  }

  return (
    <View>
      <TextInput
        placeholder="Nova tarefa"
        value={title}
        onChangeText={setTitle}
      />

      <Button
        title="Adicionar"
        onPress={handleAddTask}
      />
    </View>
  );
}