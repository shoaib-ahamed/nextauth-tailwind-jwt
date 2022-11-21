
/* eslint-disable import/no-anonymous-default-export */

import { hash } from 'bcryptjs';
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';

// export default async function handler(req, res){

//     // only post method is accepted
//     if(req.method === 'POST'){

//         if(!req.body) return res.status(404).json({ error: "Don't have form data...!"});
//         const { username, email, password } = req.body;

//         // check duplicate users
//         const checkexisting = await Users.findOne({ email });
//         if(checkexisting) return res.status(422).json({ message: "User Already Exists...!"});

//         // hash password
//         Users.create({ username, email, password : await hash(password, 12)}, function(err, data){
//             if(err) return res.status(404).json({ err });
//             res.status(201).json({ status : true, user: data})
//         })

//     } else{
//         res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
//     }

// }


export default async (req, res) => {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))

    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
       
        const { username, email, password , phone } = req.body

        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({err: 'This email already exists.'})

        const passwordHash = await hash(password, 12)

        const newUser = new Users({ 
            username, email, password: passwordHash , phone
        })

        await newUser.save()
        
        res.json({msg: "Register Success!" , user: newUser , status: true})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

