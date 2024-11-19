/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class HumidityProducer {
  constructor(private readonly _kafka: ProducerService) {
    this.generateData();
  }

  generateData() {

    setInterval(() => {
      const humidity = (Math.random() * 100).toFixed(2);
      console.log('Humidity:', humidity);

      this._kafka.produce({
        topic: 'topic-humidity',
        messages: [
          { value: JSON.stringify({ value: humidity }) },
        ],
      });
    }, 1000);
  }

}
