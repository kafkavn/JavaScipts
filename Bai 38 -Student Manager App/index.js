//Student manager
var fs = require("fs");
var readlineSync = require("readline-sync");
var students = [];
function loadData() {
  var fileContent = fs.readFileSync("./data.json");
  students = JSON.parse(fileContent);
}
function showManu() {
  console.log("1 Show all student: ");
  console.log("2 Create student : ");
  console.log("3 Save and Exit: ");
  var option = readlineSync.question(">");
  switch (option) {
    case "1":
      showStudent();
      showManu();
      break;
    case "2":
      createStudent();

      showManu();
      break;
    case "3":
      saveAndExit();
      break;
    default:
      console.log("Wrong choice");
      showManu();
      break;
  }
}
function showStudent() {
  for (var student of students) console.log(student.name, student.age);
}
function createStudent() {
  // Dung question hoi Name va Age
  var name = readlineSync.question("name:");
  var age = readlineSync.question("age:");
  var std = {
    name: name,
    age: parseInt(age)
  };
  students.push(std);
}
function saveAndExit() {
  var content = JSON.stringify(students);
  fs.writeFileSync("./data.json", content, { encoding: "utf8" });
}
function main() {
  loadData();
  showManu();
}
main();
