import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://user:8QciDoXBLzYRJItv@rabbitmq-1693989778.global-war.svc.cluster.local:5672'],
            queue: 'user',
        },
    });

    app.startAllMicroservices()
    await app.listen(3000);
}
bootstrap();

