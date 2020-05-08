import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { SocialEntity } from '../entities/social.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([SocialEntity]),
  ],
  controllers: [SocialController],
  providers: [SocialService]
})
export class SocialModule {}
