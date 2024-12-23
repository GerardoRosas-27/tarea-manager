
export interface Task {
    id: number;
    title: string;
    description: string;
}

export interface TaskFormProps {
    onSubmit: (task: Partial<Task> & { title: string; description: string }) => void;
    initialData?: Partial<Task> & { title: string; description: string }; // Permite datos parciales
    onCancel?: () => void;
}


export interface TaskModalProps {
    isOpen: boolean; // Estado del modal
    onClose: () => void; // Función para cerrar el modal
    onSubmit: (task: Partial<Task> & { title: string; description: string }) => void; // Puede ser una tarea nueva o una existente
    initialData?: Partial<Task> & { title: string; description: string }; // Datos iniciales con ID opcional
}

export interface AlertProps {
    message: string;
    type: "success" | "error" | "info"; // Tipos de alerta
    onClose?: () => void; // Callback opcional para cerrar la alerta
    onConfirm?: () => void; // Callback para confirmar la acción
    onCancel?: () => void; // Callback para cancelar la acción
    actionType?: "confirm" | "notification"; // Tipo de acción: confirmación o notificación
}