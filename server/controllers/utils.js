import fs from 'fs';
import path from 'path';

export function parseQueryParams(querys) {
    const query = {};

    for (const [key, value] of Object.entries(querys)) {
        if (value) {
            query[key] = { $regex: value, $options: "i" };
        }
    }
    return query;
}

export const handleError = (res, error, code) => {
    console.error(code);
    console.error(error);
    return res.status(code).json({ error });
};

export const getImagesFromFolder = (folderPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                return reject(err);
            }

            const images = files
                .filter(
                    (file) =>
                        file.endsWith(".png") ||
                        file.endsWith(".jpg") ||
                        file.endsWith(".jpeg") ||
                        file.endsWith(".gif")
                )
                .map((file) => path.join(folderPath, file));
            resolve(images);
        });
    });
};
