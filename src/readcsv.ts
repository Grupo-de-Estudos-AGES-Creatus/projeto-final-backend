import { parse } from 'csv-parse';
import * as path from 'path';
import * as fs from 'fs';

/* Isso é um exemplo, pra aplicar no programa de vdd muda o tipo conforme o necessario mas tmb tem q ajeitar o typeCast/parse la no parse 
,mudar o path do arquivo .csv e ajeitar o nome das colunas */

type application = {
    index: number,
    customer_id: string,
    first_name: string,
    last_name: string,
    company: string,
    city: string,
    country: string,
    phone1: string,
    phone2: string,
    email: string,
    subscription_date: string,
    website: string
};

function lerCSV() {
    const pathName = path.resolve(__dirname, 'customers-100.csv');

    const colunas = ['index', 'customer_id', 'first_name', 'last_name', 'company', 'city', 'country', 'phone1', 'phone2', 'email', 'subscription_date', 'website'];

    try {
        const file = fs.readFileSync(pathName, { encoding: 'utf-8' });

        parse(file, {
            delimiter: ',',
            columns: colunas,
            fromLine: 2,
            cast: (value, context) => {
                if (context.column === 'index') {
                    return parseInt(value);
                } else if (context.column === 'subscription_date') {
                    return new Date(value);
                }
                return value;

            }
        }, (error, result: application[]) => {
            if (error) {
                console.error(error);
            }

            console.log("Result", result);
        });

    } catch (error) {
        console.error(error);
    }
}

lerCSV();