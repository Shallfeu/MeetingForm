import React, { useContext } from 'react';
// Components
import { DateForm } from '../../components/Form/TheForm';
// Utils
import { ThemeContext } from '../../App';
// Styles
import './Home.scss';

export const Home: React.FC = () => {
    const theme = useContext(ThemeContext);

    const handleCalculateResult = async (payload: any) => {
        console.log(payload);
    };

    return (
        <div className={`home home--${theme}`}>
            <div className="home__box">
                <h1 className="home__title">Meeting Form</h1>

                <div className="home__form">
                    <DateForm onSubmit={handleCalculateResult} />
                </div>
            </div>
        </div>
    );
};
