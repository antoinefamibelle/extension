import { Money } from '@shared/models/money.model';
import { isFunction } from '@shared/utils';

import { FormErrorMessages } from '@app/common/error-messages';

export function formatErrorWithSymbol(symbol: string, error: string) {
  return error.replace('{symbol}', symbol);
}

export function formatPrecisionError(num?: Money) {
  if (!num) return FormErrorMessages.CannotDeterminePrecision;
  const error = FormErrorMessages.TooMuchPrecision;
  return formatErrorWithSymbol(num.symbol, error).replace('{decimals}', String(num.decimals));
}

export function formatInsufficientBalanceError(
  sum?: Money,
  formatterFn?: (amount: Money) => string
) {
  if (!sum) return FormErrorMessages.CannotDetermineBalance;
  const isAmountLessThanZero = sum.amount.lt(0);

  const formattedAmount = isFunction(formatterFn) ? formatterFn(sum) : sum.amount.toString(10);

  return `${FormErrorMessages.InsufficientBalance} ${
    isAmountLessThanZero ? '0' : formattedAmount
  } ${sum.symbol}`;
}
