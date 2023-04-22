import React, { useContext, useState } from 'react';
// Components
import { DateForm } from '../../components/DateForm/DateForm';
import { ResultField, ResultFieldProps } from '../../components/ResultField/ResultField';
// Utils
import { calculateMoneyInHour } from '../../helpers/calculateMoneyInHour';
import { ThemeContext } from '../../App';
// Styles
import './Home.scss';

export const Home: React.FC = () => {
    const theme = useContext(ThemeContext);

    const [data, setData] = useState<ResultFieldProps | null>(null);

    const handleCalculateResult = async (payload: { date: string; salary: number; hours: number }) => {
        const result: ResultFieldProps = await calculateMoneyInHour(payload);
        setData(() => result);
    };

    return (
        <div className={`home home--${theme}`}>
            <div className="home__box">
                <h1 className="home__title">Расчет стоимости часа работы</h1>

                <div className="home__form">
                    <DateForm onSubmit={handleCalculateResult} />
                </div>

                <div className="home__result">{data && <ResultField {...data} />}</div>
            </div>
        </div>
    );
};
