import { useState } from "react";
import Paginator from "./Paginator"; // Importa el nuevo componente Paginator
import { TableProps } from "../types/table";

export default function Table({ headers, data, onEdit, onDelete }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de filas por página

  // Calcular datos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);
  

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Encabezado */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              
              {headers.map((header, colIndex) =>
                colIndex === headers.length - 1 ? null : (
                  <td key={colIndex}>{row[header]}</td>
                )
              )}
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => onEdit(row.id as number)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(row.id as number)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginador */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
