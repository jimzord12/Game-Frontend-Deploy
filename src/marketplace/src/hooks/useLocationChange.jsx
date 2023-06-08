import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function useLocationChange(queryKeys = []) {
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (queryKeys.length > 0) {
      queryClient.invalidateQueries(queryKeys);
    } else {
      queryClient.invalidateQueries();
    }
  }, [location.pathname, queryKeys]);

  return location;
}
