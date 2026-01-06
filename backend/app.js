import express from 'express'
import prisma from './prisma.js'
//import { sendMail } from './mail.mjs'
import { generateCode } from "./utils/generate_code.mjs"
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import helmet from 'helmet'
import 'dotenv/config'

const app = express()

const email2code = {}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = await prisma.User.findMany()
console.log(db)

app.post('/check_credentials', async (req, res) => {
   const email = req.body.email.toLowerCase();
   const password = req.body.password;
   console.log(email, password)
   let attempts = 0
   // Users with this email in db
   const userList = await prisma.User.findMany({
      where : { email }
   });

   // No corresponding email in db
   if (userList.length === 0) {
      res.render('login', { error_message : "Aucun utilisateurs avec cette adresse mail" });
   } 
   else {
      // Compare password with hash from db
      const passCheck = await bcrypt.compare(password, userList[0].password);
      // Input password different than db
      if (passCheck === false) {
         //res.render('login', { error_message : "Mot de passe incorrect" });
         res.sendStatus(403)
      } 
      else {
         // Email + password OK
         if (userList.length > 0 && passCheck === true) {
            // Send email with verification code
            const code = generateCode();
         //   await sendMail({
         //      from : 'buisson@enseeiht.fr',
         //      to : email,
         //      subject : 'Verification',
         //      text : `Votre code de connexion est : ${code}`
         //   });
            console.log(code)
            // Save {emailUser : correspondingCode}
            email2code[email] = code;
            // Give cookie for code duration 1 min
            res.cookie('code_wait', 'cookie code', { maxAge: 60000 });
            // --SUCCES-- Send to 'login_verify.ejs'
            res.render('login_verify', {
               email,
               error_message : "",
               attempts
            });
         }
      }
   }
});




const PORT = process.env.PORT 
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})
