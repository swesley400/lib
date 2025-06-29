import React from "react";
import { FiEdit, FiTrash, FiArrowUp, FiArrowDown } from "react-icons/fi";

type Field = {
  id?: string;
  type: string;
  name: string;
  order?: number;
};

interface FieldListProps {
  fields: Field[];
  onEditField?: (id: string) => void;
  onRemoveField?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
}

const FieldList: React.FC<FieldListProps> = ({ fields, onEditField, onRemoveField, onMoveUp, onMoveDown }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Added Fields
      </h3>
      <ul className="grid gap-4">
        {fields.map((field, index) => (
          <li
            key={index}
            className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                {field.type.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-gray-800 font-medium">{field.name}</h4>
                <p className="text-gray-500 text-sm">{field.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                aria-label="Move field up"
                onClick={() => field.id && onMoveUp && onMoveUp(field.id)}
                disabled={index === 0}
              >
                <FiArrowUp className={index === 0 ? "opacity-50" : ""} />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                aria-label="Move field down"
                onClick={() => field.id && onMoveDown && onMoveDown(field.id)}
                disabled={index === fields.length - 1}
              >
                <FiArrowDown className={index === fields.length - 1 ? "opacity-50" : ""} />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Edit field"
                onClick={() => field.id && onEditField && onEditField(field.id)}
              >
                <FiEdit />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                aria-label="Delete field"
                onClick={() => field.id && onRemoveField && onRemoveField(field.id)}
              >
                <FiTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FieldList;
