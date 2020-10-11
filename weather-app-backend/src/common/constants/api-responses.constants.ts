import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { ApiResponseMetadata } from '@nestjs/swagger';
import { SuccessResponse } from '../responses/success.response';

interface ApiResponsesInterface {
  BAD_REQUEST: ApiResponseMetadata;
  INTERNAL_SERVER_ERROR: ApiResponseMetadata;
  NOT_FOUND: ApiResponseMetadata;
  OK: {
    FETCHED: (returnedType: Constructor<any>) => ApiResponseMetadata;
    UPDATED: ApiResponseMetadata;
  };
}

export const API_RESPONSES: ApiResponsesInterface = {
  BAD_REQUEST: { description: 'Validation failed' },
  INTERNAL_SERVER_ERROR: { description: 'Internal error e.g. database connection error' },
  NOT_FOUND: { description: 'Data not found' },
  OK: {
    FETCHED: (returnedType: Constructor<any>) => ({ description: `${returnedType.name} successfully fetched`, type: returnedType }),
    UPDATED: { description: 'Data successfully updated', type: SuccessResponse },
  },
};
