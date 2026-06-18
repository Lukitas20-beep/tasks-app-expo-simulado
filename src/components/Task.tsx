// src/components/Task.tsx
import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { TaskItem as TaskType } from '../utils/handle-api';
import { 
  Button, 
  ButtonText, 
  AlertDialog, 
  AlertDialogBackdrop, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogBody, 
  AlertDialogFooter,
  Heading
} from '@gluestack-ui/themed';

interface TaskProps {
  task: TaskType;
  onDelete: (id: string) => void;
}

export function Task({ task, onDelete }: TaskProps) {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const cancelRef = useRef(null);

  return (
    // Exercício 2: Fundo branco, bordas arredondadas, leve sombra, padding interno e flex-row separado pelas extremidades via NativeWind
    <View className="flex-row items-center justify-between bg-white p-4 mb-3 rounded-xl shadow-sm border border-gray-100">
      
      <Text className={`flex-1 text-zinc-900 text-base mr-3 ${task.completed ? 'line-through text-gray-400' : ''}`}>
        {task.text}
      </Text>
      
      {/* Botão de Excluir dispara a confirmação visual (Exercício 4) */}
      <Button size="sm" action="negative" className="bg-red-500 rounded-lg" onPress={() => setShowAlertDialog(true)}>
        <ButtonText className="font-bold">Excluir</ButtonText>
      </Button>

      {/* Exercício 4: AlertDialog impedindo deleção acidental na API backend */}
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg" className="text-zinc-900">Confirmar Exclusão</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-zinc-600 text-sm">
              Tem certeza que deseja excluir esta tarefa?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              action="secondary"
              ref={cancelRef}
              onPress={() => setShowAlertDialog(false)}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              action="negative"
              className="bg-red-600"
              onPress={() => {
                setShowAlertDialog(false);
                onDelete(task._id); // Dispara a deleção real se confirmado
              }}
            >
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}