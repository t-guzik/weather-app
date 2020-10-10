import { HttpStatus } from '@nestjs/common';
import { BusinessErrorCode } from '../enums/business-error-code.enum';
import { BusinessError } from './business.error';

export const UNAUTHORIZED_DEFAULT_MESSAGE = 'Unauthorized';

export class UnauthorizedError extends BusinessError {
  constructor(msg: string = UNAUTHORIZED_DEFAULT_MESSAGE, details?: any) {
    super(msg, HttpStatus.UNAUTHORIZED, BusinessErrorCode.UNAUTHORIZED_ERROR, { details });
  }
}
