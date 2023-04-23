import dateService from '../services/date.service';

export interface HelperProps {
    country: string;
    sd: boolean;
    date: string;
    salary: number;
    hours: number;
}

export const calculateMoneyInHour = async (payload: HelperProps) => {
    const { country, sd, date, salary, hours } = payload;

    const month = date.split('-')[1];
    const year = date.split('-')[0];

    const monthDays: string = await dateService.getMonthDate({ country, sd, year, month });
    const workingDays = monthDays.split('').reduce((acc, el) => {
        if (!+el) acc += 1;
        return acc;
    }, 0);

    const totalHoursInMonth = workingDays * hours;
    const moneyInHour = Math.round(salary / totalHoursInMonth);

    return { salary, hours, moneyInHour, totalHoursInMonth, workingDays };
};
