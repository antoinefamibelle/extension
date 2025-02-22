import { useMemo } from 'react';

import { isString } from '@leather-wallet/utils';

import { initialSearchParams } from '@app/common/initial-search-params';

export function useDefaultRequestParams() {
  return useMemo(() => {
    const origin = initialSearchParams.get('origin');
    const tabId = initialSearchParams.get('tabId');
    const flow = initialSearchParams.get('flow');

    return {
      origin,
      flow,
      tabId: isString(tabId) ? parseInt(tabId) : tabId,
    };
  }, []);
}
