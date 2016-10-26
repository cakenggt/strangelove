module.exports = function(sequelize, DataTypes) {

  /**
   * All of your model definitions go here.
   * Return an object where each key is a model
   * name and the value is the result of sequelize.define
   * Don't forget to use the provided DataTypes object to define
   * your column data types
   */

   const User = sequelize.define('user', {
     email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
       validate: {
         isEmail: true,
         notEmpty: true
       }
     },
     password: {
       type: DataTypes.STRING,
       allowNull: false
     },
     totpSecret: {
       type: DataTypes.STRING
     },
     status: {
       type: DataTypes.ENUM('PENDING', 'ACTIVE'),
       allowNull: false
     },
     store: {
       type: DataTypes.TEXT
     },
     lastLoginFail: {
       type: DataTypes.DATE
     }
   });

   return {
     sequelize: sequelize,
     User: User
   };
};
