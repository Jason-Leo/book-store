const User = require("./user.model");
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res)=>{
    const {username, password} = req.body;
    const JWT_SECRET = process.env.JWT_SECRET_KEY
    try{
        const admin = await User.findOne({username});
        if(!admin){
            res.status(404).send({message: "Admin Not Found"});
        }
        if(password !== admin.password){
            res.status(401).send({message: "Invalid"});
        }
        const token = jwt.sign(
            {
             id: admin._id, 
             username: admin.username,
             role: admin.role
            }, 
            JWT_SECRET,
            { expiresIn: "1h" }
        )
        return res.status(200).json({
            message: "Authentication successfully",
            token: token,
            user:{
                username: admin.username,
                role: admin.role
            },
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: `Failed ${error}`,
            code: 500
        })
    }
}

module.exports = {
    handleLogin
}