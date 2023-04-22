const baseUrl = 'https://isdayoff.ru/api/getdata';

const dateService = {
    getMonthDate: async (params: { year: string; month: string }): Promise<string> => {
        const requestUrl = `${baseUrl}?year=${params.year}&month=${params.month}&pre=1`;

        const data =
            (await fetch(requestUrl)
                .then((response) => response.text())
                .catch((error) => console.error(error))) || '';

        return data;
    },
};

export default dateService;
