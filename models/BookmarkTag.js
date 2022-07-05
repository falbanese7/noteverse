const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class BookmarkTag extends Model {}

BookmarkTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bookmark_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bookmark',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    },
    tag_title: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'tag_name'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bookmark_tag',
  }
);

module.exports = BookmarkTag;
