import React from 'react'

const InputType = ({ labelText, inputType, labelFor, value, onChange, name }) => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor={labelFor} className="block text-gray-600 text-sm font-medium mb-2">{labelText}</label>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
    </>
  )
}
export default InputType