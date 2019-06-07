/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var fs = require("fs");
var readlineSync = require("readline-sync");
var contacts = [];

function loadData() {
  var fileContent = fs.readFileSync("./data.json");
  contacts = JSON.parse(fileContent);
}
function showManu() {
  console.log("1. Show all contact");
  console.log("2. Create new contact");
  console.log("3. Edit contact");
  console.log("4. Delete contact");
  console.log("5. Search contact");
  console.log("6. Save and Exit");
  var option = readlineSync.question(">");
  switch (option) {
    case "1":
      showContact();
      showManu();
      break;
    case "2":
      createContact();
      showManu();
      break;
    case "3":
      editContact();
      showManu();
      break;
    case "4":
      deleteContact();
      showManu();
    case "5":
      searchContact();
      showManu();
      break;
    case "6":
      exitAndSave();
      break;
    default:
      console.log("Wrong choice!");
      showManu();
      break;
  }
}
function showContact() {
  for (contact of contacts) console.log(contact.name, contact.phoneNumber);
}
function createContact() {
  var name = readlineSync.question("Name:");
  var phoneNumber = readlineSync.question("Number:");
  var contact = {
    name: name,
    phoneNumber: phoneNumber
  };
  contacts.push(contact);
}
function editContact() {
  var editNumber = readlineSync.question("Enter name:");
  for (contact of contacts)
    if (contact.name === editNumber) {
      console.log("Current Number: " + contact.name, contact.phoneNumber);
      var newNumber = readlineSync.question("Enter new number:");
      contact.phoneNumber = newNumber;
    } else console.log("wrong name!");
}
function searchContact() {
  var searchName = readlineSync.question("Enter Name:");
  for (name of contacts)
    if (name.name === searchName) {
      console.log("Phone Number is: ", name.phoneNumber);
    } else {
      console.log("Name doesn't exit!");
    }
}
function deleteContact() {
  var deleteNumber = readlineSync.question("Enter Name:");
  for (dlNumber of contacts)
    if (dlNumber.name === deleteNumber) {
      var i = contacts.indexOf(dlNumber);
      if (i != -1) {
        contacts.splice(i, 1);
        console.log(deleteNumber + " has deleted! ");
      }
    }
}
function exitAndSave() {
  var content = JSON.stringify(contacts);
  fs.writeFileSync("./data.json", content, { encoding: "utf8" });
}
function main() {
  loadData();
  showManu();
}
main();
