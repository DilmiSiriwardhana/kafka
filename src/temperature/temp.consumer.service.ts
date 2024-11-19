/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
//import { async } from 'rxjs';
import Redis from 'ioredis';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
// import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TempConsumer implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) { }
  private redis = new Redis();

  //@Cron(CronExpression.EVERY_5_SECONDS)
  async onModuleInit() {
    this._consumer.consume(
      'temperature-client',
      { topic: 'topic-temperature' },
      {
        eachMessage: async ({ message /*topic, partition, message*/ }) => {
          const parsedData = JSON.parse(message.value.toString());
          /*if (parsedMessage.type === 'create') {
            console.log({
              source: 'create-consumer',
              temperature: parsedMessage.temperature,
              humidity: parsedMessage.humidity,
              productCount: parsedMessage.productCount,
              partition: partition.toString(),
              topic: topic.toString(),
            });
          }*/
          const serializedMessage = JSON.stringify(parsedData);
          //console.log("Storing serializedMessage:", serializedMessage); 

          const pipeline = this.redis.pipeline();
          pipeline.lpush('temp-data', serializedMessage);
          pipeline.ltrim('temp-data', 0, 7200 - 1); 
          await pipeline.exec();



          // const parsedMessage = JSON.stringify({parsedData});
          // //console.log(parsedMessage);
          // const pipeline = this.redis.pipeline();
          // pipeline.lpush('temp-data', parsedMessage);
          // pipeline.ltrim('temp-data', 0, 7200 - 1);
          // await pipeline.exec();
          //console.log('temp-data cached successfully')

        }
      },
    );
  }

}
