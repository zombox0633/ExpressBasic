//npm i moment
const moment = require("moment");

//logger เมื่อมีคำขอเข้าสู่แอปพลิเคชัน Express ฟังก์ชันนี้จะถูกเรียกใช้ก่อนที่จะไปยังเส้นทางที่ถูกเรียกใช้ต่อไป ในที่นี้มีการ console.log ที่เรียกใช้ในฟังก์ชัน logger ซึ่งจะแสดงข้อความ
const logger = (request, response, next) => {

  console.log(
    `${request.protocol}://${request.get("host")}${
      request.originalUrl
    }: ${moment().format()}`
  );
  //   moment().format()  วลา
  next();
};

module.exports = logger;
