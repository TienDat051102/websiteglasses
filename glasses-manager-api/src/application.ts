import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {JWTAuthenticationComponent} from '@loopback/authentication-jwt';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import path from 'path';

import {EmailController} from './controllers';
import {TokenServiceBindings} from './keys';
import {MySequence} from './sequence';

// services
import {CustomerJWTService} from './services';
import {EmailService} from './services/email.service';
import {JWTService} from './services/jwt.service';

// strategies
import './strategies/customer-jwt.strategy';
import {CustomerJWTStrategy} from './strategies/customer-jwt.strategy';
import {JWTStrategy} from './strategies/jwt.strategy';

dotenv.config();

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

export const PackageKey = BindingKey.create<PackageInfo>('application.package');
const pkg: PackageInfo = require('../package.json');

export {ApplicationConfig};

export class Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // ================= COMPONENT =================
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.component(AuthorizationComponent);

    // ================= CONTROLLER =================
    this.controller(EmailController);

    // ================= SERVICES =================
    this.bind('services.EmailService').toClass(EmailService);
    this.bind('services.JWTService').toClass(JWTService); // admin
    this.bind('services.CustomerJWTService').toClass(CustomerJWTService); // customer

    // ================= STRATEGY (🔥 QUAN TRỌNG NHẤT) =================
    registerAuthenticationStrategy(this, JWTStrategy);

    registerAuthenticationStrategy(this, CustomerJWTStrategy);
    this.sequence(MySequence);

    this.static('/uploads', path.join(__dirname, '../public/uploads'));
    this.static('/', path.join(__dirname, '../public'));

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      strategies: {
        dirs: ['strategies'],
        extensions: ['.strategy.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      process.env.JWT_EXPIRY_TIME || '21600',
    );
  }
}
