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
  previousWin: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  followingWin: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  interval: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
});

export default Producer;