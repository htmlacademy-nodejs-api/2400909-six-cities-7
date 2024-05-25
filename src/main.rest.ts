import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication } from './cli/rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer());

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
