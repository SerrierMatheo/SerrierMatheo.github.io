import express from 'express';
import multer from 'multer';
import path from 'path';

import getUserInfoAction from '../actions/getUserInfoAction.js';
import updateUserPictureAction from '../actions/updateUserPictureAction.js';
import getUserPictureAction from '../actions/getUserPictureAction.js';
import getUserCvAction from '../actions/getUserCvAction.js';
import updateUserCvAction from '../actions/updateUserCvAction.js';
import updateUserInfosAction from '../actions/updateUserInfosAction.js'

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

// Configuration de multer pour les CV sans filtre de type de fichier
const storageCv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cvs');
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

const uploadCvs = multer({
  storage: storageCv,
  fileFilter: fileFilterPDFS,
  limits: {
    fileSize: 1024 * 1024 * 10 // Limite la taille des fichiers à 10 MB
  }
});

// Route pour l'upload de l'image de profil
router.post('/profile/:id_user/upload_picture', uploadPictures.single('file'), (req, res, next) => {
  console.log('File:', req.file); // Ajoutez ce log pour vérifier le contenu de req.file
  updateUserPictureAction(req, res, next);
});

// Route pour l'upload du CV
router.post('/profile/:id_user/upload_cv', uploadCvs.single('file'), (req, res, next) => {
  console.log('Inside route handler');
  console.log('File:', req.file); // Ajoutez ce log pour vérifier le contenu de req.file
  console.log('Body:', req.body); // Ajoutez ce log pour vérifier le contenu de req.body
  updateUserCvAction(req, res, next);
});

// Route pour récupérer l'image de l'utilisateur
router.get('/profile/:id/picture', getUserPictureAction);

// Route pour récupérer le CV de l'utilisateur
router.get('/profile/:id_user/cv', getUserCvAction);

// Autres routes
router.route('/profile').all((req, res, next) => next(405));

router
  .route('/profile/:id')
  .get(getUserInfoAction)
  .put(updateUserInfosAction)
  .all((req, res, next) => next(405));

export default router;
