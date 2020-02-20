'use strict';
const bcrypt = require( 'bcrypt' );

const { NAME_PATTERN, SALT_ROUND } = require( '../constants' );

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define( 'User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_PATTERN,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_PATTERN,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'passwordHash',
      set (value) {
        this.setDataValue( 'password', bcrypt.hashSync( value, SALT_ROUND ) );
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {} );
  User.associate = function (models) {
    User.hasMany( models.Task, {
      foreignKey: 'userId',
    } );
  };

  User.sendData = (req, res, next) => {
    res.send( req.user );
  };

  return User;
};