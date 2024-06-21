import { inject, injectable } from "inversify";
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';

import { AuthService } from "./auth-service.interface.js";
import { Component } from "../../types/component.enum.js";
import { Logger } from "../../libs/logger/logger.interface.js";
import { UserService } from "../user/user-service.interface.js";
import { Config } from "../../libs/config/config.interface.js";
import { RestSchema } from "../../libs/config/rest.schema.js";
import { UserEntity } from "../user/user.entity.js";
import { TokenPayload } from "./types/TokenPayload.js";
import { JWT_ALGORITHM, JWT_EXPIRED } from "./auth.constant.js";
import { LoginUserDto } from "../user/dto/login-user.dto.js";

@injectable()
export class DefaultAuthClass implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
