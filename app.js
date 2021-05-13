require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
//const dotenv=require('dotenv')
const userHandler=require('./routehandler/userHandler')
const listHandler=require('./routehandler/listHandler')



const app=express()
app.use(express.json())
const mongoUrl=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.btawc.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`


mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log('Database Connect Success')
        app.listen(1000,()=>{
            console.log('Server is running')
        })
    }).catch(e=>{
        return console.log(e)
    })

// application route
app.use('/user',userHandler)
app.use('/list',listHandler)