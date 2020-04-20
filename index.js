const express=require("express")//import express


const server=express()//express instance


server.get("/",(req,res)=>{
    res.send("Hello from API" + new Date())
})

server.listen(3300,()=>{
    console.log("I am listening on 3300")
})