import { google } from "googleapis";

export const authGoogle = (refresh_token: string | null) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.GOOGLE_CALLBACK,
  );

  oauth2Client.setCredentials({
    refresh_token,
  });

  google.options({
    auth: oauth2Client,
  });
};
