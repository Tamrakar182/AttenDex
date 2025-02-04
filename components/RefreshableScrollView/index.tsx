import { ScrollView, RefreshControl, ScrollViewProps } from 'react-native';
import { useQueryClient, QueryKey } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

interface RefreshableScrollViewProps extends ScrollViewProps {
    children: React.ReactNode;
    queryKeysToRefresh?: QueryKey[];
}

const RefreshableScrollView: React.FC<RefreshableScrollViewProps> = ({
    children,
    queryKeysToRefresh,
    ...props
}) => {
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
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            {...props}
        >
            {children}
        </ScrollView>
    );
};

export default RefreshableScrollView;