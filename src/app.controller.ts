import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ResponseDTO } from './DTO/ResponseDTO';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @EventPattern('get_user')
    async getHello(data: any): Promise<ResponseDTO> {
        return await this.appService.userResponser(data)
    }
}
