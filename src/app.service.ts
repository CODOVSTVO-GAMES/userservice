/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { DataDTO } from './DTO/DataDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResonseUseraDTO } from './DTO/ResponseUserDTO';
import { User } from './models/User';



@Injectable()
export class AppService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) { }


    async userResponser(data: any) {
        const responseDTO = new ResponseDTO()
        try {
            const dataDTO = new DataDTO(data.userId)
            responseDTO.data = await this.userLogic(dataDTO)
        }
        catch (e) {
            responseDTO.status = 400
            console.log("Ошибка " + e)
        }

        return responseDTO
    }

    async userLogic(dataDTO: DataDTO): Promise<ResonseUseraDTO> {
        const userId = dataDTO.userId;
        if (userId == undefined || userId == null) { console.log('userId :' + userId); throw 403 }

        let user: User
        let isNewUser = false

        const users = await this.findUserByUserId(userId)

        if (users.length > 0) {
            if (users.length > 1) {
                console.log("Что то тут происходит срочно дебажить. По одному айди зарегистрировалось два пользователя")
                //ЛОГ
            }
            user = users[0]
        } else {
            user = await this.createUserByUserId(userId)
            isNewUser = true
        }

        if (userId == 'web') {
            isNewUser = true //тестовый юзер 
        }
        console.log(user)
        return new ResonseUseraDTO(user.userId, user.accounts, user.permission, isNewUser)
    }

    parseAccountsId(strIds: string): Array<string> {
        const array = strIds.split(',')
        return array
    }

    async createUserByUserId(userId: string) {
        const accounts: Account[] = []
        accounts.push(new Account('1', 'testzone'))

        const user = await this.userRepo.save(
            this.userRepo.create(
                {
                    userId: userId,
                    createDate: Date.now(),
                    lastActive: Date.now(),
                    permission: 'user',
                    accounts: JSON.parse(JSON.stringify(accounts))
                }
            )
        )
        return user
    }

    async findUserByUserId(userId: string) {
        return await this.userRepo.find(
            {
                where: {
                    userId: userId
                }
            }
        )
    }

    async updateLastActiveDateByUser(user: User): Promise<User> {
        user.lastActive = Date.now()
        await this.userRepo.save(user)
        return user
    }

}

export class Account {
    userName: string
    zone: string
    constructor(
        userName: string,
        zone: string
    ) {
        this.userName = userName
        this.zone = zone
    }
}