import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { ApiResponseMetadata } from '@nestjs/swagger';
import { SuccessResponse } from '../responses/success.response';

interface ApiResponsesInterface {
  BAD_REQUEST: ApiResponseMetadata;
  CONFLICT: ApiResponseMetadata;
  CREATED: (returnedType?: Constructor<any>) => ApiResponseMetadata;
  FORBIDDEN: ApiResponseMetadata;
  INTERNAL_SERVER_ERROR: ApiResponseMetadata;
  NO_CONTENT: {
    DELETED: ApiResponseMetadata;
  };
  NOT_FOUND: ApiResponseMetadata;
  OK: {
    FETCHED: (returnedType: Constructor<any>) => ApiResponseMetadata;
    UPDATED: ApiResponseMetadata;
  };
  UNAUTHORIZED: ApiResponseMetadata;
}

export const API_RESPONSES: ApiResponsesInterface = {
  BAD_REQUEST: { description: 'Validation failed' },
  CONFLICT: { description: 'Data already exists' },
  CREATED: (returnedType: Constructor<any> = SuccessResponse) => ({ description: 'Data successfully inserted', type: returnedType }),
  FORBIDDEN: { description: 'Forbidden' },
  INTERNAL_SERVER_ERROR: { description: 'Internal error e.g. database connection error' },
  NO_CONTENT: {
    DELETED: { description: 'Data successfully deleted' },
  },
  NOT_FOUND: { description: 'Data not found' },
  OK: {
    FETCHED: (returnedType: Constructor<any>) => ({ description: `${returnedType.name} successfully fetched`, type: returnedType }),
    UPDATED: { description: 'Data successfully updated', type: SuccessResponse },
  },
  UNAUTHORIZED: { description: 'Unauthorized' },
};
