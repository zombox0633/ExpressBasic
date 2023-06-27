const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const User = require("../../usersDB");

//Get all users
router.get("/", async (request, response) => {
  try {
    const users = await User.findAll();
    response.json(users);
  } catch (error) {
    console.log("Failed to fetch users:", error.message);
    response.status(500).json({ message: "Failed to fetch users." });
  }
});

//Get single user
router.get("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }
    response.json(user);
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}:`, error);
    response.status(500).json({ message: "Failed to fetch user." });
  }
});

// create users
// Sequelize จะทำการกำหนดค่า id ให้อัตโนมัติตามที่กำหนดของ MySQL และ autoIncrement ของ Sequelize
// router.post('/', async (request, response) => {
//   try {
//     const { name, email } = request.body;

//     // ตรวจสอบว่ามีอีเมล์ที่ซ้ำกับข้อมูลที่มีอยู่แล้วหรือไม่
//     const existingUser = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       // ถ้ามีอีเมล์ที่ซ้ำกันแล้ว
//       response.status(400).json({ message: 'This email is already in use.' });
//     } else {
//       // ถ้าไม่มีอีเมล์ที่ซ้ำกัน
//       const user = await User.create({ name, email });
//       response.status(201).json(user);
//     }
//   } catch (error) {
//     response.status(500).json({ message: error });
//   }
// });

router.post("/", async (request, response) => {
  try {
    const { name, email } = request.body;

    // ตรวจสอบว่ามีชื่อหรืออีเมล์ที่ซ้ำกับข้อมูลที่มีอยู่แล้วหรือไม่
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ name }, { email }],
      },
    });

    if (existingUser) {
      return response
        .status(400)
        .json({ message: "This email is already in use." });
    }
    const user = await User.create({ name, email });
    response.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);
    response.status(500).json({ message: "Failed to create user." });
  }
});

//Update user
router.put("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const newName = request.body.name;

    // ค้นหา user ที่ต้องการอัปเดต
    const user = await User.findByPk(userId);

    if (!user) {
      return response.status(400).json({ message: "User not found." });
    } else if (!newName || newName === user.name) {
      return response
        .status(400)
        .json({ message: "Invalid or duplicate name" });
    } else {
      user.name = newName;
      await user.save();
      response.json(user);
    }
  } catch (error) {
    console.error("Failed to update user:", error);
    response.status(500).json({ message: "Failed to update user." });
  }
});

// Delete user
router.delete("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return response
        .status(404)
        .json({ message: `User ID ${userId} not found.` });
    }

    await user.destroy();
    response.json({ message: `User ID ${userId} deleted successfully.` });
  } catch (error) {
    console.error("Failed to delete user:", error);
    response.status(500).json({ message: "Failed to delete user." });
  }
});

module.exports = router;
