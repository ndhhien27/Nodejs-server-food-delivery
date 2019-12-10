import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  const authToken = req.get('Authorization');
  if (!authToken) {
    req.isAuth = false;
    return next();
  }

  const token = authToken.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  // let decodedToken;
  try {
    const decodedToken = verify(token, process.env.SECRET_KEY);
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next()
  } catch (err) {
    req.isAuth = false;
    return next();
  }
}