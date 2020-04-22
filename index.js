const express=require("express")//import express
const productsRoutes=require("./src/products")
const reviewsRoutes=require("./src/reviews")


const server=express()//express instances

server.use(express.json())//post method need it for parsing json data

server.use("/products",productsRoutes)
server.use("/reviews",reviewsRoutes)
// server.get("/",(req,res)=>{
//     res.send("Hello from API" + new Date())
// })

server.listen(3300,()=>{
    console.log("I am listening on 3300")
})