//api basic
const express = require("express");
const router = express.Router();

//npm i uuid
const uuid = require("uuid");

const users = require("../../users");

//Get all users
//เปลี่ยนจาก app เป็น router แทนในกรณีที่ทำไฟล์แยกและจำเป็นต้องใช้ express.Router() ในการช่วย
//         แก้ไข path จาก /api/users เป็น / เพราะใช้ค่าจากไฟล์ index และ router.get จะเป็นการต่อ path เป็น /api/users/
router.get("/", (request, response) => {
  response.json(users);
});
//โดยใช้ Postman เช็คข้อมูล

//Get single user
//เปลี่ยนจาก app เป็น router แทนในกรณีที่ทำไฟล์แยกและจำเป็นต้องใช้ express.Router() ในการช่วย
//แก้ไข path จาก /api/users เป็น /:id เพราะใช้ค่าจากไฟล์ index และ router.get จะเป็นการต่อ path เป็น /api/users/:id
//       กำหนดการเข้าถึง
router.get("/:id", (request, response) => {
  //some() ออกมาจะเป็น boolean
  //                      แปลงเป็น int ก่อนแม้จะเป็นอยู่แล้ว    request.params คือคำสั่งในการระบุตัวที่ทำการค้นหา
  const found = users.some((user) => user.id === parseInt(request.params.id));
  if (found) {
    response.json(
      users.filter((user) => user.id === parseInt(request.params.id))
    );
  } else {
    //ในกรณีที่เป็น false จะส่ง statusCode เป็น 400 และส่งข้อมูลเป็นรูปแบบ json
    request
      .status(400)
      .json({ mag: `No users with the  id of ${request.params.id}` });
  }
});

// create users
router.post("/", (request, response) => {
  // response.send(request.body);

  //uuid.v4() เป็นการเรียกใช้ฟังก์ชัน v4() ซึ่งเป็นรหัสที่สร้างขึ้นจากการสร้างเลขสุ่มแบบคริสตัล และมีความไม่แน่นอน
  //request.body ใช้เพื่อเข้าถึงข้อมูลที่ถูกส่งมาในรูปแบบของอ็อบเจ็กต์ JavaScript ในแอปพลิเคชัน Express โดยปกติจะมาจากการส่งข้อมูลผ่านฟอร์มหรือการส่ง JSON  //ในการทดลองสร้างข้อมูลใน postman
  const newUser = {
    id: uuid.v4(),
    name: request.body.name,
    email: request.body.email,
  };

  if (!newUser.name || !newUser.email) {
    //เป็นการตอบกลับแบบ JSON ด้วยสถานะ HTTP 400 Bad Request และส่งข้อความ "please include a name and email" ในรูปแบบ JSON กลับไปยังผู้ใช้ โดยการใช้
    return response
      .status(400)
      .json({ mag: "please include a name and email" });
  }

  //เป็นการเพิ่มอ็อบเจ็กต์ newUser ลงในอาร์เรย์ users ซึ่งเป็นตัวแทนข้อมูลของผู้ใช้ทั้งหมดที่ถูกสร้างขึ้นในระบบ นั่นคือ เมื่อมีการสร้างผู้ใช้ใหม่ อ็อบเจ็กต์ของผู้ใช้ใหม่นั้นจะถูกเพิ่มลงในอาร์เรย์ users เพื่อเก็บข้อมูลของผู้ใช้ทุกคนในระบบ
  users.push(newUser);

  //คือการส่งข้อมูลในรูปแบบ JSON กลับไปยังผู้ใช้ โดยข้อมูลที่ส่งกลับคืออาร์เรย์ users ซึ่งเก็บข้อมูลของผู้ใช้ทั้งหมด ผู้ใช้สามารถเรียก API นี้แล้วรับข้อมูลผู้ใช้ทั้งหมดในระบบกลับมาได้ในรูปแบบ JSON
  response.json(users);
});

//Update user
router.put("/:id", (request, response) => {
  let found = users.some((user) => user.id === parseInt(request.params.id));

  if (found) {
    const UpdateUser = request.body;
    users.forEach((p) => {
      if (p.id === parseInt(request.params.id)) {
        p.name = UpdateUser.name ? UpdateUser.name : p.name;
        p.email = UpdateUser.email ? UpdateUser.email : p.email;

        response.json({ msg: "User updated", p });
      }
    });
  } else {
    response
      .status(400)
      .json({ mag: `No users with the  id of ${request.params.id}` });
  }
});

//Delete user
router.delete("/:id", (request, response) => {
  let found = users.some((user) => user.id === parseInt(request.params.id));

  if (found) {
    response.json({
      mag: "Member deleted",
      users: users.filter((user) => user.id !== parseInt(request.params.id))
    });
  } else {
    response
      .status(400)
      .json({ mag: `No users with the  id of ${request.params.id}` });
  }
});

module.exports = router;
