import config from '../config.json';

const baseUrl = config.apiEndPoint + '/getdata';

const dateService = {
    getMonthDate: async (params: { year: string; sd: boolean; month: string; country: string }): Promise<string> => {
        const { year, sd, month, country } = params;

        const requestUrl = `${baseUrl}?year=${year}&month=${month}&cc=${country}&sd=${sd ? 1 : 0}`;

        const data =
            (await fetch(requestUrl)
                .then((response) => response.text())
                .catch((error) => console.error(error))) || '';

        return data;
    },
};

export default dateService;
