const usersControllers = {}

const model = require('../models/user')

usersControllers.getUsers = async (req, res)=> {
    const users = await model.find()
    res.json(users)
}

usersControllers.createUser = async (req, res)=> {
    const { username } = req.body
    const newUser = new model ({
        username
    })
    await newUser.save()
    res.json({message : 'User saved'})
}

usersControllers.deleteUser = async (req, res)=>{
    await model.findByIdAndDelete(req.params.id)
    res.json({message : 'User deleted'})
}

module.exports = usersControllers