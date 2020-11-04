const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if( !username || !password ) {
      return res.status(400).render('login', {
        message: 'Please provide a username and password'
      })
    }

    db.query('SELECT * FROM users WHERE is_active = 1 AND username = ?', [username], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
        res.status(401).render('login', {
          message: 'Username or Password is incorrect.'
        })
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/profile");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.register = (req, res) => {
  console.log(req.body);

  const { name, username, password, passwordConfirm } = req.body;

  db.query('SELECT username FROM users WHERE is_active = 1 AND username = ?', [username], async (error, results) => {
    if(error) {
      console.log(error);
    }

    if( results.length > 0 ) {
      return res.render('register', {
        message: 'That username is already in use.'
      })
    } else if( password !== passwordConfirm ) {
      return res.render('register', {
        message: 'Passwords do not match.'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ?', {name: name, username: username, password: hashedPassword, is_admin: 1}, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('register', {
          message: 'User registered successfully.'
        });
      }
    })


  });

}

exports.addCareProvider = (req, res) => {
  console.log(req.body);

  const { name, username, password } = req.body;

  db.query('SELECT username FROM users WHERE is_active = 1 AND username = ?', [username], async (error, results) => {
    if(error) {
      console.log(error);
    }

    if( results.length > 0 ) {
      return res.render('add-careprovider', {
        message: 'That username is already in use.'
      })
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ?', [{name: name, username: username, password: hashedPassword}], (error, results) => {
      if(error) {
        console.log(error);
      }
      res.redirect('/careproviders');
    });


  });

}

exports.getCareProviders = (req, res, next) => {
  let query = "SELECT * FROM users WHERE is_admin = 0 AND is_active = 1 ORDER BY id";

        db.query(query, (err, result) => {
          if (err) {
              console.log(error);
            }
          req.careproviders = result;
          return next();
        });

}

exports.getCareProvider = (req, res, next) => {
  const careProviderId = req.params.id;

        db.query("SELECT * FROM users WHERE is_active = 1 AND id = ?", [careProviderId], (err, result) => {
          if (err) {
              console.log(error);
            }
            req.careprovider = result[0];
            return next();
        });

}

exports.editCareProvider = (req, res) => {
  const careProviderId = req.params.id;
  const name = req.body.name;

        db.query("UPDATE users SET ? WHERE id = ?", [{name: name}, careProviderId], (err, result) => {
          if (err) {
              console.log(error);
            }
            res.redirect('/careproviders');
        });

}

exports.deleteCareProvider = (req, res) => {
  const careProviderId = req.params.id;

        db.query("UPDATE users SET is_active = 0 WHERE id = ?", [careProviderId], (err, result) => {
          if (err) {
              console.log(error);
            }
            res.redirect('/careproviders');
        });

}

exports.addPatient = (req, res) => {

  const { first_name, last_name, email, dob, gender, health_card } = req.body;

  db.query('SELECT email FROM patients WHERE email = ?', [email], (error, results) => {
    if(error) {
      console.log(error);
    }

    if( results.length > 0 ) {
      return res.render('add-patient', {
        message: 'Patient with that email already exists.'
      })
    }

    db.query('INSERT INTO patients SET ?', [{first_name: first_name, last_name: last_name, email: email, date_of_birth: dob, gender: gender, health_card: health_card}], (error, results) => {
      if(error) {
        console.log(error);
      } 
      res.redirect('/patients');
    })


  });

}

exports.getPatients = (req, res, next) => {
  let query = "SELECT * FROM patients ORDER BY id";

        db.query(query, (err, result) => {
          if (err) {
              console.log(error);
          }
          req.patients = result;
          return next();
        });

}

exports.getPatient = (req, res, next) => {
  const patientId = req.params.id;

        db.query("SELECT id, first_name, last_name, email, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS dob, gender, health_card FROM patients WHERE id = ?", [patientId], (err, result) => {
          if (err) {
              console.log(error);
            }
            req.patient = result[0];
            return next();
        });

}

exports.viewPatient = (req, res, next) => {
  const patientId = req.params.id;

        db.query("SELECT id, first_name, last_name, email, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS dob, FLOOR(DATEDIFF(NOW(), date_of_birth)/365) AS age, gender, health_card FROM patients WHERE id = ?", [patientId], (err, result) => {
          if (err) {
              console.log(error);
            }
            req.patient = result[0];
            return next();
        });

}

exports.editPatient = (req, res) => {
  const patientId = req.params.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const health_card = req.body.health_card;

        db.query("UPDATE patients SET ? WHERE id = ?", [{first_name: first_name, last_name: last_name, email: email, date_of_birth: dob, gender: gender, health_card: health_card}, patientId], (err, result) => {
          if (err) {
              console.log(error);
            }
            res.redirect('/patients');
        });

}

exports.deletePatient = (req, res) => {
  const patientId = req.params.id;

        db.query("DELETE FROM patients WHERE id = ?", [patientId], (err, result) => {
          if (err) {
              console.log(error);
            }
            res.redirect('/patients');
        });

}

exports.addNote = (req, res) => {
  const patientId = req.params.patientId;
  const careProviderId = req.params.careProviderId;
  const note = req.body.note;

        db.query("INSERT INTO notes SET ?", [{patient_id: patientId, care_provider_id: careProviderId, note: note}], (err, result) => {
          if (err) {
              console.log(error);
            }
            res.redirect('/patients');
        });

}

exports.getNotes = (req, res, next) => {
  const patientId = req.params.id;

        db.query("SELECT n.note AS note, u.name AS care_provider, p.id AS pId, p.first_name AS first_name, p.last_name AS last_name, DATE_FORMAT(n.last_update, '%Y-%m-%d') AS note_date FROM notes AS n JOIN patients AS p ON p.id = n.patient_id JOIN users AS u ON u.id = n.care_provider_id WHERE n.patient_id = ? ORDER BY note_date DESC", [patientId], (err, result) => {
          if (err) {
              console.log(error);
            }
            if(!result) {
              return next();
            }
            req.notes = result;
            req.patient = result[0];
            return next();
        });
        
}

exports.searchPatient = (req, res, next) => {
  const health_card = req.query.q;

        db.query("SELECT * FROM patients WHERE health_card = ?", [health_card], (err, result) => {
          if (err) {
              console.log(error);
            }
            req.patient = result[0];
            return next();
        });

}

exports.searchCareProvider = (req, res, next) => {
  const careProvider = req.query.q;

        db.query("SELECT * FROM users WHERE is_active = 1 AND id = ?", [careProvider], (err, result) => {
          if (err) {
              console.log(error);
            }
            req.careprovider = result[0];
            return next();
        });

}

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if( req.cookies.jwt) {
    try {
      // verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
      process.env.JWT_SECRET
      );

      // check if the user still exists
      db.query('SELECT * FROM users WHERE is_active = 1 AND id = ?', [decoded.id], (error, result) => {

        if(!result) {
          return next();
        }

        req.user = result[0];
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
}