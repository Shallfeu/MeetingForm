import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../App';
// Styles
import './TextField.scss';

type TextFieldProps = {
    type?: string;
    label: string;
    name: string;
    value: string;
    error: string | null;
    onChange: (e: { name: string; value: string }) => void;
};

export const TextField: React.FC<TextFieldProps> = ({ type = 'text', name, label, value, error, onChange }) => {
    const [touched, setTouched] = useState(false);

    const theme = useContext(ThemeContext);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className={`input-${theme}`}>
            <label htmlFor={name} className={`input-${theme}__area`}>
                <input
                    id={name}
                    type={type}
                    value={value}
                    name={name}
                    placeholder={label}
                    onChange={handleChange}
                    onBlur={() => setTouched(true)}
                    className={`input-${theme}__box`}
                />
                {error && touched && <div className="invalid-feedback">{error}</div>}
            </label>
        </div>
    );
};
