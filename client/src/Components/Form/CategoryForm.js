import React from 'react';

export default function CategoryForm({ handleSubmit, value, setValue,edit }) {
  return (
    <div className="max-w-md mx-auto my-8">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 p-2 w-3/4 mr-2 rounded-l"
          placeholder="Enter category name"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-r"
        >
          {edit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
