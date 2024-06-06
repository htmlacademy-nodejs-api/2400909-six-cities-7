import { Request } from 'express';

import { RequestBody } from '../../libs/rest/types/request-body.type.js';
import { RequestParams } from '../../libs/rest/types/request.perems.type.js';
import { LoginUserDto } from './dto/login-user.dto.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
