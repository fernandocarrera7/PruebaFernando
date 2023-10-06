import type { AWS } from '@serverless/typescript';

import createProduct from '@functions/createProduct';
import findProduct from '@functions/findProduct';
import swapi from '@functions/swapi';

const serverlessConfiguration: AWS = {
  service: 'reto-fernando',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      REGION: "${self:provider.region}",
      PRODUCT_TABLE: "ProductTable",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource:
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PRODUCT_TABLE}",
      },
      {
        Effect: "Allow",
        Action: "https://swapi.py4e.com/*",
        Resource: "*"
      }
    ],

  },
  // import the function via paths
  functions: { createProduct,findProduct ,swapi},
  resources: {
    Resources: {
      ProductTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.PRODUCT_TABLE}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          StreamSpecification: {
            StreamViewType: "NEW_IMAGE",
          },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 9000,
    },
  },
};

module.exports = serverlessConfiguration;
