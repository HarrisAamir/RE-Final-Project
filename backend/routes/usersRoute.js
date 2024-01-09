const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register new user

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

router.post("/forgetpassword", async (req, res) => {
  let reqOTP = async (req, res) => {
    const otp=Math.floor(Math.random() * 1000) + 100
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass, 
        },
      });
   
     let {username} = req.body;
    User.findOne({ username: username }).then(async (foundUser) => {
            await transporter.sendMail({
                from: '"Harris" <harryaamir073@gmail.com>', // sender address
                to: foundUser.email, // list of receivers
                subject: "OTP to change Password", // Subject line
                text: `Following is the OTP for your change password reqest: ${otp}`, // plain text body
                html: `<b>Following is the OTP for your change password reqest: ${otp}</b>`, // html body
              },(err,info)=>{if (err){console.log(err) ; res.status(404).json({"Message":"Error in Email"})} 
              else {console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                res.status(200).json({otp:otp})}})
              
        }).catch((err)=>{
            res.status(404).json({ "Message": "User not found" });
        })
    }
  const randomNumber = Math.floor(Math.random() * 1000);
  console.log(randomNumber) // Generating a random number between 0 and 100
  res.send(`Random number: ${randomNumber}`);
});


// login user
router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    if (userExists.isBlocked) {
      return res.send({
        message: "Your account is blocked , please contact admin",
        success: false,
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
router.get("/testGet",async(req,res)=>{
  res.send("hello")
})
// get user by id

router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// get all users
router.post("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// update user

router.post("/update-user-permissions", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body._id, req.body);
    res.send({  
      message: "User permissions updated successfully",
      success: true,
      data: null,
    });
  } catch {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

module.exports = router;
