const{Router} = require("express")
const router = Router()

router.get("/add",(req,res)=> {
    res.render("add",{
        title: "Add a course",
        isAdd: true
    })
})

router.post("/", async(req,res)=>{
    const course =new Course(req.body.title,req.body.price, req.body.img)
    await course.save()
    
    res.redirect("/courses")
})
module.exports= router