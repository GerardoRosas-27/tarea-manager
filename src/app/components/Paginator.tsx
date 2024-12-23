import { PaginatorProps } from "../types/table";

  
  export default function Paginator({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginatorProps) {
    return (
      <div className="flex justify-center mt-4">
        <div className="btn-group">
          {/* Botón Anterior */}
          <button
            className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
  
          {/* Botones de Número de Página */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "btn-active" : ""}`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
  
          {/* Botón Siguiente */}
          <button
            className={`btn ${currentPage === totalPages ? "btn-disabled" : ""}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }
  