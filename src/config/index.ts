import 'dotenv/config';
import * as path from "path"
import * as aws from "@aws-sdk/client-ses"
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const ses = new aws.SES({
    apiVersion : "2012-10-17",
    region : "us-east-1",
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY as string  , 
        secretAccessKey : process.env.AWS_SECRET_KEY as string 
    }
})

export const bullConfig = {
    redis : {
        host : process.env.REDIS_HOST ,
        port : Number(process.env.REDIS_PORT) 
    }
}

export const redisConfig = {
    url : process.env.REDIS_URL
}

export const mailConfig = {
    transport : {
        SES : {ses , aws}
    },
    default : "adenababanla@gmail.com",
    template : {
        dir : path.join(__dirname , "../templates"),
        adapter : new HandlebarsAdapter(),
        options : {
            strict  :true
        }
    }
}