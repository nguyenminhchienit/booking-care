'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorInfo.belongsTo(models.User, {foreignKey: 'doctorId'})

      DoctorInfo.belongsTo(models.Allcode, {foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData'})
      DoctorInfo.belongsTo(models.Allcode, {foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData'})
      DoctorInfo.belongsTo(models.Allcode, {foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData'})
    }
  };

  DoctorInfo.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    count: DataTypes.INTEGER,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DoctorInfo',
  });
  return DoctorInfo;
};