import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {uploadFileToIPFS,uploadJSONToIPFS} from './ipfs-uploader.js'
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extende:true}));
app.use(fileUpload());
app.get('/',(req,res)=>{
    res.render("home");
});
app.post('/upload',(req,res)=>{
    // res.render("upload");
    const title=req.body.title;
    const description=req.body.description;
    console.log(title,description);
    console.log(req.files)
    const file=req.files.file;
    const filename=file.name;
    const filePath="files/"+filename;
    file.mv(filePath,async(err)=>{
        if(err){
            console.log(err);
            res.status(500).send("error occured");
        }
        const fileResult=await uploadFileToIPFS(filePath);
        const fielCid=fileResult.cid.toString();
        const metadata={
            title:title,
            description:description,
            image:'http://43.129.194.130:8080/ipfs/'+fielCid
        }
        const metadataResult=await uploadJSONToIPFS(metadata);
        const metadataCid=metadataResult.cid.toString();
        console.log(metadataCid);
        res.json({
            mssage:"file uploaded succ",
            metadata:metadata
        })
    })

})
app.listen(3000,()=>{
    console.log('Example app listening on port 3000');
});