const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();
          
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/add-careprovider', authController.addCareProvider);
router.post('/edit-careprovider/:id', authController.editCareProvider);
router.get('/delete-careprovider/:id', authController.deleteCareProvider);
router.post('/add-patient', authController.addPatient);
router.post('/edit-patient/:id', authController.editPatient);
router.get('/delete-patient/:id', authController.deletePatient);
router.post('/add-note/:patientId/:careProviderId', authController.addNote);


module.exports = router;