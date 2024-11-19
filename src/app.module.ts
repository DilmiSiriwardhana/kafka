/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { DataModule } from './data/data.module';
import { TempModule } from './temperature/temp.module';
import { HumidityModule } from './humidity/humidity.module';
import { PCModule } from './productCount/pc.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [KafkaModule, TempModule, HumidityModule, PCModule, DataModule, ScheduleModule.forRoot(), RedisModule.forRoot({
    url: 'localhost:6379',
    type: 'single',
  }),],
})
export class AppModule { }
