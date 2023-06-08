var express = require("express");
var router = express.Router();
const COURSE = require("../models/course.model");
const authorize = require("../middleware/authorize")
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create",authorize(['admin']) ,async (req, res) => {
  const course_save = new COURSE({
    coursename: req.body.coursename,
    level: req.body.level,
    description: req.body.description,
    image: req.body.image,
    batches:[]
  });
  try {
    let save = await course_save.save();
    res.send({ statusCode: 200, message: "Course Added" });
  } catch (error) {
    res.send({ statusCode: 400, message: "Duplicate Course" });
  }
});

router.post('/assign',authorize(['admin']),async (req,res)=>{
  const batchObject ={
    username:req.body.instructorname,
    date:req.body.date
  }

  try {
  // let find_course =await COURSE.find({"batches.username":"Aman"})
  let find_course =await COURSE.find({$and:[{"batches.username":req.body.instructorname},{"batches.date":req.body.date}]})
  console.log(find_course.length)
  if(find_course.length === 0){
    console.log("inisdecouse")
   let save = await COURSE.updateOne({coursename:req.body.coursename},{$addToSet:{batches:batchObject}})
   console.log(save)
   if(save.modifiedCount ==1){
     res.send({statusCode:200 , message:"Lecture Created"})
   }else{
    res.send({statusCode:400 , message:"Serve Error"})

   }
  }else{
    res.send({
      statusCode:400 , message:"Instructor on this day is not available"
    })
  }
  } catch (error) {
    res.send({statusCode:400 , message:error})
  }
})

router.post('/getlecture',authorize(['instructors']),async(req,res)=>{
  try {
    console.log(req.body)
    let data = await COURSE.find({"batches.username":req.body.name})
    res.send({statusCode :200  , message:data})
  } catch (error) {
    console.log(error)
    
  }
})

router.post('/getall',authorize(['admin']),async(req,res)=>{
  try {
    let allCourse = await COURSE.find({})
    console.log(req.body.page)
    let pagination = allCourse.splice((req.body.page-1)*4,4)
    res.send({statusCode:200 , message:pagination , count:pagination.length})
  } catch (error) {
    res.send({statusCode:400 , message:error})
    
  }
})
module.exports = router;
