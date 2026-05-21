import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Minhas Tarefas',
        }}
      />

      <Stack.Screen
        name="task/[id]"
        options={{
          title: 'Detalhes da Tarefa',
        }}
      />
    </Stack>
  );
}