import { ChangeEvent } from 'react';

import { isDefined, isUndefined } from '@leather-wallet/utils';
import { SwapSelectors } from '@tests/selectors/swap.selectors';
import BigNumber from 'bignumber.js';
import { useField, useFormikContext } from 'formik';
import { Stack, styled } from 'leather-styles/jsx';

import { createMoney } from '@shared/models/money.model';

import { useShowFieldError } from '@app/common/form-utils';
import { convertAmountToFractionalUnit } from '@app/common/money/calculate-money';
import { formatMoneyWithoutSymbol } from '@app/common/money/format-money';

import { SwapFormValues } from '../../../hooks/use-swap-form';
import { useSwapContext } from '../../../swap.context';

function getPlaceholderValue(name: string, values: SwapFormValues) {
  if (name === 'swapAmountBase' && isDefined(values.swapAssetBase)) return '0';
  if (name === 'swapAmountQuote' && isDefined(values.swapAssetQuote)) return '0';
  return '-';
}

interface SwapAmountFieldProps {
  amountAsFiat?: string;
  isDisabled?: boolean;
  name: string;
}
export function SwapAmountField({ amountAsFiat, isDisabled, name }: SwapAmountFieldProps) {
  const { fetchQuoteAmount, isFetchingExchangeRate, onSetIsSendingMax } = useSwapContext();
  const { setFieldError, setFieldValue, values } = useFormikContext<SwapFormValues>();
  const [field] = useField(name);
  const showError = useShowFieldError(name) && name === 'swapAmountBase' && values.swapAssetQuote;

  async function onBlur(event: ChangeEvent<HTMLInputElement>) {
    const { swapAssetBase, swapAssetQuote } = values;
    if (isUndefined(swapAssetBase) || isUndefined(swapAssetQuote)) return;
    onSetIsSendingMax(false);
    const value = event.currentTarget.value;
    const toAmount = await fetchQuoteAmount(swapAssetBase, swapAssetQuote, value);
    if (isUndefined(toAmount)) {
      await setFieldValue('swapAmountQuote', '');
      return;
    }
    const toAmountAsMoney = createMoney(
      convertAmountToFractionalUnit(
        new BigNumber(toAmount),
        values.swapAssetQuote?.balance.decimals
      ),
      values.swapAssetQuote?.balance.symbol ?? '',
      values.swapAssetQuote?.balance.decimals
    );
    await setFieldValue('swapAmountQuote', formatMoneyWithoutSymbol(toAmountAsMoney));
    setFieldError('swapAmountQuote', undefined);
  }

  return (
    <Stack alignItems="flex-end" gap="space.01" width={['50%', '60%']}>
      <styled.input
        _disabled={{
          color: 'ink.text-subdued',
        }}
        autoComplete="off"
        bg="ink.background-primary"
        border="none"
        color={showError ? 'red.action-primary-default' : 'ink.text-primary'}
        data-testid={SwapSelectors.SwapAmountInput}
        display="block"
        disabled={isDisabled || isFetchingExchangeRate}
        id={name}
        maxLength={15}
        p="0px"
        placeholder={getPlaceholderValue(name, values)}
        ring="none"
        textAlign="right"
        textStyle="heading.05"
        width="100%"
        {...field}
        onBlur={async e => {
          field.onBlur(e);
          await onBlur(e);
        }}
      />
      {amountAsFiat ? (
        <styled.span color={showError ? 'error' : 'ink.text-subdued'} textStyle="caption.01">
          {amountAsFiat}
        </styled.span>
      ) : null}
    </Stack>
  );
}
