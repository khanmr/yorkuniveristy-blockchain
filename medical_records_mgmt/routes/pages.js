const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/careproviders', authController.isLoggedIn, authController.getCareProviders, (req, res) => {
  if( req.user ) {
    res.render('careproviders', {
      user: req.user,
      careproviders: req.careproviders
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/add-careprovider', authController.isLoggedIn, (req, res) => {
  if( req.user ) {
    res.render('add-careprovider', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/edit-careprovider/:id', authController.isLoggedIn, authController.getCareProvider, (req, res) => {
  if( req.user ) {
    res.render('edit-careprovider', {
      user: req.user,
      careprovider: req.careprovider
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/patients', authController.isLoggedIn, authController.getPatients, (req, res) => {
  if( req.user ) {
    res.render('patients', {
      user: req.user,
      patients: req.patients
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/add-patient', authController.isLoggedIn, (req, res) => {
  if( req.user ) {
    res.render('add-patient', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/edit-patient/:id', authController.isLoggedIn, authController.getPatient, (req, res) => {
  if( req.user ) {
    res.render('edit-patient', {
      user: req.user,
      patient: req.patient
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/view-patient/:id', authController.isLoggedIn, authController.viewPatient, (req, res) => {
  if( req.user ) {
    res.render('view-patient', {
      user: req.user,
      patient: req.patient
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/search-patient', authController.isLoggedIn, authController.searchPatient, (req, res) => {
  if( req.user ) {
    res.render('search-patient', {
      user: req.user,
      patient: req.patient
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/search-careprovider', authController.isLoggedIn, authController.searchCareProvider, (req, res) => {
  if( req.user ) {
    res.render('search-careprovider', {
      user: req.user,
      careprovider: req.careprovider
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/add-note/:id', authController.isLoggedIn, (req, res) => {
  if( req.user ) {
    res.render('add-note', {
      user: req.user,
      patientId: req.params.id
    });
  } else {
    res.redirect('/login');
  } 
});

router.get('/view-notes/:id', authController.isLoggedIn, authController.getNotes, (req, res) => {
  if( req.user ) {
    res.render('view-notes', {
      user: req.user,
      notes: req.notes,
      patient: req.patient,
      patientId: req.params.id
    });
  } else {
    res.redirect('/login');
  } 
});


module.exports = router;