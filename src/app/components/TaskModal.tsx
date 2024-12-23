import { TaskModalProps } from "../types/task";
import TaskForm from "./TaskForm";


const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <dialog id="task_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {initialData ? "Editar Tarea" : "Nueva Tarea"}
        </h3>
        <TaskForm
          onSubmit={onSubmit}
          initialData={initialData}
          onCancel={onClose}
        />
      </div>
    </dialog>
  );
};

export default TaskModal;
