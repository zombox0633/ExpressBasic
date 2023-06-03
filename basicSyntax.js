//npm i express
const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");

const app = express();

//Body parse middleware
// เป็นการกำหนด middleware ในแอปพลิเคชัน Express เพื่อการประมวลผลข้อมูลที่ถูกส่งมากับคำขอ HTTP POST หรือ PUT

//express.json() เป็น middleware ที่ใช้ในการแปลงข้อมูล JSON ที่ส่งมากับคำขอ HTTP POST หรือ PUT ให้เป็นอ็อบเจ็กต์ JavaScript ที่สามารถเข้าถึงได้ใน request.body ซึ่งอนุญาตให้เราสามารถใช้ข้อมูล JSON ที่ส่งมาได้ในแอปพลิเคชัน Express
app.use(express.json());
// เป็น middleware ที่ใช้ในการแปลงข้อมูลที่ถูกส่งมากับคำขอ HTTP POST หรือ PUT ในรูปแบบของสตริงคีลเข้าให้อยู่ในรูปแบบของอ็อบเจ็กต์ JavaScript ที่สามารถเข้าถึงได้ใน request.body การใช้ extended: false จะเป็นการกำหนดให้ middleware ดำเนินการแปลงข้อมูลในรูปแบบของ URL-encoded ที่มีรูปแบบพื้นฐาน
app.use(express.urlencoded({ extended: false }));

// app.get กับการแสดงข้อมูล index.html
// app.get("/", (request, response) => {
//   //send() ใช้สำหรับส่งข้อมูลอื่น ๆ ที่ไม่ใช่ไฟล์ หรือสามารถใช้ส่งข้อความอย่างง่าย
//   // response.send("Hello, Express");
//   //sendFile() ใช้ส่งไฟล์กลับไปยัง client ในรูปแบบข้อมูลไฟล์จริง เช่น HTML, CSS, JavaScript, รูปภาพ โดยใช้เส้นทางของไฟล์ในระบบไฟล์เป็นอาร์กิวเมนต์
//   //path.join() เป็นฟังก์ชันใน Node.js ที่ใช้สำหรับรวมเส้นทางหรือพาธของไฟล์หรือโฟลเดอร์เข้าด้วยกันเพื่อสร้างเส้นทางแบบสมบูรณ์ โดยรับพารามิเตอร์ที่เป็นสตริงแทนเส้นทางหรือพาธแต่ละส่วน แล้วรวมเป็นเส้นทางสมบูรณ์ โดยอัตโนมัติจัดการเรื่องตัวแบ็คสแลชและสตริงที่ซ้ำกันอัตโนมัติ
//   //__dirname เป็นตัวแปรที่ใช้ใน Node.js เพื่อแทนที่เป็นเส้นทางสำหรับไดเรกทอรีปัจจุบันของไฟล์ที่ถูกดำเนินการ ในที่นี้คือไดเรกทอรีที่มีไฟล์ที่ประกาศโค้ดอยู่. เมื่อใช้ __dirname จะคืนค่าเป็นเส้นทางแบบสมบูรณ์ไปยังไดเรกทอรีที่ประกาศโค้ดอยู่
//   //                                     folder     file
//   response.sendFile(path.join(__dirname,'public', 'index.html'))
// });

//Init Middleware
//เป็นการเรียกใช้งาน middleware logger ที่ถูกเพิ่มเข้ากับแอปพลิเคชัน Express ด้วย app.use() ซึ่งจะให้ middleware logger ทำงานสำหรับทุกคำขอที่เข้าสู่แอปพลิเคชัน
app.use(logger);

//การเชื่อมต่อโดยใช้ router
//         path ในการใช้งาน          ไฟล์ที่จะระบุบ
app.use("/api/users", require("./routes/api/users"));

// set static folder
//app.use กับการแสดงข้อมูล index.html แต่แบบนี้จะสามารถแสดง ไฟล์ใน folder ได้หลายไฟล์
app.use(express.static(path.join(__dirname, "public")));

app.listen(8000);
