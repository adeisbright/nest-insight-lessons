import { Injectable  , NestMiddleware} from "@nestjs/common";
import {Request , Response , NextFunction} from "express"

@Injectable()
export class RequestLabeller implements NestMiddleware{
    use(req : Request , res : Response , next : NextFunction){
        const randomGenerator = () => Math.floor(Math.random()*99999 + 1) 

        req.headers["id"] = `${randomGenerator()}` 
        next()
    }
}