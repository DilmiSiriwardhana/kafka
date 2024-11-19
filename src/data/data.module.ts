/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { KafkaModule } from '../kafka/kafka.module';
import { Redis } from 'ioredis';

@Module({
  imports: [KafkaModule, Redis],
  providers: [DataService],
})
export class DataModule {}