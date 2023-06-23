function checkforAuthenticationCookie(cookieName){
    return (req,res,next)=>{
const { validatetoken } = require("../services/authentication");

const tokenCookieValue=req.cookies[cookieName];
if(!tokenCookieValue)
 return next();
try{
    const userPayload=validatetoken(tokenCookieValue);
    req.user=userPayload;
}
catch{
}
return next();
}
}
module.exports=checkforAuthenticationCookie;