const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, //ให้สร้างค่า id โดยอัตโนมัติเมื่อมีการเพิ่มข้อมูลใหม่
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "Users", // ชื่อตารางในฐานข้อมูล
    timestamps: false, // ไม่ต้องการฟิลด์เวลาสร้างและอัปเดต
  }
);

module.exports = User;
