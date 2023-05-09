import React, { useState } from 'react';
// Styles
import './SelectField.scss';

type SelectFieldProps = {
    label: string;
    value: string;
    name: string;
    defaultOption?: string;
    options: { label: string; value: string }[];
    error: string | null;
    onChange: (e: { name: string; value: string }) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, defaultOption, options, name, error }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="select">
            <label htmlFor={name} className="select__label">
                {label}

                <select
                    className="select__form"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setTouched(true)}
                >
                    <option disabled value="">
                        {defaultOption}
                    </option>

                    {options &&
                        options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            </label>
            {error && touched && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;
