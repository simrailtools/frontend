import { useQuery } from "@tanstack/react-query";
import { create, windowedFiniteBatchScheduler } from "@yornaath/batshit";
import { type User, UserPlatform } from "@/api/proto/event_bus_pb.ts";
import { findUserDetails, type UserDto } from "@/api/rest";

/**
 * Maps the given user platform to its corresponding DTO representation.
 * @param platform the platform to map.
 */
function mapUserPlatformToDto(platform: UserPlatform): UserDto["platform"] {
  switch (platform) {
    case UserPlatform.XBOX:
      return "XBOX";
    case UserPlatform.STEAM:
      return "STEAM";
  }
}

/**
 * Batcher for user details requests.
 */
const userBatcher = create({
  name: "user_load_batcher",
  fetcher: async (users: UserDto[]) => {
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
      const userDto: UserDto = { id: id, platform: mapUserPlatformToDto(platform) };
      const userData = await userBatcher.fetch(userDto);
      if (!userData) {
        throw new Error(`Backend returned no data for user ${userDto}`);
      }

      return userData;
    },
  });
};
