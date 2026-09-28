const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL || 'mqtt://localhost:1883');
const machineCode = process.env.MACHINE_CODE || 'MCH-001';

let count = 0;

client.on('connect', () => {
  console.log('Machine simulator connected');
  setInterval(() => {
    count += 1;
    const payload = {
      machineCode,
      status: 'RUNNING',
      temperature: Number((55 + Math.random() * 10).toFixed(2)),
      speed: Math.floor(1200 + Math.random() * 300),
      productionCount: count,
      faultCode: null,
      timestamp: new Date().toISOString()
    };
    client.publish(`factory/machines/${machineCode}/status`, JSON.stringify(payload));
    console.log(payload);
  }, 2000);
});
