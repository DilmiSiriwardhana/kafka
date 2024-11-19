/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class PCProducer {
  constructor(private readonly _kafka: ProducerService) {
    this.generateData();
  }

  generateData() {
    setInterval(() => {
      const productCount = Math.floor(Math.random() * 100);
      console.log('Product Count:', productCount);

      //console.log('create call', { productCount });


      this._kafka.produce({
        topic: 'topic-product-count',
        messages: [
          { value: JSON.stringify({ value: productCount }) },
        ],
      });
    }, 5000);


  }

}
