/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TempProducer } from './temp.produce.service';
// import { TempController } from './temp.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TempConsumer } from './temp.consumer.service';

@Module({
  imports: [KafkaModule],
  providers: [TempProducer, TempConsumer],
  //controllers: [TempController],
})

export class TempModule {}
