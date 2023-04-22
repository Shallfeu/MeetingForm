import dateService from '../services/date.service';

interface Props {
    date: string;
    salary: number;
    hours: number;
}

export const calculateMoneyInHour = async (payload: Props) => {
    const { date, salary, hours } = payload;

    const month = date.split('-')[1];
    const year = date.split('-')[0];

    const monthDays: string = await dateService.getMonthDate({ year, month });
    const workingDays = monthDays.split('').reduce((acc, el) => {
        if (!+el) acc += 1;
        return acc;
    }, 0);

    const totalHoursInMonth = workingDays * hours;
    const moneyInHour = Math.round(salary / totalHoursInMonth);

    return { salary, hours, moneyInHour, totalHoursInMonth, workingDays };
};
