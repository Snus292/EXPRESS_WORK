const{Router} = require("express")
const router = Router()

app.get("/add",(req,res)=> {
    // res.sendFile(path.join(__dirname, "views","about.html"))
    res.render("add",{
        title: "Add a course",
        isAdd: true
    })
})

router.post("/", (req,res)=>{
    console.log(req.body)

    res.redirect("/courses")
})
module.exports= router