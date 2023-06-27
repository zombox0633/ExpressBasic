docker-compose up -d 
*ใช้ในกรณีที่ตั้งชื่อ docker-compose.yml
ใช้สำหรับเริ่มต้นคอนเทนเนอร์และบริการที่กำหนดในไฟล์ 

docker-compose down
ใช้สำหรับหยุดการทำงานของคอนเทนเนอร์และบริการที่กำหนดในไฟล์ docker-compose.yml

docker system prune
ใช้สำหรับลบรายการทรัพยากรที่ไม่ได้ใช้งานจาก Docker ทั้งหมด เช่น คอนเทนเนอร์ที่หยุดทำงานแล้ว รูปภาพ Docker ที่ไม่ได้ใช้งานและไม่มีการอ้างอิง และเครื่องหมายเครื่องหมายขยะอื่นๆ ซึ่งมีการติดตั้งอยู่ในระบบ Docker ของคุณ การใช้คำสั่งนี้จะช่วยลดขนาดข้อมูลที่ใช้จัดเก็บในระบบ Docker และคืนพื้นที่จัดเก็บกลับมาให้ใช้งานได้

docker volume prune
ช้สำหรับลบรายการโฟลเดอร์โปรเจกต์ที่เกี่ยวข้องกับ Docker Volumes ที่ไม่ได้ใช้งาน โดยลบโฟลเดอร์ที่ไม่มีการอ้างอิงจากคอนเทนเนอร์หรือบริการ Docker ใดๆ การใช้คำสั่งนี้จะช่วยลดพื้นที่จัดเก็บที่ใช้โดย Docker Volumes ที่ไม่ได้ใช้งาน และคืนพื้นที่จัดเก็บกลับมาให้ใช้งานได้

## MySQL

ALTER TABLE `Users` MODIFY COLUMN id INT AUTO_INCREMENT
เปลี่ยนให้ Users id เป็น AUTO_INCREMENT ในกรณีที่ไม่ได้กำหนด AUTO_INCREMENT ต้องแต่ต้น

SHOW CREATE TABLE Users;
ตรวจสอบว่าการเปลี่ยนแปลง

การกำหนด AUTO_INCREMENT ต้องแต่ต้น 
CREATE TABLE ชื่อ (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  quantity INT
);