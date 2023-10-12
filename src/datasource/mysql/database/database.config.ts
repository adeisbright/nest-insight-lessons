import { IDatabaseConfig } from "../interfaces/dbConfig.interface"; 

export const databaseConfig : IDatabaseConfig = {
    development : {
      type : "mysql",
      host : "localhost" , 
      database : "online_store",
      password : "2421994",
      username : "root",
      port : 3306,
      logging : false , 
      poolSize : 50 , 
      connectTimeout : 45000,
      timezone : "+01:00"
    } , 
    production : {
      type : "mysql",
      host : "localhost" , 
      database : "online_store",
      password : "2421994",
      username : "root",
      port : 3306 , 
      logging : false , 
      poolSize : 50 , 
      connectTimeout  :45000,
      timezone : "+01:00"
    }
}