import { useCalculateBitcoinFiatValue } from '@leather-wallet/query';
import { truncateMiddle } from '@leather-wallet/utils';

import { formatMoney, i18nFormatCurrency } from '@app/common/money/format-money';
import { usePsbtSignerContext } from '@app/features/psbt-signer/psbt-signer.context';

import { PsbtAddressTotalItem } from './psbt-address-total-item';
import { PsbtInscription } from './psbt-inscription';

interface PsbtAddressTotalsProps {
  showNativeSegwitTotal: boolean;
}
export function PsbtAddressTransferTotals({ showNativeSegwitTotal }: PsbtAddressTotalsProps) {
  const { accountInscriptionsBeingTransferred, addressNativeSegwit, addressNativeSegwitTotal } =
    usePsbtSignerContext();
  const calculateBitcoinFiatValue = useCalculateBitcoinFiatValue();

  const isTransferringInscriptions = accountInscriptionsBeingTransferred?.length > 0;

  return (
    <>
      {showNativeSegwitTotal ? (
        <PsbtAddressTotalItem
          hoverLabel={addressNativeSegwit}
          subtitle={truncateMiddle(addressNativeSegwit)}
          subValue={i18nFormatCurrency(calculateBitcoinFiatValue(addressNativeSegwitTotal))}
          value={formatMoney(addressNativeSegwitTotal)}
        />
      ) : null}
      {isTransferringInscriptions
        ? accountInscriptionsBeingTransferred.map(inscription => (
            <PsbtInscription key={inscription.id} inscription={inscription} />
          ))
        : null}
    </>
  );
}
