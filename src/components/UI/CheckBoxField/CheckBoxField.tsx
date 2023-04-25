import React, { useContext } from 'react';
import { ThemeContext } from '../../../App';
// Styles
import './CheckBoxField.scss';

type CheckBoxFieldProps = {
    name: string;
    value: boolean;
    onChange: (e: { name: string; value: boolean }) => void;
    label: string;
    error?: string | null;
};

const CheckBoxField: React.FC<CheckBoxFieldProps> = ({ name, value, onChange, label, error }) => {
    const theme = useContext(ThemeContext);

    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    return (
        <div className={`check-${theme}`}>
            <label className={`check-${theme}__box`} htmlFor={name}>
                {label}

                <input
                    className={`check-${theme}__input`}
                    type="checkbox"
                    id={name}
                    onChange={handleChange}
                    checked={value}
                />
            </label>
            {error && <div className="invalid">{error}</div>}
        </div>
    );
};

export default CheckBoxField;
