import React from 'react';
import { InputFieldProps } from '@/types/types';

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = "text", options, placeholder }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">{label}</legend>
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="select"
                >
                    <option value="" disabled>{placeholder}</option>
                    {options?.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className="input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                />
            )}
        </fieldset>
    );
};

export default InputField;
