import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
});
