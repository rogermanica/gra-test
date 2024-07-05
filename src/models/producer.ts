import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Producer = sequelize.define('producer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  winner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Producer;