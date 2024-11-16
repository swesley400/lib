import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

type Field = {
  type: string;
  name: string;
};

interface FieldListProps {
  fields: Field[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
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
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Edit field"
              >
                <FiEdit />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                aria-label="Delete field"
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
