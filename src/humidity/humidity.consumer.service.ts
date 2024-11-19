/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
//import { async } from 'rxjs';
import Redis from 'ioredis';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
// import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HumidityConsumer implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) {}
  private redis = new Redis();
  
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async onModuleInit() {
    this._consumer.consume(
      'humidity-client',
      { topic: 'topic-humidity' },
      {
        eachMessage: async ({ message /*topic, partition, message*/ }) => {
          const parsedData = JSON.parse(message.value.toString());
          const serializedMessage = JSON.stringify(parsedData);
          //console.log("Storing serializedMessage:", serializedMessage);

          const pipeline = this.redis.pipeline();
          pipeline.lpush('humidity-data', serializedMessage);
          pipeline.ltrim('humidity-data', 0, 7200 - 1); 
          await pipeline.exec();
          
          //console.log('humidity-data cached successfully')

        }
      },
    );
  }
  
}
