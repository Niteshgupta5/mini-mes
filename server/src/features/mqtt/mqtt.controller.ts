import { Body, Controller, Post } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly service: MqttService) {}

  @Post('publish')
  publish(@Body() body: { topic: string; payload: unknown }) {
    this.service.publish(body.topic, body.payload);
    return { message: 'Published' };
  }
}
