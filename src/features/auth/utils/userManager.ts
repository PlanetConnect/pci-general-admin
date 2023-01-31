import { UserManager } from "oidc-client-ts";

import { CLIENT_ID, DOMAIN_NAME, ISSUER, SCOPE } from "~/app/data/vars";

export const userManager = new UserManager({
  authority: ISSUER,
  client_id: CLIENT_ID,
  redirect_uri: `${DOMAIN_NAME}/callback`,
  response_type: "code",
  scope: SCOPE,
  // revokeTokenTypes: ["refresh_token"],
  automaticSilentRenew: false,
  loadUserInfo: true,
  // filterProtocolClaims: true
});
