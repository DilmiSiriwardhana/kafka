/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
// import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PCConsumer implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) { }
  private redis = new Redis();

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async onModuleInit() {
    this._consumer.consume(
      'product-count-client',
      { topic: 'topic-product-count' },
      {
        eachMessage: async ({ message /*topic, partition, message*/ }) => {
          const parsedData = JSON.parse(message.value.toString());
          
          const serializedMessage = JSON.stringify(parsedData);
          //console.log("Storing serializedMessage:", serializedMessage); 

          const pipeline = this.redis.pipeline();
          pipeline.lpush('pc-data', serializedMessage);
          pipeline.ltrim('pc-data', 0, 7200 - 1); 
          await pipeline.exec();

          //console.log('pc-data cached successfully')

        }
      },
    );
  }

}
