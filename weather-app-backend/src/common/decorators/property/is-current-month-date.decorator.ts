import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime, Interval } from 'luxon';

export const IsCurrentMonthDate = (validationOptions?: ValidationOptions) => (object: { [key: string]: any }, propertyName: string) => {
  registerDecorator({
    name: 'isCurrentMonthDate',
    target: object.constructor,
    propertyName,
    options: {
      message: 'The date is not in the current month',
      ...validationOptions,
    },
    validator: {
      validate(value: string) {
        const date = DateTime.fromISO(value);
        const startOfMonth = DateTime.local().startOf('month');
        const endOfMonth = DateTime.local().endOf('month');

        return Interval.fromDateTimes(startOfMonth, endOfMonth).contains(date);
      },
    },
  });
};
