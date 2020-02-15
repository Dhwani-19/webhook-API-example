const express=require("express")
const bodyparser=require("body-parser")
const mongoclient=require("./database/connect")
const app=express()
const WebHookModel=require("./database/webhook.model")

mongoclient().then(()=>{
    console.log("Connected")
})
.catch(console.log)


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get("/",(req,res)=>{
    res.send("Welcome MscIT About WebHOOK")
})

app.get("/api/webhook",(req,res)=>{
    

    WebHookModel
    .find()
    .then((wh)=>{

        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched"
        });
    })
    .catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.post("/api/webhook",(req,res)=>{

    let body=req.body;

    WebHookModel
    .create(body)
    .then((wh)=>{
        res.json({

            flag:true,
            data:wh,
            message:"Successfully created"
        });
    })
    .catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.put("/api/webhook/:id",(req,res)=>{

    let body=req.body;

    WebHookModel
    .findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully upadted"
        });
    })
    .catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.delete("/api/webhook/:id",(req,res)=>{
    WebHookModel.findByIdAndRemove(req.params.id,function(err,wh){
        if(err){
            res.json({
                flag:flase,
                data:null,
                message:err.message
            });
        }
        else{
            res.json({
                flag:true,
                data:wh,
                message:"Successfully deleted"
            })
        }
    })
})

app.listen(3000)