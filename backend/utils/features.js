
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


export const sendcookie = (user,res,statuscode=201,message) =>{
    const token = jwt.sign({ _id : user._id},process.env.JWT_SECRET);

    res.status(statuscode).cookie("token",token,{
        httpOnly : true,
        maxAge : 20 * 60 * 1000
    }).json({
        success : true,
        message : message,
    })
}


export const sendVerifyMail = async(name,email,otp) => {

    try {

        const transporter = await nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: 'rifatali2963@gmail.com',
                pass: 'hijoposgeonxensw'
            },
          });
          
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: '"rifatali2963@gmail.com 👻" <sohel@gmail.com>', // sender address
              to: email, // list of receivers
              subject: 'Verify Your Email',
              text: `Hello ${name},\n\nYour OTP for email verification is: ${otp}\n\nThank you!`,
            });
          

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

   
        
    } catch (error) {

        console.log(error.message);
        
    }
}

export const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
};
