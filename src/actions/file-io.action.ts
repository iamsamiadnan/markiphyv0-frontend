'use server';

import path from 'path';
import fs from 'fs/promises';

export async function saveJsonToFile(data: any, filename: string) {
    const json = JSON.stringify(data);
    const filePath = path.join(process.cwd(), 'output', filename);
    await fs.writeFile(filePath, json);
    return { success: true };
}

export async function readJsonFromFile(filename: string): Promise<any> {
    const filePath = path.join(process.cwd(), 'output', filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
}

export async function updateJsonFile(filename: string, updatedAnswers: any[]) {
    const filePath = path.join(process.cwd(), 'output', filename);
    const fullData = await readJsonFromFile(filename);

    const updatedMap = new Map(
        updatedAnswers.map((item) => [item.serial, item.answers])
    );

    fullData.results = fullData.results.map((item: any) => {
        if (item.serial && updatedMap.has(item.serial)) {
            return {
                ...item,
                answers: updatedMap.get(item.serial),
            };
        }
        return item;
    });

    fullData.isRechecked = true;
    await fs.writeFile(filePath, JSON.stringify(fullData, null, 2), 'utf-8');
}
