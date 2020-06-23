const fs = require('fs');

const loadMembers = () => {
    try{
        const membersBuffer = fs.readFileSync('./members.json');
        const membersString = membersBuffer.toString();
        const membersObject = JSON.parse(membersString);
        return membersObject;
    }catch(e){
        return [];
    }   
}
const saveMembers = (members) => {
    fs.writeFileSync('./members.json', JSON.stringify(members, null, 2));
}

module.exports = {
    loadMembers,
    saveMembers
}