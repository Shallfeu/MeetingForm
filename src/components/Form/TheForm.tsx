import React, { useState, useEffect, useCallback } from 'react';
// Components
import { Button } from '../UI/Button/Button';
import { DatePicker } from '../UI/DatePicker/DatePicker';
// Styles
import './TheForm.scss';
import SelectField from '../UI/SelectField/SelectField';
import TextArea from '../UI/TextArea/TextArea';

interface CommonData {
    tower: string;
    floor: string;
    meetRoom: string;
    date: string;
    time: string;
}

interface Data extends CommonData {
    comment: string;
}

interface Error extends CommonData {
    main: string;
}

interface DateFormProps {
    onSubmit: (e: Data) => void;
}

const initialData: Data = {
    tower: '',
    floor: '',
    meetRoom: '',
    date: '',
    time: '',
    comment: '',
};

const initialError: Error = {
    tower: '',
    floor: '',
    meetRoom: '',
    date: '',
    time: '',
    main: '',
};

const towers = [
    { label: 'Tower A', value: 'a' },
    { label: 'Tower B', value: 'b' },
];

const generateConsecutiveNumbers = (min: number, max: number): { label: string; value: string }[] => {
    const result = [];
    for (let i = min; i <= max; i++) {
        result.push({ label: `${i}`, value: `${i}` });
    }
    return result;
};

const generateTime = (min: number, max: number): { label: string; value: string }[] => {
    const result = generateConsecutiveNumbers(min, max);
    return result.map((el) => ({
        label: el.label + ':00',
        value: el.value + ':00',
    }));
};

export const DateForm = React.memo<DateFormProps>(({ onSubmit }) => {
    const [data, setData] = useState<Data>(initialData);
    const [error, setError] = useState<Error>(initialError);

    useEffect(() => {
        validate();
    }, [data]);

    const validate = (): boolean => {
        Object.entries(data).forEach(([key, value]) => {
            if (!validationSchema[key as keyof typeof validationSchema]?.test(value)) {
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
        tower: new RegExp('[a-z]+'),
        floor: new RegExp('[0-9]+'),
        meetRoom: new RegExp('[0-9]+'),
        date: new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$'),
        time: new RegExp('^[0-9]{2}:[0-9]{2}$'),
    };

    const errorMessages = {
        tower: 'Cannot be empty!',
        floor: 'Cannot be empty!',
        meetRoom: 'Cannot be empty!',
        date: 'Cannot be empty!',
        time: 'Cannot be empty!',
    };

    const handleChange = useCallback((target: { name: string; value: string | boolean }) => {
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
            setError((prev) => ({ ...prev, main: 'There is some empty fields!' }));
        }
    };

    const handleClearForm = () => {
        Object.keys(data).forEach((key) => {
            handleChange({ name: key, value: '' });
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <SelectField
                label="Tower"
                value={data.tower}
                name="tower"
                options={towers}
                error={error.tower}
                onChange={handleChange}
            />

            <SelectField
                label="Floor"
                value={data.floor}
                name="floor"
                options={generateConsecutiveNumbers(3, 27)}
                error={error.floor}
                onChange={handleChange}
            />

            <SelectField
                label="Meeting Room"
                value={data.meetRoom}
                name="meetRoom"
                options={generateConsecutiveNumbers(1, 10)}
                error={error.meetRoom}
                onChange={handleChange}
            />

            <DatePicker label="Date" name="date" value={data.date} onChange={handleChange} error={error.date} />

            <SelectField
                label="Time"
                value={data.time}
                name="time"
                options={generateTime(10, 18)}
                error={error.time}
                onChange={handleChange}
            />

            <TextArea
                label="Comment"
                name="comment"
                value={data.comment}
                rows={3}
                error={null}
                onChange={handleChange}
            />

            <div className="form__controls">
                <Button type="submit" text="Submit" />
                <Button type="button" text="Clear" onClick={handleClearForm} />
            </div>

            {error.main && <div className="invalid-feedback">{error.main}</div>}
        </form>
    );
});
