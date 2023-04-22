import React from 'react';
// Styles
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset' | undefined;
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    type = 'button',
    text,
    children,
    className = 'button',
    onClick,
    disabled,
}) => {
    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
            {text}
            {children}
        </button>
    );
};
