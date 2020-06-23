const express = require('express');
const router = express.Router();
//const members = require('./members.js');
const uuid = require('uuid');

const {loadMembers, saveMembers} = require('./loading-saving.js');

//Get all members
router.get('/', (req, res)=>{
    console.log('Get all members')
    const members = loadMembers();
    console.log(members);
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(members, null, 2));
    //res.send(members);
});

//Get single member
router.get('/:id', (req, res)=>{
    console.log('Get a single member')
    const members = loadMembers();
    const id = req.params.id;
    console.log(id);
    const memberFound = members.find( member => {
        return member.id == id;
    });
    //console.log(memberFound);

    if(!memberFound){
        res.status(400).json({ Message: `No member with id of ${id}`});
        return;
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(memberFound, null, 2));
    //res.redirect('/');
});

//Create new member
router.post('/create', (req, res)=>{
    console.log('Post a new member')
    const members = loadMembers();
    console.log(req.body);
    if(req.body.name && req.body.email){
        const memberAlreadyExist = members.find( member =>{
            return member.email === req.body.email;
        });
        if(!memberAlreadyExist){
            const newMember = {
                id: uuid.v4(),
                name: req.body.name,
                email: req.body.email
            };
            members.push(newMember);
            saveMembers(members);
             //res.send("User created successfully!")

        }else{
            res.status(400).json({message: `Member with Email: ${req.body.email} already exits!!`});
            return;
        }
       
    }else{
        res.status(400).json({message: 'Name and Email are both required fields!!'});
    } 
    //res.send(members);
   
    res.redirect('/');
});

//Update member
router.put('/update/:id', (req, res)=>{
    const members = loadMembers();
    const id = req.params.id;
    console.log('Update a exixting member');
    //console.log(id);
    const memberFound = members.find( member => {
        return member.id == id;
    });
    //console.log(memberFound);

    if(!memberFound){
        res.status(400).json({ Message: `No member with id of ${id}`});
        return;
    }

   members.forEach( member =>{
        if(member.id == id){
            member.name = req.body.name? req.body.name: member.name;
            member.email = req.body.email? req.body.email: member.email;
        }
    });
    saveMembers(members);
    res.send('user data updated!')
    //res.send(members);
});

//Delete Member
router.delete('/delete/:id', (req, res)=>{
    const members = loadMembers();
    const id = req.params.id;
    console.log("Deleting:",id);
    const memberFound = members.find( member => {
        return member.id == id;
    });
    //console.log(memberFound);

    if(!memberFound){
        res.status(400).json({ Message: `No member with id of ${id}`});
        return;
    }

    const indexOfMemberToRemove = members.indexOf(memberFound);
    members.splice(indexOfMemberToRemove, 1);
    saveMembers(members);
    res.send('User deleted!')
    //res.send(members);
    //res.redirect('/');
});


module.exports = router;