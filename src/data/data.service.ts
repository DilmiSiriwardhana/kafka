/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Redis } from 'ioredis';

@Injectable()
export class DataService {
  private redisService = new Redis();


  @Interval(15000)
  async calculateAveragesInHour() {
    console.log('Calculating averages...');

    const temperatureData = await this.redisService.lrange('temp-data', 0, 5);
    // console.log('temp-data :' );

    const tempjson = temperatureData.map((serializedMessage) => JSON.parse(serializedMessage));
    // console.log('tempjson' );

    const tempvalues = tempjson.map((serializedMessage) => serializedMessage.value);
    // console.log('error caused here3');

    // tempvalues.forEach(element => {
    //   console.log(element);
    // });

    const humidityData = await this.redisService.lrange('humidity-data', 0, 5);
    const humidityjson = humidityData.map((serializedMessage) => JSON.parse(serializedMessage));
    const humidityvalues = humidityjson.map((serializedMessage) => serializedMessage.value);
    // console.log("humidityData" + humidityData);

    const productCountData = await this.redisService.lrange('pc-data', 0, 5);
    const pcjson = productCountData.map((serializedMessage) => JSON.parse(serializedMessage));
    const pcvalues = pcjson.map((serializedMessage) => serializedMessage.value);



    const avgTemperatureInMinute = this.calculateAverageInTimePeriod(tempvalues, 60 / 0.5);
    const avgTemperatureInHour = this.calculateAverageInTimePeriod(tempvalues, 60 * 60 / 0.5);
    const maxTemperatureInHour = this.getMaxInTimePeriod(tempvalues, 60 * 60 / 0.5);

    const avgHumidityInMinute = this.calculateAverageInTimePeriod(humidityvalues, 60 / 1);
    const avgHumidityInHour = this.calculateAverageInTimePeriod(humidityvalues, 60 * 60 / 1);
    const maxHumidityInHour = this.getMaxInTimePeriod(humidityvalues, 60 * 60 / 1);

    const avgProductCountInMinute = this.calculateAverageInTimePeriod(pcvalues, 60 / 5);
    const avgProductCountInHour = this.calculateAverageInTimePeriod(pcvalues, 60 * 60 / 5);
    const maxProductCountInHour = this.getMaxInTimePeriod(pcvalues, 60 * 60 / 5);


    console.log('Avg Temperature (minute): ', avgTemperatureInMinute);
    console.log('Avg Temperature (hour): ', avgTemperatureInHour);
    console.log('Max Temperature: ', maxTemperatureInHour);

    console.log('Avg Humidity (minute): ', avgHumidityInMinute);
    console.log('Avg Humidity (hour): ', avgHumidityInHour);
    console.log('Max Humidity: ', maxHumidityInHour);

    console.log('Avg Product Count (minute): ', avgProductCountInMinute);
    console.log('Avg Product Count (hour): ', avgProductCountInHour);
    console.log('Max Product Count: ', maxProductCountInHour);


    const values = {
      minuteAvg: { avgTemperatureInMinute, avgHumidityInMinute, avgProductCountInMinute },
      hourlyAvg: { avgTemperatureInHour, avgHumidityInHour, avgProductCountInHour },
      hourlyMax: { maxTemperatureInHour, maxHumidityInHour, maxProductCountInHour },

    };

    const pipeline = this.redisService.pipeline();

    //console.log('Sending averages and maximums', JSON.stringify(values), 'to Kafka...');
    pipeline.lpush('data', JSON.stringify(values));
    await pipeline.ltrim('data', 0, 9);
    await pipeline.exec();
    //console.log("a");
  }




  //calculate average values
  private calculateAverageInTimePeriod(data: any[], no_of_data: number): number {
    let sum = 0;
    if (data.length < no_of_data) {
      for (let i = 0; i < data.length; i++) {
        sum += parseFloat(data[i]);
      }
      //console.log("sum" + sum);
      return parseFloat((sum / data.length || 0).toFixed(2));
    }
    else {
      const length = data.length;
      const start = length - no_of_data;
      for (let i = start; i < length; i++) {
        sum += parseFloat(data[i]);
      }
      //console.log("test");
      return parseFloat((sum / data.length || 0).toFixed(2));
    }
  }


  //calculate maximum value
  private getMaxInTimePeriod(data: any[], no_of_data: number) {
    let max = -Infinity;
    if (data.length < no_of_data) {
      for (let i = 0; i < data.length; i++) {
        const value = parseFloat(data[i]);
        if (value > max) {
          max = value;
        }
        //console.log("max loop running");
      }
    } else {
      const length = data.length;
      const start = length - no_of_data;
      for (let i = start; i < length; i++) {
        const value = parseFloat(data[i]);
        if (value > max) {
          max = value;
        }
        //console.log("max loop running");
      }
    }

    return max;
  }



}