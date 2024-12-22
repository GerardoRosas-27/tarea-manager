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