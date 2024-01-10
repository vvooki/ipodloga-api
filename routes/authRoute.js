const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const {
  checkIfEmailAlreadyExists,
  addStudent,
  getStudentByEmail,
} = require('../services/studentsService');

router.post('/register', async (req, res) => {
  try {
    try {
      const {
        email,
        firstName,
        lastName,
        isFullTime,
        indexNumber,
        isAdmin,
        password,
      } = req.body;
      const check = await checkIfEmailAlreadyExists(email);

      console.log(req.body);
      console.log(check);

      if (check.length > 0) {
        return res.status(401).json('User with this email already exists');
      } else {
        const hashedPassword = CryptoJS.SHA3(password, {
          outputLength: 512,
        }).toString();

        const newUser = {
          email,
          firstName,
          lastName,
          indexNumber,
          isFullTime,
          isAdmin,
          password: hashedPassword,
        };

        const id = await addStudent(newUser);

        res.status(201).json({ id, ...newUser });
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getStudentByEmail(email);
    try {
      if (user.length === 0) {
        console.log('jest user');
        return res.status(401).json('Wrong credentials');
      }

      const originalPassword = user.password;
      const inputPassword = CryptoJS.SHA3(password, {
        outputLength: 512,
      }).toString();

      if (originalPassword !== inputPassword) {
        return res.status(401).json('Wrong credentials!');
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: '3d' },
      );

      res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        indexNumber: user.indexNumber,
        isFullTime: user.isFullTime,
        isAdmin: user.isAdmin,
        accessToken,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
