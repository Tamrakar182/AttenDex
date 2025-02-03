import { forwardRef, useCallback, useState } from 'react';
import { RefreshControl, FlatList, FlatListProps } from 'react-native';
import { useQueryClient, QueryKey } from '@tanstack/react-query';

type RefreshableFlatListProps<T> = Omit<FlatListProps<T>, 'refreshControl'> & {
  queryKeysToRefresh?: QueryKey[];
};

function RefreshableFlatListInner<T>(
  props: RefreshableFlatListProps<T>,
  ref: React.Ref<FlatList<T>>
) {
  const { queryKeysToRefresh, ...flatListProps } = props;
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (queryKeysToRefresh && queryKeysToRefresh.length > 0) {
        await Promise.all(
          queryKeysToRefresh.map(queryKey =>
            queryClient.refetchQueries({ queryKey })
          )
        );
      } else {
        await queryClient.refetchQueries();
      }
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, queryKeysToRefresh]);

  return (
    <FlatList
      ref={ref}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...flatListProps}
    />
  );
}

const RefreshableFlatList = forwardRef(RefreshableFlatListInner) as <T>(
  props: RefreshableFlatListProps<T> & { ref?: React.Ref<FlatList<T>> }
) => React.ReactElement;

export default RefreshableFlatList;