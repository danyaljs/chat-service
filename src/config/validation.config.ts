import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from '@hapi/joi';

export const validatinConfig: ConfigModuleOptions = { // validate .env file
    validationSchema: Joi.object({
      DB_HOST: Joi.required(),
      DB_PORT: Joi.required(),
      DB_USERNAME: Joi.required(),
      DB_PASSWORD: Joi.required(),
      DB_DATABASE: Joi.required(),
      PORT: Joi.required(),
      NODE_ENV: Joi.required(),
      WEBSOCKET_PORT:Joi.required()
    }),
  }