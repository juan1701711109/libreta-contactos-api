const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { promisify } = require('util');

const { User } = require('../database/db');

exports.register = async (body) => {
  try {
    const username = body.username;
    const password = body.password;
    let passHash = await bcryptjs.hash(password, 8);

    const newUser = {
      username: username,
      password : passHash
    }

    const user = await User.create(newUser);
    return user;
  } catch (error) {
    return error;
  }
}

exports.getUser = async (username) => {
  const user = await User.findOne({ where : {username: username}});
  return user;
}

exports.login = async (body, res) => {
  try {
    const username = body.username;
    const password = body.password;

    if(!username || !password) {
      return "Enter your username and password";
    }

    const user = await this.getUser(username);
    if(!user || !(await bcryptjs.compare(password, user.password))){
      return "Incorrect user or password";
    } else {
      const id = user.id;
      const token = jwt.sign({id:id, username: username}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRA,
      })

      console.log("TOKEN " + token + " usuario" + user);

      res.cookie('jwt', token);
      return token;
    }
  } catch (error) {
    return error;
  }
}

exports.isAuthenticated = async (req, res, next) => {
  if(req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
      const user = await User.findByPk({ where : {id: decodificada.id}});

      if(!user) {
        return next;
      } 

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  }
} 

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return 'Logout';
}