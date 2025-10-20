import rateLimit from '../config/upstash.js';

const rateLimiter = async (req ,res , next) => {
    try {
        const {success} = await rateLimit.limit("my-rate-limit");
        if(!success){
            return res.status(429).json({message : "Too many requests, please try again"});
        }
        next();
    } catch (error) {
        console.log("Rate limit error");
        next(error);
    }
} 

export default rateLimiter;