import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { router } from 'expo-router';

import {
  TaskItem as TaskType,
  useTaskStore,
} from '../store/useTaskStore';

type Props = {
  task: TaskType;
};

export default function TaskItem({
  task,
}: Props) {
  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  const toggleTaskCompleted = useTaskStore(
    (state) => state.toggleTaskCompleted
  );

  return (
    <Pressable
      onPress={() =>
        router.push(`/task/${task._id}`)
      }
      style={{
        padding: 15,
        borderWidth: 1,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          textDecorationLine: task.completed
            ? 'line-through'
            : 'none',
        }}
      >
        {task.text}
      </Text>

      <Text>
        Prioridade: {task.priority}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={() =>
            toggleTaskCompleted(task._id)
          }
        >
          <Text>
            {task.completed
              ? 'Desmarcar'
              : 'Concluir'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            deleteTask(task._id)
          }
        >
          <Text>Excluir</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}