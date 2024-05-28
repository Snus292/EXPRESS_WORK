const{Router} = require("express")
const router = Router()

app.get("/courses",(req,res)=> {
    // res.sendFile(path.join(__dirname, "views","about.html"))
    res.render("courses",{
        title: "Courses",
        isCourses: true
    })
})
module.exports= router