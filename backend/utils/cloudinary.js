import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


    cloudinary.config({ 
        cloud_name: "dphumfiq5", 
        api_key: "941294356917852", 
        api_secret: "e1SW7Qo5O00_ZmZqJpmrELZ9VDM" 
    });
    
 
    const uploadOnCloudinary = async(localFilePath) =>{

       try {


        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,{
             resource_type : "auto"
         })
 
        //  console.log("file has been uploaded",response.url);

        fs.unlinkSync(localFilePath);

 
         return response;
        
       } catch (error) {

        fs.unlinkSync(localFilePath);

        return null;
        
       }
    }

    export {uploadOnCloudinary}