import knex from 'knex';
import knexConfig from '../../configs/db.config.js';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const db = knex(knexConfig);

const generateFileHash = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
};

export const updateCompanyPicturesService = async (id_company, newPictures) => {
  try {
    // Récupérer les images existantes pour la compagnie
    const existingPictures = await db('pictures')
      .where('company_id', id_company)
      .select('href');

    const existingPaths = existingPictures.map(picture => picture.href);
    const existingHashes = await Promise.all(existingPaths.map(async (filePath) => {
      return { path: filePath, hash: await generateFileHash(filePath) };
    }));

    const newHashes = await Promise.all(newPictures.map(async (picture) => {
      return { path: picture.path, hash: await generateFileHash(picture.path) };
    }));

    const picturesToInsert = [];

    for (const newHash of newHashes) {
      const isDuplicate = existingHashes.some(existing => existing.hash === newHash.hash) ||
        picturesToInsert.some(inserted => inserted.hash === newHash.hash);

      if (!isDuplicate) {
        const picture = newPictures.find(p => p.path === newHash.path);
        picturesToInsert.push({
          company_id: id_company,
          href: picture.path,
          alt: picture.alt || '',
          hash: newHash.hash
        });
      }
    }

    if (picturesToInsert.length === 0) {
      throw new Error('No new pictures to insert');
    }

    // Remove the hash field before inserting into the database
    const picturesData = picturesToInsert.map(({ company_id, href, alt }) => ({
      company_id,
      href,
      alt
    }));

    await db('pictures').insert(picturesData);

    return { message: 'Company pictures updated successfully' };
  } catch (error) {
    throw new Error(`Error updating company pictures: ${error.message}`);
  }
};
