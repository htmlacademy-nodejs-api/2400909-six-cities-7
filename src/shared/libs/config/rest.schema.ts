import convict from 'convict';

export type RestSchema = {
  PORT: number;
}

export const configRestSchemd = convict<RestSchema> ({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
});
