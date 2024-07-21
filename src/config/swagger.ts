import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for commercial-automation',
    },
    basePath: '/api',
  },
  apis: [path.resolve(__dirname, '../routes/*.ts')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
