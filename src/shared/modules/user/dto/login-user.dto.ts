import { IsEmail, IsString, Length } from 'class-validator';

import { CreateLoginMessages } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: CreateLoginMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateLoginMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateLoginMessages.password.lengthField })
  public password: string;
}
