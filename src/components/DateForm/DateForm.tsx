import { useState, useEffect } from 'react';
// Components
import { Button } from '../UI/Button/Button';
import { DatePicker } from '../UI/DatePicker/DatePicker';
import { TextField } from '../UI/TextField/TextField';
// Styles
import './DateFrom.scss';

interface Data {
    salary: string;
    hours: string;
    date: string;
}

interface Error {
    salary: string;
    hours: string;
    date: string;
    main: string;
}

const initialData = {
    salary: '',
    hours: '8',
    date: '',
};

const initialError = {
    salary: '',
    hours: '',
    date: '',
    main: '',
};

interface DateFormProps {
    onSubmit: (e: any) => void;
}

export const DateForm: React.FC<DateFormProps> = ({ onSubmit }) => {
    const [data, setData] = useState<Data>(initialData);
    const [error, setError] = useState<Error>(initialError);

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        Object.entries(data).forEach(([key, value]) => {
            if (!validationSchema[key as keyof typeof validationSchema].test(value)) {
                setError((prev) => ({ ...prev, [key]: errorMessages[key as keyof typeof errorMessages] }));
            } else {
                setError((prev) => ({ ...prev, [key]: '', main: '' }));
            }
        });

        let check = false;
        Object.values(error).forEach((el) => {
            if (el && !check) {
                check = true;
            }
        });

        return check;
    };

    const validationSchema = {
        salary: new RegExp('^[+]?\\d+([.]\\d+)?$'),
        hours: new RegExp('^((?:[1-9]|1[0-9]|2[0-3])(?:.d{1,2})?|24(?:.00?)?)$'),
        date: new RegExp('[\\S\\s]+[\\S]+'),
    };

    const errorMessages = {
        salary: 'Введите положительное число',
        hours: 'Введите число от 1 до 24',
        date: 'Поле не должно быть пустым',
    };

    const handleChange = (target: { name: string; value: string }) => {
        setData((prevState: Data) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (!validate()) {
            onSubmit(data);
        } else {
            setError((prev) => ({ ...prev, main: 'Заполните поля!' }));
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <TextField
                label="Зарплата"
                name="salary"
                value={data.salary}
                onChange={handleChange}
                error={error.salary}
            />

            <TextField
                label="Кол-во часов на 1 день"
                name="hours"
                value={data.hours}
                onChange={handleChange}
                error={error.hours}
            />

            <DatePicker label="Месяц" name="date" value={data.date} onChange={handleChange} error={error.date} />

            <Button type="submit" text="Расчитать" />

            {error.main && <div className="invalid-feedback">{error.main}</div>}
        </form>
    );
};
