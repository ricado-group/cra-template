import { Controllers, Models } from "@ricado/api-client";
import { authCookieManager, ModelSerializer } from "@ricado/core-ui";
import { useQuery } from "react-query";

export type IUserAccountModel = {
  -readonly [P in keyof Models.UserAccountModel]: Models.UserAccountModel[P];
};

async function getCurrentUser(): Promise<IUserAccountModel> {
  const user = await Controllers.UserAccountController.getCurrent();
  return ModelSerializer.toJSON(user);
}

export function useCurrentUser() {
  return useQuery<IUserAccountModel, Error>("currentUser", getCurrentUser, {
    onSuccess: (user) => authCookieManager.setUser(user),
  });
}
