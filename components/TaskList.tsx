import React from 'react';
import { FlatList, StyleSheet, View, SectionList } from 'react-native';
import TaskItem from './TaskItem';
import { TaskItem as TaskType } from '../utils/handle-api';

interface TaskListProps {
  tasks: TaskType[];
  onUpdate: (task: TaskType) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {

  const sections = [
    {
      title: "📋 Pendentes",
      data: tasks.filter(task => task.completed === false),
      emptyMessage: "Esperando tarefas...",
    },
    {
      title: "✅ Concluídas",
      data: tasks.filter(task => task.completed === true),
      emptyMessage: "Esperando tarefas...",
    },
  ]

  return (
    <View style={styles.listContainer}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            updateMode={() => onUpdate(item)}
            deleteTask={() => onDelete(item._id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  }
});

export default TaskList;
