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

export const updateCompanyOffersService = async (id_company, newOffers) => {
  try {
    // Récupérer les offres existantes pour la compagnie
    const existingOffers = await db('offers')
      .where('company_id', id_company)
      .select('file');

    const existingPaths = existingOffers.map(offer => offer.file);
    const existingHashes = await Promise.all(existingPaths.map(async (filePath) => {
      return { path: filePath, hash: await generateFileHash(filePath) };
    }));

    const newHashes = await Promise.all(newOffers.map(async (offer) => {
      return { path: offer.path, hash: await generateFileHash(offer.path) };
    }));

    const offersToInsert = [];

    for (const newHash of newHashes) {
      const isDuplicate = existingHashes.some(existing => existing.hash === newHash.hash) ||
        offersToInsert.some(inserted => inserted.hash === newHash.hash);

      if (!isDuplicate) {
        const offer = newOffers.find(o => o.path === newHash.path);
        offersToInsert.push({
          company_id: id_company,
          file: offer.path,
          title: offer.title || '',
          type: offer.type || '',
          hash: newHash.hash
        });
      }
    }

    if (offersToInsert.length === 0) {
      throw new Error('No new offers to insert');
    }

    // Remove the hash field before inserting into the database
    const offersData = offersToInsert.map(({ company_id, file, title, type }) => ({
      company_id,
      file,
      title,
      type
    }));

    await db('offers').insert(offersData);

    return { message: 'Company offers updated successfully' };
  } catch (error) {
    throw new Error(`Error updating company offers: ${error.message}`);
  }
};
