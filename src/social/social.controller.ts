import { Controller, Body, HttpException, HttpStatus, Param, Logger } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialDto } from '../dtos/social.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SocialEntity } from '../entities/social.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('social')
@Controller('social')
export class SocialController {

    constructor(
        private readonly socialService: SocialService,
    ){}
    
    @MessagePattern({ cmd: 'getSocial' })    
    findAllSocial(data: any[]){
        return this.socialService.findAllSocial(data[0], data[1]);
    }
    
    @MessagePattern({ cmd: 'addSocial' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: SocialEntity,
      })
    async createSocial(socialDto: SocialDto){
        const social = await this.socialService.createSocial(socialDto);
        if(social)
            return social;
        throw new HttpException('Profession not created',HttpStatus.NOT_MODIFIED); 
    }
    
    @MessagePattern({ cmd: 'getSocialById' })
    async findOneSocial(socialId: string){
        Logger.log('Le social dont l"id est '+socialId,'SocialController');
        const social = await this.socialService.findOneSocial(socialId);
        if(social)
            return social;
        throw new HttpException('Social not found',HttpStatus.NOT_FOUND);        
    }
    
    @MessagePattern({ cmd: 'updateSocial' })
    async updateSocial(@Param('socialId') socialId: string, @Body() socialDto: SocialDto){
        const social = await this.socialService.findOneSocial(socialId);
        if(social)
            return await this.socialService.updateSocial(socialId,socialDto);
        throw new HttpException('Social not modified',HttpStatus.NOT_FOUND);
    }
    
    @MessagePattern({ cmd: 'deleteSocial' })
    async removeSocial(@Param('socialId') socialId: string){
        const social = await this.socialService.findOneSocial(socialId);
        if(social)
            return await this.socialService.removeSocial(socialId);
         throw new HttpException('Social not modified',HttpStatus.NOT_FOUND);
    }
}
