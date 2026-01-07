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

// --------------------------------------------------------------------------------------------------------------
// ------ LOGIN PATH ------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
                                                                                                                     
// 1. 'login.ejs' --> email, password ==> post '/check_credentials'

app.post('/check_credentials', async (req, res) => {
   const email = req.body.email.toLowerCase();
   const password = req.body.password;
   console.log(email, password)
   let attempts = 0
   // Users with this email in db
   const userList = await prisma.User.findMany({
      where : { email }
   });

   console.log(userList)

   // No corresponding email in db
   if (userList.length === 0) {
      res.sendStatus(403)
   } 
   else {
      // Compare password with hash from db
      const passCheck = await bcrypt.compare(password, userList[0].password);
      // Input password different than db
      if (passCheck === false) {
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
            res.sendStatus(200);
         }
      }
   }
});

// 2. 'login_verify.ejs' --> email, code, attempts ==> post '/login_verify_code'

app.post('/login_verify_code', async(req, res) => {
   const email = req.body.email
   const code = req.body.code
   let attempts = Number(req.body.attempts)
   
   // Input code corresponding with {emailUser : correspondingCode}
   if (email2code[email] === Number(code)) {
      // Cookie code duration ok
      if ('code_wait' in req.cookies) {
         const user = await prisma.User.findUnique({
            where : { email }
         });
         // Creation of token for user's session
         const token = jwt.sign({"sub" : user.id, "name" : user.name}, process.env.SECRET)
         // Give cookie with token
         res.cookie("session-token", token, {maxAge : 3600 * 1000})
         // Send to 'visit_list'
         res.sendStatus(200)}
      // Cookie code duration dead   
      else {
         // Send back to 'login.ejs'
         res.sendStatus(403)
      }
   }
   // Input code NOT corresponding with {emailUser : correspondingCode}
   else {
         // Increment number of failed attempts
         attempts ++
         // 3 failed attempts
         if (attempts === 3) {
            // Send back to 'login'
            res.sendStatus(404)
         }
         else {
            res.sendStatus(405)
         };
   }
})




const PORT = process.env.PORT 
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})
