import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsService],
  imports: [TypeOrmModule.forFeature([Starship])],
})
export class StarshipsModule {}
