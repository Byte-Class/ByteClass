import { createContext } from "react";

export const GoogleOAuthContext = createContext<null | OAuth2Client>(null);
