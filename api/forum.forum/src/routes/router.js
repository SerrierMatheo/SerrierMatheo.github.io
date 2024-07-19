import express from 'express';
import multer from 'multer';
import path from 'path';

import getAllCompanyAction from '../actions/companies/getAllCompanyAction.js'
import getCompanyByIdAction from '../actions/companies/getCompanyByIdAction.js'
import deleteCompanyByIdAction from '../actions/companies/deleteCompanyByIdAction.js'
import createCompanyAction from '../actions/companies/createCompanyAction.js'
import updateCompanyAction from '../actions/companies/updateCompanyAction.js'
import getAllTagsService  from '../actions/tags/getAllTagsAction.js'
import getTagsByCompanyIdAction from '../actions/tags/getTagsByCompanyIdAction.js'
import createTagByCompanyAction from '../actions/tags/createTagByCompanyAction.js'
import deleteTagAction from '../actions/tags/deleteTagAction.js'
import updateTagAction from '../actions/tags/updateTagAction.js'
import deleteCompanyTagAction from '../actions/tags/deleteCompanyTagAction.js'
import getSectionByIdAction from '../actions/sections/getSectionByIdAction.js'
import getSectionsByCompanyIdAction from '../actions/sections/getSectionsByCompanyIdAction.js'
import deleteSectionAction from '../actions/sections/deleteSectionAction.js'
import createSectionAction from '../actions/sections/createSectionAction.js'
import updateSectionAction from '../actions/sections/updateSectionAction.js'
import addTagToCompanyAction from '../actions/tags/addTagToCompanyAction.js'
import getCompanyLogoAction from '../actions/companies/getCompanyLogoAction.js'
import updateCompanyLogoAction from '../actions/companies/updateCompanyLogoAction.js'
import updateCompanyBackgroundAction from '../actions/companies/updateCompanyBackgroundAction.js'
import getCompanyBackgroundAction from '../actions/companies/getCompanyBackgroundAction.js'
import updateCompanyPicturesAction from '../actions/pictures/updateCompanyPicturesAction.js'
import deleteCompanyPictureByIdAction from '../actions/pictures/deleteCompanyPictureByIdAction.js'
import getCompanyPicturesAction from '../actions/pictures/getCompanyPicturesAction.js'
import updateCompanyOffersAction from '../actions/offers/updateCompanyOffersAction.js'
import deleteCompanyOfferAction from '../actions/offers/deleteCompanyOfferAction.js'
import getCompanyOffersAction from '../actions/offers/getCompanyOffersAction.js'
import getCompanyIntervenantAction from '../actions/companies/getCompanyIntervenantAction.js';
import getCompanyPictureByIdAction from '../actions/pictures/getCompanyPictureByIdAction.js';

const router = express.Router();

// Configuration de multer avec un filtre pour les images
const storagePictures = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pictures');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilterPictures = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const uploadPictures = multer({
  storage: storagePictures,
  fileFilter: fileFilterPictures,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limite la taille des fichiers à 5 MB
  }
});

router.post('/company/:id_company/upload_logo', uploadPictures.single('file'), (req, res, next) => {
  console.log('file:', req.file);
  updateCompanyLogoAction(req, res, next);
});

router.post('/company/:id_company/upload_background', uploadPictures.single('file'), (req, res, next) => {
  console.log('file:', req.file);
  updateCompanyBackgroundAction(req, res, next);
});

router.get('/company/:id_company/logo', getCompanyLogoAction);
router.get('/company/:id_company/background', getCompanyBackgroundAction);

router.post('/company/:id_company/pictures', uploadPictures.array('files', 10), (req, res, next) => {
  console.log('files:', req.files);
  updateCompanyPicturesAction(req, res, next)
});

router.get('/company/:id_company/pictures', (req, res, next) => {
  getCompanyPicturesAction(req, res, next);
});

router.get('/company/:id_company/picture/:id_picture',getCompanyPictureByIdAction);

router.delete('/company/:id_company/picture/:id_picture', (req, res, next) => {
  deleteCompanyPictureByIdAction(req, res, next);
});


// Configuration de multer pour les CV sans filtre de type de fichier
const storageOffers = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/offers');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilterPDFS = (req, file, cb) => {
  const fileTypes = /pdf|x-pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only pdf are allowed'));
  }
};

const uploadOffers = multer({
  storage: storageOffers,
  fileFilter: fileFilterPDFS,
  limits: {
    fileSize: 1024 * 1024 * 10 // Limite la taille des fichiers à 10 MB
  }
});

router.post('/company/:id_company/offers', uploadOffers.array('files', 1), (req, res, next) => {
  console.log('files:', req.files);
  updateCompanyOffersAction(req, res, next);
});

router.get('/company/:id_company/offers', (req, res, next) => {
  getCompanyOffersAction(req, res, next);
});

router.delete('/company/:id_company/offer/:id_offer', (req, res, next) => {
  deleteCompanyOfferAction(req, res, next);
});

router
  .route("/company")
  .get(getAllCompanyAction) //permet de récupérer la liste des company inscrite
  .post(createCompanyAction) //permet de créer une company en fournissant son nom uniquement (admin)
  .all((req, res, next) => next(405));

router
  .route("/company/:id")
  .get(getCompanyByIdAction) //récupére les données de la company d'id :id
  .put(updateCompanyAction) //permet de mettre à jour les données de cette company (entervenant/admin)
  .delete(deleteCompanyByIdAction) //permet de supprimer cette company (admin)
  .all((req, res, next) => next(405));

router
  .route("/tags")
  .get(getAllTagsService) //permet de récupérer l'ensemble des tags enregistrer dans l'appli
  .all((req, res, next) => next(405));

router
  .route("/tags/:id")
  .put(updateTagAction) //permet de renommer un tag (admin)
  .delete(deleteTagAction) //permet de supprimer totalement un tag (admin)
  .all((req, res, next) => next(405));

router
  .route("/company/:id/tags")
  .get(getTagsByCompanyIdAction) //Route pour récupérer la liste des tags affecté à l'entreprise ayant fourni son id
  .all((req, res, next) => next(405));

router
  .route("/company/:id/tags/new")
  .post(createTagByCompanyAction) //créer un tag et l'associe à l'entreprise qui l'a créé
  .all((req, res, next) => next(405));

router
  .route("/company/:companyId/tags/add")
  .post(addTagToCompanyAction)
  .all((req, res, next) => next(405));

router
  .route("/company/:companyId/tags/:tagId")
  .delete(deleteCompanyTagAction) //permet à une entreprise de retirer ce tag de sa liste de tags
  .all((req, res, next) => next(405));

router
  .route("/sections/:sectionId")
  .get(getSectionByIdAction) //permet de récupérer une section + son image par l'id de la section en params
  .delete(deleteSectionAction) //permet de supprimer une section dont l'id est en params
  .put(updateSectionAction) //permet de modifier le texte et/ou l'image de la section dont l'id est en params
  .all((req, res, next) => next(405));

router
  .route("/company/:companyId/sections")
  .get(getSectionsByCompanyIdAction) //permet de récupérer toutes les section d'une entreprise dont l'id est en params
  .post(createSectionAction) //permet à une entreprise de créer une section, y ajouter l'image est obligatoire
  .all((req, res, next) => next(405));

router
  .route("/company/:id_company/intervenants")
  .get(getCompanyIntervenantAction) //permet de récupérer la liste des intervenants d'une entreprise
  .all((req, res, next) => next(405));


export default router;