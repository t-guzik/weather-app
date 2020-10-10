import { HttpStatus } from '@nestjs/common';
import { BusinessErrorCode } from '../enums/business-error-code.enum';
import { BusinessError } from './business.error';

export const FORBIDDEN_DEFAULT_MESSAGE = 'Forbidden!';

export class ForbiddenError extends BusinessError {
  constructor(message = FORBIDDEN_DEFAULT_MESSAGE, details?: any) {
    super(message, HttpStatus.FORBIDDEN, BusinessErrorCode.NO_ACCESS_ERROR, { details });
  }
}
