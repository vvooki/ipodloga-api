const jwt = require('jsonwebtoken');

// do zapytań dla zalogowanych użytkowników
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);
  if (authHeader) {
    //deleting Bearer keyword from token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        //status 403 - forbidden
        return res.status(403).json('Token is not valid!');
      }
      req.user = user;
      next();
    });
  } else {
    //status 401 - unauthenticated
    return res.status(401).json('You are not authenticated!');
  }
};

// gdy chcemy sprawdzić czy user na pewno modyfikuje tylko swoje dane
// (np. user chce zaktualizować swój indeks to może zaktualizować tylko swój a nie innego usera)
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log('authorize', req.user.id, req.params.id);
    if (req.user.id === parseInt(req.params.id) || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('you are not allowed to do that!');
    }
  });
};

// do zapytań tylko dla admina (np. usuwanie dowolnego usera)
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('you are not allowed to do that!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
