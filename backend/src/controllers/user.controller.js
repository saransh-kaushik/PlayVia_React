const {createUser} = require('../models/user.model')

const signup = async (req,res) => {

    const {username,email,password} = req.body;
    const pfp = req.file ? req.file.filename : null;
    console.log("req body", email, username, password)
    try{
        const user  = await createUser(username,email,password,pfp);
        res.status(201).json({message: 'User registered', user}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Signup unsucessful'});
        
    }
};

module.exports= {
    signup,
};