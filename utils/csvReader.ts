// de doc file va xu ly file thi can import cac lib sau:
// fs/promises
// path -> tim duong dan tuyet doi
// csv-parse -> de phan tich file csv
import { readFile } from "fs/promises";
import {join} from "path";
import { parse } from "csv-parse/sync";

// dinh nghia du lieu co trong file csv
export interface LoginData {
    username: string;
    password: string;
    expected_result: string;
    description: string;
}

export const readFileFromCsv = async (): Promise<LoginData[]> => {
    // B1: xac dinh duong dan file csv
    // ../data/login-data.csv
    // __dirname: xac dinh path cua file hien tai(csvReader.ts)
    const csvPath = join(__dirname, '..', 'data', 'login-data.csv');

    // B2: doc file csv
    const fileContent = await readFile(csvPath);

    // B3: parse data string => list LoginData
    const data = parse(fileContent, {
        columns: true, // lay dong dau lam header, lam Key
        skip_empty_lines: true, // bo qua nhung line data bi trong
        trim: true, // bo khoang trang thua
    }) as LoginData[];

    return data;
}