/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PCProducer } from './pc.produce.service';
// import { TempController } from './temp.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { PCConsumer } from './pc.consumer.service';

@Module({
  imports: [KafkaModule],
  providers: [PCProducer, PCConsumer],
  //controllers: [TempController],
})

export class PCModule {}
