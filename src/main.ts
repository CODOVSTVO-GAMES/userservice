import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://gw:gw@109.172.89.4:12123'],
            queue: 'user',
        },
    });

    app.startAllMicroservices()
    await app.listen(3000);
}
bootstrap();

