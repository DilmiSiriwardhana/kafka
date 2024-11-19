/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class TempProducer {
  constructor(private readonly _kafka: ProducerService) {
    this.generateData();
  }
  // private getRandomTemperature(): number {
  //   return parseFloat((Math.random() * 10 + 20).toFixed(2));
  // }

  // private getRandomHumidity(): number {
  //   return parseFloat((Math.random() * 70 + 30).toFixed(2));
  // }

  // private getRandomProductCount(): number {
  //   return Math.floor(Math.random() * 100) ; 
  // }


  generateData() {
    // Random temperature
    setInterval(() => {
      const temperature = ((Math.random() * 10 + 20)).toFixed(2);
      console.log('Temperature:', temperature);

      this._kafka.produce({
        topic: 'topic-temperature',
        messages: [
          { value: JSON.stringify({ value:temperature }) },
        ],
      });
    }, 500);

    //console.log("Temperature produced")
  }

  // async update() {
  //   const temperature = this.getRandomTemperature();
  //   const humidity = this.getRandomHumidity();

  //   console.log('update call', { temperature, humidity });

  //   this._kafka.produce({
  //     topic: 'temperature-data',
  //     messages: [
  //       { value: JSON.stringify({ type: 'update', temperature, humidity }) },
  //     ],
  //   });
  // }
}
