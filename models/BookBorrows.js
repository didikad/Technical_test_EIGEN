const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BookBorrow extends Model {}

BookBorrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id',
      },
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'members',
        key: 'id',
      },
    },
    borrow_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    borrow_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date_book: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    penalty_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "BookBorrow",
    tableName: "book_borrow",
    timestamps: true,
  }
);

module.exports = BookBorrow;
