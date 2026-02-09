import { useQuery } from "@tanstack/react-query";
import { create, windowedFiniteBatchScheduler } from "@yornaath/batshit";
import { tools } from "@/api/proto/bundle";
import { findUserDetails, type UserDto } from "@/api/rest";

import User = tools.simrail.backend.User;
import UserPlatform = tools.simrail.backend.UserPlatform;

/**
 * Mapping between the user platforms returned by protobuf to their dto representation.
 */
const userPlatformMapping: Record<UserPlatform, UserDto["platform"]> = {
  [UserPlatform.STEAM]: "STEAM",
  [UserPlatform.XBOX]: "XBOX",
} as const;

/**
 * Batcher for user details requests.
 */
const userBatcher = create({
  name: "user_load_batcher",
  fetcher: async (users: Array<UserDto>) => {
    const response = await findUserDetails({ body: users });
    return response ?? [];
  },
  scheduler: windowedFiniteBatchScheduler({ windowMs: 250, maxBatchSize: 250 }),
  resolver: (users, query) => users.find(user => user.id === query.id && user.platform === query.platform),
});

/**
 * Returns a query hook that fetches the user data within a batch request frame.
 * @param user the user to request information of.
 */
export const useUserData = (user: User | null | undefined) => {
  return useQuery({
    enabled: !!user,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
    queryKey: ["user_data", user?.platform, user?.id],
    queryFn: async ({ queryKey }) => {
      const [, platform, id] = queryKey as [string, UserPlatform, string];
      const userDto: UserDto = { id: id, platform: userPlatformMapping[platform] };
      const userData = await userBatcher.fetch(userDto);
      if (!userData) {
        throw new Error(`Backend returned no data for user ${userDto}`);
      }

      return userData;
    },
  });
};
