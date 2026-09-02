import { useQuery } from '@tanstack/react-query';
import { bountyService } from '../../../services/bounties/bountyService';
import type { TBounty } from '../types';
import { transformBounty } from '../utils/transformBounty';

async function getBounties() {
  const response = await bountyService.getAllBounties();

  if (!response.success) {
    throw new Error(response.error);
  }

  const bounties = response.bounties as TBounty[];

  return bounties?.map(transformBounty);
}

export const useGetBounties = () => {
  return useQuery({
    queryKey: ['bounties'],
    queryFn: getBounties,
  });
};
