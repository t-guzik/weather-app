import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { ApiResponseMetadata } from '@nestjs/swagger';

interface ApiResponsesInterface {
  BAD_REQUEST: ApiResponseMetadata;
  INTERNAL_SERVER_ERROR: ApiResponseMetadata;
  NOT_FOUND: ApiResponseMetadata;
  OK: (returnedType?: Constructor<any>, isArray?: boolean) => ApiResponseMetadata;
}

export const API_RESPONSES: ApiResponsesInterface = {
  BAD_REQUEST: { description: 'Validation failed' },
  INTERNAL_SERVER_ERROR: { description: 'Internal error e.g. database connection error' },
  NOT_FOUND: { description: 'Data not found' },
  OK: (returnedType?: Constructor<any>, isArray = false) => ({ description: `Data successfully fetched`, type: returnedType, isArray }),
};
