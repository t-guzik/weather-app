import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '../../config/config.service';

export const configureSwagger = (app: NestExpressApplication, config: ConfigService) => {
  const { apiVersion } = config.getServerConfig();
  const options = new DocumentBuilder().setTitle('Weather app API').setVersion(`${apiVersion}.0`).build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      docExpansion: 'none',
      syntaxHighlight: {
        theme: 'arta',
      },
    },
  });
};
