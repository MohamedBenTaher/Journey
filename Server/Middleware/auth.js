import jwt from 'jsonwebtoken';
//wants to like a post 
// we go to the auth middleware 
// auth middleware accpts then user likes 
// else the user denied

const auth = async (req,res,next)=>{
    try {
        console.log(req.headers)
        const token=req.headers.Authorization.split(" ")[1];
        const isCustomAuth=token.length<500
        let decodedData;
        if (token && isCustomAuth)
        {
            decodedData=jwt.verify(token,'test')

            req.userId=decodedData?.id;
        }
        else{
            decodedData=jwt.decode(token)
            req.userId=decodedData?.sub;
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
export default auth;