const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signUp(req, res){

    models.User.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            // res.status(409).json({
            //     message: "User Already Exist",
            // })
            return res.json({message : 'User already exists'});
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        full_name: req.body.fullName,
                        email: req.body.email,
                        password: hash,
                
                    }
                
                    models.User.create(user).then(result => {
                        res.status(200).json({
                            message: 'Registerd successfully'
                        });
                    }).catch(error=>{
                        res.status(500).json({error: error});
                    });
                });
            })
        }
    }).catch(error=>{
        res.status(500).json({error: error});
    });


}


function signIn(req, res){
    models.users.findOne({where:{email:req.body.email}}).then(user =>{
        // console.log(user);
        if(user === null){
            res.status(401).json({
                message : 'Invalid Credentials'
            });
            // onCheckUser(req.body.email, req.body.password, res);

        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                    },  'secret', function(err, token){
                        res.status(200).json({
                            message : 'Login successful',
                            token:token,
                            result: user

                        });
                    })
                }else{
                    res.status(500).json({error: "Something went wrong"});
                }
            })
        }
    })
}

function onCheckUser(email, password, res){
    models.users.findOne({where:{email:email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message : 'Invalid Credentials'
            });
            // onCheckUser(req.body.email, req.body.password);

        }else{
            bcryptjs.compare(password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                    },  'secret', function(err, token){
                        res.status(200).json({
                            message : 'Login successful',
                            token:token,
                            result: user

                        });
                    })
                }else{
                    res.status(500).json({error: "Something went wrong"});
                }
            })
        }
    })

}


module.exports = {
    signUp: signUp,
    signIn: signIn,
};
