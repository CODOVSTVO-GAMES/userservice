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
        let status = 200
        try {
            const resonseDataDTO = await this.userHandler(data)
            responseDTO.data = resonseDataDTO
        }
        catch (e) {
            status = 400
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

        if (userId == undefined || userId == null) { console.log('userId :' + userId); throw 403 }

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

        return new ResonseUseraDTO(user.userId, this.parseAccountsId(user.accountsId), user.permission, isNewUser, user.zone)
    }

    parseAccountsId(strIds: string): Array<string> {
        const array = strIds.split(',')
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
                    accountsId: '1,',
                    zone: 'testzone-'
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

    //---------------------------------------


    convertAccountsStringToArray(str: string): string[] {
        return str.split(',')
    }

    convertCoordinatesStringToArray(str: string): string[] {
        return str.split('-')
    }

    convertCoordinatesArrayToString(arr: string[]): string {
        let str = ''
        for (let l = 0; l < arr.length; l++) {
            if (arr[l] == '') { continue; }
            str = str + arr[l] + '-'
        }
        return str
    }
}


