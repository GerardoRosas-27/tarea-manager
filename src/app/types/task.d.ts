export interface Task {
    id: number;
    title: string;
    description: string;
}

export interface TaskItemProps {
    task: Task;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface TaskFormProps {
    onSubmit: (task: Omit<Task, "id">) => void;
    initialData?: Omit<Task, "id">;
    onCancel?: () => void;
}

export interface TaskModalProps {
    isOpen: boolean; // Estado del modal
    onClose: () => void; // Función para cerrar el modal
    onSubmit: (task: { title: string; description: string }) => void; // Acción al guardar
    initialData?: { title: string; description: string }; // Datos iniciales (opcional)
}
