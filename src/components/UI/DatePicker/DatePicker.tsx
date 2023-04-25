import { useState } from 'react';
// Styles
import './DatePicker.scss';

type DatePickerProps = {
    label: string;
    name: string;
    value: string;
    error: string | null;
    onChange: (e: { name: string; value: string }) => void;
};

export const DatePicker: React.FC<DatePickerProps> = ({ label, name, value, error, onChange }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <label htmlFor={name} className="datepicker">
            {label}
            <input
                id={name}
                type="month"
                name={name}
                onChange={handleChange}
                value={value}
                onBlur={() => setTouched(true)}
                className="datepicker__input"
            />
            {error && touched && <div className="invalid-feedback">{error}</div>}
        </label>
    );
};
