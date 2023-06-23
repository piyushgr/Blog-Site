const JWT=require('jsonwebtoken');
const secret="it@@syoyo@33##";

function createtoken(user){
    const payload={
        _id:user.id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role
    }
    const token=JWT.sign(payload,secret);
    return token;
}
function validatetoken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}
module.exports={createtoken,validatetoken};