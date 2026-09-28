import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineEntity } from '../../entities';
import { MachineStatus } from '../machine';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);
  private client?: MqttClient;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(MachineEntity)
    private readonly machineRepo: Repository<MachineEntity>,
  ) {}

  onModuleInit() {
    const url = this.config.get<string>('MQTT_URL', 'mqtt://localhost:1883');
    const topic = this.config.get<string>(
      'MQTT_TOPIC',
      'factory/machines/+/status',
    );

    this.client = connect(url, {
      clientId: this.config.get<string>('MQTT_CLIENT_ID', 'mini-mes-server'),
    });

    this.client.on('connect', () => {
      this.logger.log(`MQTT connected: ${url}`);
      this.client?.subscribe(topic);
    });

    this.client.on('message', async (_topic, buffer) => {
      try {
        const data = JSON.parse(buffer.toString());
        if (!data.machineCode) return;

        const machine = await this.machineRepo.findOneBy({
          code: data.machineCode,
        });
        if (!machine) return;

        machine.status = data.status ?? MachineStatus.IDLE;
        machine.temperature = Number(data.temperature ?? machine.temperature);
        machine.speed = Number(data.speed ?? machine.speed);
        machine.productionCount = Number(
          data.productionCount ?? machine.productionCount,
        );
        machine.faultCode = data.faultCode ?? null;
        await this.machineRepo.save(machine);
      } catch (error) {
        this.logger.error(`Invalid MQTT payload: ${error}`);
      }
    });
  }

  publish(topic: string, payload: unknown) {
    this.client?.publish(topic, JSON.stringify(payload));
  }

  onModuleDestroy() {
    this.client?.end();
  }
}
