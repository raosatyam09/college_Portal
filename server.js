//                                       // Tried GPT idea :
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const XLSX = require("xlsx");
// const path =require("path");
// const { error } = require("console");


// const app = express();
// const PORT = 4000;

// // serve static files
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use(bodyParser.json());

// // Read Excel files 

// const workbook =XLSX.readFile("./excel_data/state_city.xlsx");
// const collegeWorkbook=XLSX.readFile("./excel_data/All_colleges.xlsx");

// // Ensure workbooks have sheets
// if (!workbook.SheetNames.length) {
//     console.error("No sheets found in the workbook.");
//     process.exit(1);
// }
// if (!collegeWorkbook.SheetNames.length){
//     console.error("No sheets found in the college workbook.");
//     process.exit(1);
// }


// //Parse data form the excel sheets
// const sheet =workbook.Sheets[workbook.SheetNames[0]];
// const excelData=XLSX.utils.sheet_to_json(sheet);

// const collegeSheet =collegeWorkbook.Sheets[collegeWorkbook.SheetNames[0]];
// const collegeData=XLSX.utils.sheet_to_json(collegeSheet);

// // API to get data of state and cities
// app.get ("/api/data",(req, res)=>{
//   const structuredData ={};

//   excelData.forEach((row)=>{
//     const state= row.State;
//     const cities =row.City.split(",").map((City)=> City.trim());

//       if(!structuredData[state]){
//         structuredData[state]={cities:[]};
//       }
// // Add cities to the state
//       cities.forEach((city) =>{
//         if(!structuredData[state].cities.includes(city)){
//           structuredData[state].cities.push(city);
//         }
//       });
 
//   });
// res.json(structuredData);
// });
// // API to get colleges for a specific course
//   app.get("/api/colleges",(req,res)=>{
//     const  course =req.query.course;

//   if(!course){
//     return res.status(400).json({error:"Course is required."});
//   }
//   });
// // Find the column index for the selected course
//  const headers =Object.keys(collegeData[0]);
//  if (!headers.includes(course)){
//   return res.status(400).json({ error: "Course not found in  the Excel sheet."});
//  }
 
// // Extract the colleges under the selected course

// // const colleges=collegeData
// //   .map((row) => row[course])
// //   .filter((college) => college);
// const colleges =collegeData.map((row)=> row[course]).filter(Boolean);

// res.json({colleges});

// // Fallback route to server index.html
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname,"public","course.html"));
// });
// // start the server
//   app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// })





















const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
const PORT = 4000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

// Read Excel files
const workbook = XLSX.readFile("./excel_data/state_city.xlsx");
const collegeWorkbook = XLSX.readFile("./excel_data/All_colleges_set.xlsx");

// Ensure workbooks have sheets
if (!workbook.SheetNames.length) {
  console.error("No sheets found in the state-city workbook.");
  process.exit(1);
}
if (!collegeWorkbook.SheetNames.length) {
  console.error("No sheets found in the colleges workbook.");
  process.exit(1);
}

// Parse data from the Excel sheets
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = XLSX.utils.sheet_to_json(sheet);

const collegeSheet = collegeWorkbook.Sheets[collegeWorkbook.SheetNames[0]];
const collegeData = XLSX.utils.sheet_to_json(collegeSheet);

// API to get data of state and cities
app.get("/api/data", (req, res) => {
  const structuredData = {};

  excelData.forEach((row) => {
    const state = row.State;
    const cities = row.City.split(",").map((city) => city.trim());

    if (!structuredData[state]) {
      structuredData[state] = { cities: [] };
    }

    // Add cities to the state
    cities.forEach((city) => {
      if (!structuredData[state].cities.includes(city)) {
        structuredData[state].cities.push(city);
      }
    });
  });

  res.json(structuredData);
});

// API to get colleges for a specific course
app.get("/api/colleges", (req, res) => {
  const course = req.query.course;

  if (!course) {
    return res.status(400).json({ error: "Course is required." });
  }

  // Find the column index for the selected course
  const headers = Object.keys(collegeData[0]);
  if (!headers.includes(course)) {
    return res.status(400).json({ error: `coures "${course}" not found in the Excel sheet.` });
  }

  // Extract the colleges under the selected course
  const colleges = collegeData
    .map((row) => row[course])
    .filter((college) => college);

  res.json(colleges);
});

// Fallback route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "course.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
