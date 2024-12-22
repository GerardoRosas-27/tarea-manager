import { Task, TaskItemProps } from "../types/task";


const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => (
  <div className="border p-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
    <div className="flex space-x-2">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onEdit(task.id)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => onDelete(task.id)}
      >
        Eliminar
      </button>
    </div>
  </div>
);

export default TaskItem;
