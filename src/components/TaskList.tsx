import { FlatList } from 'react-native';

import TaskItem from './TaskItem';

import { useTaskStore } from '../store/useTaskStore';

type Props = {
  filter: 'all' | 'completed' | 'pending';
};

export default function TaskList({
  filter,
}: Props) {
  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;

    if (filter === 'pending') return !task.completed;

    return true;
  });

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem task={item} />
      )}
    />
  );
}