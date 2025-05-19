'use server';

import path from 'path';
import fs from 'fs/promises';

export async function saveJsonToFile(data: any, filename: string) {
    const json = JSON.stringify(data);
    const filePath = path.join(process.cwd(), 'output', filename);
    await fs.writeFile(filePath, json);
    return { success: true };
}
