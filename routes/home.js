const{Router} = require("express")
const router = Router()

app.get("/",(req,res)=> {
    // res.sendFile(path.join(__dirname,"views","index.html"))
    res.render("index",{
        title:"Main page",
        isHome:true
    })
})
module.exports=router