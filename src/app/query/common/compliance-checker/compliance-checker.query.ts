import { ensureArray } from '@leather-wallet/utils';
import { type UseQueryOptions, useQueries } from '@tanstack/react-query';
import axios from 'axios';

import type { BitcoinNetworkModes } from '@shared/constants';
import { analytics } from '@shared/utils/analytics';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useCurrentAccountNativeSegwitIndexZeroSigner } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';
import { useCurrentNetwork } from '@app/store/networks/networks.selectors';

const checkApi = 'https://api.chainalysis.com/api/risk/v2/entities';

const headers = {
  // Known public key, do not open a vulnerability report for this
  Token: '51d3c7529eb08a8c62d41d70d006bdcd4248150fbd6826d5828ac908e7c12073',
};

export const isComplianceCheckEnabled = true;

async function registerEntityAddressComplianceCheck(address: string) {
  const resp = await axios.post(checkApi, { address }, { headers });
  return resp.data;
}

async function checkEntityAddressComplianceCheck(address: string) {
  const resp = await axios.get(checkApi + '/' + address, { headers });
  return resp.data;
}

type ComplianceReportSeverity = 'None' | 'Low' | 'Moderate' | 'Severe';

interface ComplianceReport {
  risk: ComplianceReportSeverity;
  isOnSanctionsList: boolean;
}
export async function checkEntityAddressIsCompliant(address: string): Promise<ComplianceReport> {
  await registerEntityAddressComplianceCheck(address);
  const entityReport = await checkEntityAddressComplianceCheck(address);

  const isOnSanctionsList = entityReport.risk === 'Severe';

  if (isOnSanctionsList) void analytics.track('non_compliant_entity_detected', { address });

  // TEMP: mock falsy value during investigation phase
  return { ...entityReport, isOnSanctionsList: false };
}

const oneWeekInMs = 604_800_000;

function makeComplianceQuery(
  address: string,
  network: BitcoinNetworkModes
): UseQueryOptions<ComplianceReport> {
  return {
    enabled: network === 'mainnet',
    queryKey: ['address-compliance-check', address],
    async queryFn() {
      return checkEntityAddressIsCompliant(address);
    },
    cacheTime: Infinity,
    staleTime: oneWeekInMs,
    refetchInterval: oneWeekInMs,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };
}

function useCheckAddressComplianceQueries(addresses: string[]) {
  const network = useCurrentNetwork();
  return useQueries({
    queries: addresses.map(address =>
      makeComplianceQuery(address, network.chain.bitcoin.bitcoinNetwork)
    ),
  });
}

export function useBreakOnNonCompliantEntity(address: string | string[]) {
  const analytics = useAnalytics();
  const nativeSegwitSigner = useCurrentAccountNativeSegwitIndexZeroSigner();

  const complianceReports = useCheckAddressComplianceQueries([
    nativeSegwitSigner.address,
    ...ensureArray(address),
  ]);

  if (!isComplianceCheckEnabled) return;

  if (complianceReports.some(report => report.data?.isOnSanctionsList)) {
    void analytics.track('non_compliant_entity_detected');
    // TEMP: disabled
    // throw new Error('Unable to handle request, errorCode: 1398');
  }
}
