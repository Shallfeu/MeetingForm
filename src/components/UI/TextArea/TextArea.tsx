import React from 'react';
// Styles
import './TextArea.scss';

type TextAreaProps = {
    label: string;
    name: string;
    value: string;
    rows: number;
    error: string | null;
    onChange: (e: any) => void;
};

const TextArea: React.FC<TextAreaProps> = ({ label, name, rows, value, error, onChange }) => {
    const handleChange = ({ target }: any) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="text-area">
            <label className="text-area__label" htmlFor={label}>
                {label}
            </label>
            <div className="text-area__area">
                <textarea
                    className="text-area__input"
                    id="exampleFormControlTextarea1"
                    rows={rows}
                    name={name}
                    value={value}
                    onChange={handleChange}
                ></textarea>
                {error && <div className="invalid">{error}</div>}
            </div>
        </div>
    );
};

export default TextArea;
