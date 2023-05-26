import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { DataDTO } from './DTO/DataDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResonseUseraDTO } from './DTO/ResponseUserDTO';
import * as crypto from 'crypto';
import { User } from './models/User';



@Injectable()
export class AppService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) { }


    async userResponser(data: any) {
        const responseDTO = new ResponseDTO()
        let status = 200
        try {
            const resonseDataDTO = await this.userHandler(data)
            responseDTO.data = resonseDataDTO
        }
        catch (e) {
            // if (e == 'sessions not found' || e == 'session expired') {
            //     status = 403//перезапуск клиента
            // }
            // else if (e == 'server hash bad' || e == 'server DTO bad') {
            //     status = 401//активно сигнализировать в логи
            // } else if (e == 'too many requests') {
            //     status = 429//повторить запрос позже
            // } else if (e == 'parsing data error') {
            //     status = 400 //сервер не знает что делать
            // } else {
            status = 400
            // }
            console.log("Ошибка " + e)
        }
        responseDTO.status = status

        return responseDTO
    }

    async userHandler(data: any): Promise<ResonseUseraDTO> {
        let dataDTO
        try {
            dataDTO = new DataDTO(data.userId)
        } catch (e) {
            throw "parsing data error"
        }

        return this.userLogic(dataDTO)
    }


    async userLogic(dataDTO: DataDTO): Promise<ResonseUseraDTO> {
        const userId = dataDTO.userId;

        if (userId == undefined || userId == null) { console.log('userId :' + userId); return new ResonseUseraDTO('', [''], 'ban', false) }

        const users = await this.findUserByUserId(userId)

        let user: User
        let isNewUser = false

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

        return new ResonseUseraDTO(user.userId, this.parseAccountsId(user.accountsId), user.permission, isNewUser)
    }

    parseAccountsId(strIds: string): Array<string> {
        const array = strIds.split(',')
        console.log(array)
        return array
    }

    async createUserByUserId(userId: string) {
        const user = await this.userRepo.save(
            this.userRepo.create(
                {
                    userId: userId,
                    createDate: Date.now(),
                    lastActive: Date.now(),
                    permission: 'user',
                    accountsId: '1,'
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


