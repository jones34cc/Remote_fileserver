const express=require("express");
const app=express();
const port=3000;
const fs=require("fs");
const path=require("path");
app.use(express.json());


app.get("/files/:filename",(req,res)=>{
    const filename=req.params.filename;
    const filepath=path.join(__dirname,"files",filename);
    if(!filepath.startsWith(path.join(__dirname,"files"))){
        return res.status(400).send("Invalid file path");
    }

    //checks if the file exists
    fs.stat(filepath,(err,stats)=>{
        if(err){
            return res.status(404).send("File not found");
        }
        res.sendFile(filepath);
    });
});

app.use((req,res)=>{
    res.status(404).send("Route not found");
}     );



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});