import { useMemo } from 'react';

import type { BtcCryptoAssetBalance, Money } from '@leather-wallet/models';
import { useNativeSegwitUtxosByAddress, useRunesEnabled } from '@leather-wallet/query';
import { isUndefined, sumNumbers } from '@leather-wallet/utils';
import BigNumber from 'bignumber.js';

import { createMoney } from '@shared/models/money.model';

import { useCurrentAccountNativeSegwitIndexZeroSigner } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';

function createBtcCryptoAssetBalance(balance: Money): BtcCryptoAssetBalance {
  return {
    availableBalance: balance,
    // TODO: Can we determine these here or are they nec?
    protectedBalance: createMoney(0, 'BTC'),
    uneconomicalBalance: createMoney(0, 'BTC'),
  };
}

export function useBtcCryptoAssetBalanceNativeSegwit(address: string) {
  const runesEnabled = useRunesEnabled();

  const {
    data: utxos,
    isInitialLoading,
    isLoading,
    isFetching,
  } = useNativeSegwitUtxosByAddress({
    address,
    filterInscriptionUtxos: true,
    filterPendingTxsUtxos: true,
    filterRunesUtxos: runesEnabled,
  });

  const balance = useMemo(() => {
    if (isUndefined(utxos))
      return createBtcCryptoAssetBalance(createMoney(new BigNumber(0), 'BTC'));
    return createBtcCryptoAssetBalance(
      createMoney(sumNumbers(utxos.map(utxo => utxo.value)), 'BTC')
    );
  }, [utxos]);

  return {
    balance,
    isInitialLoading,
    isLoading,
    isFetching,
  };
}

export function useCurrentBtcCryptoAssetBalanceNativeSegwit() {
  const nativeSegwitSigner = useCurrentAccountNativeSegwitIndexZeroSigner();
  return useBtcCryptoAssetBalanceNativeSegwit(nativeSegwitSigner.address);
}
