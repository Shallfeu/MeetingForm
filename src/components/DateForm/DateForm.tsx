import React, { useState, useEffect, useCallback } from 'react';
// Components
import { Button } from '../UI/Button/Button';
import { DatePicker } from '../UI/DatePicker/DatePicker';
import { TextField } from '../UI/TextField/TextField';
// Styles
import './DateFrom.scss';
import SelectField from '../UI/SelectField/SelectField';
import CheckBoxField from '../UI/CheckBoxField/CheckBoxField';

interface CommonData {
    country: string;
    salary: string;
    hours: string;
    date: string;
}

interface Data extends CommonData {
    sd: boolean;
}

interface Error extends CommonData {
    main: string;
}

interface DateFormProps {
    onSubmit: (e: any) => void;
}

const initialData: Data = {
    country: 'ru',
    sd: false,
    salary: '',
    hours: '8',
    date: '',
};

const initialError: Error = {
    country: '',
    salary: '',
    hours: '',
    date: '',
    main: '',
};

const countries = [
    { label: 'Россия', value: 'ru' },
    { label: 'Украина', value: 'ua' },
    { label: 'Белоруссия', value: 'by' },
    { label: 'Казахстан', value: 'kz' },
];

export const DateForm = React.memo<DateFormProps>(({ onSubmit }) => {
    const [data, setData] = useState<Data>(initialData);
    const [error, setError] = useState<Error>(initialError);

    useEffect(() => {
        validate();
    }, [data]);

    const validate = (): boolean => {
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
        country: new RegExp('[\\S\\s]+[\\S]+'),
        sd: new RegExp('[\\S\\s]+[\\S]+'),
        salary: new RegExp('^[+]?\\d+([.]\\d+)?$'),
        hours: new RegExp('^((?:[1-9]|1[0-9]|2[0-3])(?:.d{1,2})?|24(?:.00?)?)$'),
        date: new RegExp('[\\S\\s]+[\\S]+'),
    };

    const errorMessages = {
        salary: 'Введите положительное число',
        hours: 'Введите число от 1 до 24',
        date: 'Поле не должно быть пустым',
    };

    const handleChange = useCallback((target: { name: string; value: string }) => {
        setData((prevState: Data) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    }, []);

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
            <SelectField
                label="Страна"
                value={data.country}
                name="country"
                options={countries}
                error={error.country}
                onChange={handleChange}
            />

            {data.country === 'ru' && (
                <CheckBoxField label="6 дневная неделя" name="sd" value={data.sd} onChange={handleChange} />
            )}

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
});
