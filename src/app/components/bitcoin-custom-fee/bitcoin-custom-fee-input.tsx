import { useState } from 'react';

import { satToBtc } from '@leather-wallet/utils';
import { useField } from 'formik';
import { Stack } from 'leather-styles/jsx';

import type { TransferRecipient } from '@shared/models/form.model';
import { createMoney } from '@shared/models/money.model';

import { useOnMount } from '@app/common/hooks/use-on-mount';
import { InsufficientFundsError } from '@app/common/transactions/bitcoin/coinselect/local-coin-selection';
import { Input } from '@app/ui/components/input/input';

import { ErrorLabel } from '../error-label';
import { BitcoinCustomFeeFiat } from './bitcoin-custom-fee-fiat';
import { useBitcoinCustomFee } from './hooks/use-bitcoin-custom-fee';

const feeInputLabel = 'sats/vB';

interface Props {
  onClick?(): void;
  amount: number;
  isSendingMax: boolean;
  recipients: TransferRecipient[];
  hasInsufficientBalanceError: boolean;
  errorMessage?: string;
  setCustomFeeInitialValue?(value: string): void;
  customFeeInitialValue: string;
}

export function BitcoinCustomFeeInput({
  onClick,
  amount,
  isSendingMax,
  recipients,
  hasInsufficientBalanceError,
  setCustomFeeInitialValue,
  customFeeInitialValue,
}: Props) {
  const [field] = useField('feeRate');

  const [feeValue, setFeeValue] = useState<null | {
    fee: number;
    fiatFeeValue: string;
  }>(null);

  const getCustomFeeValues = useBitcoinCustomFee({
    amount: createMoney(amount, 'BTC'),
    isSendingMax,
    recipients,
  });
  const [unknownError, setUnknownError] = useState(false);
  const [customInsufficientBalanceError, setCustomInsufficientBalanceError] = useState(false);

  const hasError = hasInsufficientBalanceError || unknownError || customInsufficientBalanceError;
  const errorMessage =
    hasInsufficientBalanceError || customInsufficientBalanceError
      ? 'Insufficient funds'
      : 'Unknown error';

  function processFeeValue(feeRate: string) {
    try {
      const feeValues = getCustomFeeValues(Number(feeRate));
      setFeeValue(feeValues);

      setUnknownError(false);
      setCustomInsufficientBalanceError(false);
    } catch (err) {
      if (err instanceof InsufficientFundsError) {
        return setCustomInsufficientBalanceError(true);
      }

      setUnknownError(true);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCustomFeeInitialValue?.(e.target.value);
    processFeeValue(value);
  }

  useOnMount(() => {
    processFeeValue(customFeeInitialValue);
  });
  return (
    <Stack gap="space.05">
      <Stack>
        <Input.Root hasError={hasError}>
          <Input.Label>{feeInputLabel}</Input.Label>
          <Input.Field
            onClick={onClick}
            {...field}
            onChange={e => {
              field.onChange(e);
              onChange?.(e);
            }}
          />
        </Input.Root>
        {hasError && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </Stack>

      {!hasError && feeValue && (
        <BitcoinCustomFeeFiat
          feeInBtc={satToBtc(feeValue.fee).toString()}
          fiatFeeValue={feeValue.fiatFeeValue}
        />
      )}
    </Stack>
  );
}
