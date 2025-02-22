import { fetchInscripionById, useOrdinalsbotClient } from '@leather-wallet/query';
import { useQueries } from '@tanstack/react-query';

import { useAppDispatch } from '@app/store';
import {
  brc20OrderNotFound,
  brc20TransferAwaitingIndexer,
  brc20TransferPaid,
  brc20TransferReady,
  usePendingBrc20TransferEntities,
} from '@app/store/ordinals/ordinals.slice';

export function useCheckOrderStatuses(ids: string[]) {
  const ordinalsbotClient = useOrdinalsbotClient();

  const transferMap = usePendingBrc20TransferEntities();
  const dispatch = useAppDispatch();

  return useQueries({
    queries: ids.map(id => ({
      queryKey: ['check-order-status', id],
      queryFn: async () => ordinalsbotClient.orderStatus(id),
      async onSuccess({ data }: Awaited<ReturnType<typeof ordinalsbotClient.orderStatus>>) {
        if (data.status === 'error') {
          if (data.error.includes('no such order')) {
            dispatch(brc20OrderNotFound({ id }));
          }
          return;
        }

        const entry = transferMap[data.id];

        if (!entry) return;

        const file = data.files[0];

        // inscription reported by service
        if ('tx' in file) {
          // see if its on hiro indexer
          try {
            const { data: inscription } = await fetchInscripionById(file.tx?.inscription ?? '');
            // use number to determine legit
            if (inscription.number) {
              dispatch(
                brc20TransferReady({
                  id: data.id,
                  inscriptionId: file.tx?.inscription ?? '',
                })
              );
              return;
            }
          } catch (error) {}

          // or say awaiting indexer
          dispatch(brc20TransferAwaitingIndexer({ id: data.id }));
          return;
        }

        if (data.paid && entry.status !== 'paid') {
          dispatch(brc20TransferPaid({ id: data.id }));
          return;
        }
      },
      refetchInterval: 30000,
      refetchOnMount: true,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    })),
  });
}
