import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bountyService } from '../../../services/bounties/bountyService';
import type { CreateBountyPayload } from '../types';

const createBounty = async (payload: CreateBountyPayload) => {
  const response = await bountyService.createBounty(payload);

  if (!response.success) {
    throw new Error(response.error || 'Something went wrong');
  }
};

export const useCreateBounty = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateBountyPayload>({
    mutationFn: createBounty,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bounties'] });
    },
  });
};
