export interface TableProps {
    headers: string[]; // Encabezados de la tabla
    data: Array<{ [key: string]: string | number }>; // Datos en formato clave-valor
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
  }
  