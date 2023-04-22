import React from 'react';
// Styles
import './ResultField.scss';

export interface ResultFieldProps {
    salary: number;
    hours: number;
    moneyInHour: number;
    totalHoursInMonth: number;
    workingDays: number;
}

export const ResultField: React.FC<ResultFieldProps> = (props) => {
    const { salary, hours, moneyInHour, totalHoursInMonth, workingDays } = props;

    return (
        <div className="result">
            <h2>Рассчет</h2>
            <ul className="result__list">
                <li className="result__item">
                    Зарплата в месяц: <span>{salary}</span>
                </li>
                <li className="result__item">
                    Кол-во часов в день: <span>{hours}</span>
                </li>
                <li className="result__item">
                    Рабочих дней: <span>{workingDays}</span>
                </li>
                <li className="result__item">
                    Кол-во часов в месяц: <span>{totalHoursInMonth}</span>
                </li>
                <li className="result__item">
                    Зарплата в час: <span>{moneyInHour}</span>
                </li>
            </ul>
        </div>
    );
};
