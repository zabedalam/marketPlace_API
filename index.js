const express=require("express")//import express
const productsRoutes=require("./src/products")
const reviewsRoutes=require("./src/reviews")
const path = require("path")

const server=express()//express instances
server.use(express.json())//post method need it for parsing json data it act as a middleware

// make the content of the images folder available for "download" under the name of /images
server.use("/images", express.static(path.join(__dirname, "images")))
server.use("/products",productsRoutes)
server.use("/reviews",reviewsRoutes)
// server.get("/",(req,res)=>{
//     res.send("Hello from API" + new Date())
// })

server.listen(3300,()=>{
    console.log("I am listening on 3300")
})