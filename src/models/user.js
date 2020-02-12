'use strict';
const bcrypt = require( 'bcrypt' );

const { NAME_PATTERN, SALT_ROUND } = require( '../constants' );

module.exports = (sequelize, DataTypes) => {

  const nameAttribute = {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: NAME_PATTERN,
    }
  };

  const User = sequelize.define( 'User', {
    firstName: nameAttribute,
    lastName: nameAttribute,

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
      unique: true,
    }
  }, {} );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};