const express=require("express")//import express
const productsRoutes=require("./src/products")


const server=express()//express instances

server.use(express.json())//post method need it for parsing json data

server.use("/products",productsRoutes)
// server.get("/",(req,res)=>{
//     res.send("Hello from API" + new Date())
// })

server.listen(3300,()=>{
    console.log("I am listening on 3300")
})