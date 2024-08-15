import { auth } from "auth";
import { google } from "googleapis";

export default async function Dashboard() {
  const session = await auth();

  if (session) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      process.env.GOOGLE_CALLBACK,
    );
    oauth2Client.setCredentials({
      access_token: session.access_token,
    });

    const classroom = google.classroom("v1");

    google.options({
      auth: oauth2Client,
    });
  }

  return <main>Dashboard</main>;
}
