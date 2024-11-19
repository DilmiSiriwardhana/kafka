/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HumidityProducer } from './humidity.produce.service';
// import { TempController } from './temp.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { HumidityConsumer } from './humidity.consumer.service';

@Module({
  imports: [KafkaModule],
  providers: [HumidityProducer, HumidityConsumer],
  //controllers: [TempController],
})

export class HumidityModule {}
