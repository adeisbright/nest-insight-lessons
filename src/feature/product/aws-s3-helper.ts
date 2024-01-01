import {
    PutObjectCommand,
} from "@aws-sdk/client-s3"
import { s3Client } from "@/config"; 
import { appConfig } from "@/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3Helper {
    private awsBucket : string 
    constructor(){
        this.awsBucket = appConfig.aws.bucketName
    }

    /**
     * Adds a file to an AWS Bucket in a particular region 
     * @param {String} fileName  name of the file 
     * @param {Buffer} fileBody  The file as a Buffer
     * @returns {Object}
     */
    async putObject(fileName : string ,fileBody : Buffer){

        const params = {
            Bucket  : this.awsBucket , 
            Key: fileName , 
            Body: fileBody,
        }
    
        try {
            let data = await s3Client.send(new PutObjectCommand(params)) 
            return data
        } catch (error: any) {
            console.log(error)
        }
    }

}
