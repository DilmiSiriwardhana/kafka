/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import Redis from 'ioredis';

@Controller('data')
export class DataController {
  private redis = new Redis();

  //temperature
  @Get('temp/avglastmin')
  async getTempLastMinAvg() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.avgTemperatureInMinute);
    return { value: values[0] };
  }

  @Get('temp/avglasthour')
  async getTempLastHourAvg() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.avgTemperatureInHour);
    return { value: values[0] };
  }

  @Get('temp/max')
  async getTempLastHourMax() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.maxTemperatureInHour);
    return { value: values[0] };
  }


  //humidity
  @Get('humidity/avglastmin')
  async getHumidityLastMinAvg() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.avgHumidityInMinute);
    return { value: values[0] };
  }

  @Get('humidity/avglasthour')
  async getHumidityLastHourAvg() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.avgHumidityInHour);
    return { value: values[0] };
  }

  @Get('humidity/max')
  async getHumidityLastHourMax() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.maxHumidityInHour);
    return { value: values[0] };
  }



  //product count
  @Get('pc/avglastmin')
  async getPCLastMinAvg() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.avgProductCountInMinute);
    return { value: values[0] };
  }

  @Get('pc/avglasthour')
  async getPCLastHourAvg() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.avgProductCountInHour);
    return { value: values[0] };
  }

  @Get('pc/max')
  async getPCLastHourMax() {
    const latestMetrics = await this.redis.lrange('data', 0, 1);
    const parsedlist = latestMetrics.map((serializedMessage) => JSON.parse(serializedMessage));
    const values = parsedlist.map((serializedMessage) => serializedMessage.maxProductCountInHour);
    return { value: values[0] };
  }

}
