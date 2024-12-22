import { TableProps } from "../types/table";

export default function Table({ headers, data, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Head */}
        <thead>
          <tr>
            <th></th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{rowIndex + 1}</th>
              {headers.slice(0, -1).map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
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
    </div>
  );
}
