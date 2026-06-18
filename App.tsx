import { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
  Image,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import TaskList from './src/components/TaskList';
import {
  addTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  updateTask,
  TaskItem,
} from './src/utils/handle-api';
import AboutScreen from './src/components/AboutScreen';
import { EmptyState } from './src/components/EmptyState';

// Exercício 3: Componentes Gluestack-UI
import { GluestackUIProvider, Heading, Text, Pressable } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<'Baixa' | 'Média' | 'Alta'>('Baixa');

  useEffect(() => {
    getAllTasks(setTasks, setLoading);
  }, []);

  const resetForm = () => {
    setText('');
    setCompleted(false);
    setDueDate(null);
    setPriority('Baixa');
    setIsUpdating(false);
    setTaskId('');
    setModalVisible(false);
  };

  const updateMode = (task: TaskItem) => {
    setIsUpdating(true);
    setTaskId(task._id);
    setText(task.text);
    setCompleted(!!task.completed);
    setDueDate(task.dueDate ? new Date(task.dueDate) : null);
    setPriority(task.priority || 'Baixa');
    setModalVisible(true);
  };

  // CORREÇÃO: Força o envio do estado de texto limpo para a API
  const handleSave = () => {
    const taskText = text.trim();
    if (!taskText) return;

    const formattedDate = dueDate ? dueDate.toISOString() : null;
    if (isUpdating) {
      updateTask(taskId, taskText, completed, formattedDate, priority, setTasks, resetForm);
    } else {
      addTask(taskText, completed, formattedDate, priority, setTasks, resetForm);
    }
  };

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed') return !!task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView className="flex-1 bg-gray-100" style={{ paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }}>
        <View className="flex-1 max-w-[600px] w-full self-center px-4">
          
          <View className="items-center mt-4">
            {logoError ? (
              <Heading size="xl" className="text-center font-bold text-zinc-900">Gerenciador de Tarefas</Heading>
            ) : (
              <Image
                source={require('./assets/task-app-banner.png')}
                className="w-[60px] h-[60px] mb-2"
                onError={() => setLogoError(true)}
              />
            )}
            {!logoError && <Heading size="md" className="text-center font-bold text-zinc-800">Tarefas</Heading>}
          </View>

          <View className="mt-2 items-center">
            <Text className="text-sm text-gray-500">Total de Tarefas: {tasks.length}</Text>
          </View>

          {/* Filtros */}
          <View className="flex-row justify-center gap-2 mt-3">
            {[
              { key: 'all', label: 'Todas' },
              { key: 'completed', label: 'Concluídas' },
              { key: 'pending', label: 'Pendentes' },
            ].map((item) => {
              const selected = filter === item.key;
              return (
                <Pressable
                  key={item.key}
                  className={`py-1.5 px-3 rounded-full border ${selected ? 'bg-zinc-900 border-zinc-900' : 'bg-transparent border-zinc-900'}`}
                  onPress={() => setFilter(item.key as 'all' | 'completed' | 'pending')}
                >
                  <Text className={`text-xs ${selected ? 'text-white font-bold' : 'text-zinc-900'}`}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Botões Principais da Tela */}
          <View className="flex-row justify-center gap-3 mt-4">
            <Pressable 
              className="flex-1 bg-zinc-900 rounded-xl py-2.5 justify-center items-center active:opacity-80" 
              style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}
              onPress={() => setModalVisible(true)}
            >
              <Text className="font-bold text-white text-sm">Nova Tarefa</Text>
            </Pressable>

            <Pressable
              className={`flex-1 rounded-xl py-2.5 justify-center items-center active:opacity-80 ${tasks.length === 0 ? 'bg-gray-300' : 'bg-red-500'}`}
              style={Platform.OS === 'web' ? ({ cursor: tasks.length > 0 ? 'pointer' : 'not-allowed' } as any) : undefined}
              onPress={() => {
                if (tasks.length > 0) {
                  deleteAllTasks(tasks, setTasks);
                }
              }}
            >
              <Text className="font-bold text-white text-sm">Excluir todas</Text>
            </Pressable>
          </View>

          <View className="mt-4 items-center">
            <Pressable className="py-1 px-3" onPress={() => setAboutModalVisible(true)}>
              <Text className="text-blue-600 font-semibold text-sm">Sobre o App</Text>
            </Pressable>
          </View>

          {/* Renderização Condicional */}
          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onUpdate={updateMode}
              onDelete={(id) => deleteTask(id, setTasks)}
            />
          )}

          {loading && (
            <View className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-white/70 z-10">
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </View>

        {/* Modal Absoluto Unificado */}
        {modalVisible && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} className="justify-center items-center p-4">
            <View style={{ zIndex: 1000 }} className="w-full max-w-[440px] bg-white rounded-2xl p-6 shadow-2xl">
              
              <Heading size="md" className="mb-5 text-center font-bold text-zinc-900">
                {isUpdating ? 'Editar Tarefa' : 'Nova Tarefa'}
              </Heading>

              {/* Input Nativo de alta estabilidade */}
              <View className="mb-4 bg-white rounded-lg border border-gray-300 px-3 py-2">
                <TextInput
                  placeholder="Nome da tarefa..."
                  placeholderTextColor="#a1a1aa"
                  value={text}
                  maxLength={50}
                  onChangeText={(val) => setText(val)}
                  style={Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : undefined}
                  className="text-zinc-900 text-sm w-full bg-transparent"
                />
              </View>

              {/* Seleção de Data Limite */}
              <View className="flex-row items-center mb-4 justify-between">
                <Text className="text-sm font-bold text-zinc-800">Data limite:</Text>
                {Platform.OS === 'web' ? (
                  <input
                    type="date"
                    value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      if (val) {
                        const parts = val.split('-');
                        setDueDate(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
                      } else {
                        setDueDate(null);
                      }
                    }}
                    style={{ 
                      padding: '8px', 
                      borderRadius: '8px', 
                      borderWidth: '1px', 
                      borderColor: '#d1d5db', 
                      backgroundColor: '#fff',
                      color: '#1f2937',
                      width: '70%',
                      outline: 'none'
                    }}
                  />
                ) : (
                  <View className="w-[70%]">
                    <Pressable onPress={() => setShowDatePicker(true)} className="border border-gray-300 py-2 px-3 rounded-lg bg-white">
                      <Text className="text-zinc-700">{dueDate ? dueDate.toLocaleDateString() : 'Selecionar Data'}</Text>
                    </Pressable>
                    {showDatePicker && (
                      <DateTimePicker value={dueDate || new Date()} mode="date" display="default" onChange={onChangeDate} />
                    )}
                  </View>
                )}
              </View>

              {/* Checkbox de Conclusão */}
              <View className="flex-row items-center mb-4">
                <Text className="text-sm font-bold text-zinc-800 mr-4">Concluída:</Text>
                <Checkbox value={completed} onValueChange={setCompleted} color={completed ? '#000' : undefined} />
              </View>

              {/* Seleção de Prioridades */}
              <View className="flex-row items-center mb-6">
                <Text className="text-sm font-bold text-zinc-800">Prioridade:</Text>
                <View className="flex-row flex-1 ml-4 gap-2 flex-wrap">
                  {['Baixa', 'Média', 'Alta'].map((p) => {
                    const selected = priority === p;
                    return (
                      <Pressable
                        key={p}
                        className="py-1.5 px-2.5 rounded-lg border border-gray-300 bg-white"
                        style={[
                          selected && {
                            backgroundColor: p === 'Baixa' ? '#4caf50' : p === 'Média' ? '#ff9800' : '#f44336',
                            borderColor: p === 'Baixa' ? '#4caf50' : p === 'Média' ? '#ff9800' : '#f44336',
                          },
                          Platform.OS === 'web' && { cursor: 'pointer' }
                        ]}
                        onPress={() => setPriority(p as 'Baixa' | 'Média' | 'Alta')}
                      >
                        <Text className={`text-xs ${selected ? 'text-white font-bold' : 'text-zinc-700'}`}>{p}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Botões de Ação do Modal */}
              <View className="flex-row justify-end gap-3 border-t border-gray-100 pt-4">
                <Pressable 
                  onPress={resetForm}
                  className="py-2 px-4 rounded-xl active:opacity-60"
                  style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}
                >
                  <Text className="text-gray-500 font-bold text-sm">Cancelar</Text>
                </Pressable>

                <Pressable 
                  onPress={handleSave}
                  style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}
                  className="py-2 px-5 rounded-xl justify-center items-center bg-zinc-900 active:bg-zinc-800"
                >
                  <Text className="font-bold text-white text-sm">Salvar</Text>
                </Pressable>
              </View>

            </View>
          </View>
        )}

        {/* Modal de Detalhes / Sobre o App */}
        {aboutModalVisible && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, backgroundColor: '#fff' }}>
            <AboutScreen onClose={() => setAboutModalVisible(false)} />
          </View>
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}