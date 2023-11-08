import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Cursor, ICursor } from "@/shared/interfaces";
import { FindOptionsWhere, ObjectLiteral, ObjectType, Repository } from "typeorm";
import { User } from "../entities/User";
import { REPOSITORY } from '@/constants';

interface PagingResult<Entity> {
    data : Entity , 
    cursor : Cursor 
}
export abstract class IGenericRepository<T> {
    abstract getAll(
        query :  FindOptionsWhere<T> , 
        model : ObjectType<T> , 
        projection : any , 
    ) : Promise<T>
}

export class MySqlGenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
    private readonly _repository :  Repository<T> 
    constructor(repository : Repository<T>){
        this._repository = repository
    }

    getAll(
        query: FindOptionsWhere<T>, 
        model: ObjectType<T>, 
        projection: any,
        ): Promise<T> {
        const queryBuilder : any = this._repository.createQueryBuilder() 
        .addSelect(projection)
        .from(model , "record") 
        .where(query)
        .getOne()

        return queryBuilder

    }
}

export abstract class MysqlDataServices {
    abstract users : IGenericRepository<User>
}

@Injectable()
export class SqlService  implements MysqlDataServices, OnApplicationBootstrap{
    users : MySqlGenericRepository<User> 

    constructor(
        @Inject(REPOSITORY) private userRepository : Repository<User>
    ){} 

    onApplicationBootstrap() {
        this.users = new MySqlGenericRepository<User>(this.userRepository)
    }
}