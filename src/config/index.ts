import 'dotenv/config';

export const bullConfig = {
    redis : {
        host : process.env.REDIS_HOST ,
        port : Number(process.env.REDIS_PORT) 
    }
}

export const redisConfig = {
    url : process.env.REDIS_URL
}