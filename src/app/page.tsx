import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "auth";

import Navbar from "@/components/navbar/navbar";
import Splash from "@/components/splash";
import Testimonial from "@/components/testimonial";
import Line from "@/components/line";
import Footer from "@/components/footer";

import { db } from "db";
import { accounts, users } from "@/drizzle/schema";
import { eq, SQL } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Home | ByteClass",
};

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  // First query the users table, then we add a user, query it again to verify the user was added, delete that same user,
  // then we query the users table to verify that teh query happened.
  console.log("------------------ INITIAL DATA ------------------");
  console.log(await db.select().from(users));

  console.log("------------------ INSERT INTO TABLE ------------------");

  console.log(
    await db.insert(users).values({
      id: "rick_id69420",
      name: "Rick Astley",
      email: "rickastley@astleyrick.com",
      emailVerified: new Date(1966, 1, 6),
      image:
        "https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=1000&h=667&crop=1&resize=1000%2C667",
    }),
  );

  console.log("------------------ DATA AFTER INSERT ------------------");
  console.log(await db.select().from(users));
  console.log("------------------ DELETED USERS ------------------");
  console.log(await db.delete(users).where(eq(users.name, "Rick Astley")));
  console.log(
    "------------------ DATA AFTER DELETE USER RICK ASTLEY ------------------",
  );
  console.log(await db.select().from(users));

  return (
    <>
      <Navbar />
      <Splash />
      <main className="flex w-full flex-col gap-20 pb-8 pt-8">
        <div className="ml-[10%] mr-[10%] w-4/5">
          <h2 className="text-center text-5xl font-bold">Testimonials</h2>

          <div className="mt-20 flex w-full items-center justify-between gap-16">
            <Testimonial
              name="Siddhesh Zantye"
              quote="This app changed my life."
              image="siddhesh.jpg"
            />
            <Testimonial
              name="Jauhar Goga"
              quote="This app is the reason I did not kill myself. Without this app, I would be homeless, working for a homeless troll doll. This app saved me. Please use it :)"
              image="jauhar.jpg"
            />
            <Testimonial
              name="Siddharth Sahadew"
              quote="This app is so good please use so I can get rich 🤑💸💰🐒"
              image="siddharth.jpg"
            />
          </div>
        </div>

        <Line />

        <div className="ml-[10%] mr-[10%] flex w-4/5 items-center">
          <h2 className="flex-1 text-left text-5xl font-bold">Who Are We?</h2>
          <p className="flex-[3]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            consectetur varius nunc nec ornare. Aliquam at diam justo. Aliquam
            leo ante, elementum id auctor at, porttitor a ante. Nullam ultrices
            congue ligula. Maecenas tincidunt nec risus eget euismod. Morbi ac
            ligula arcu. Phasellus euismod elit vel libero tincidunt
            sollicitudin. Fusce egestas dolor ut eros condimentum, id sagittis
            magna finibus. Donec luctus fringilla mauris quis dignissim. Ut
            iaculis augue diam, eget sollicitudin libero ullamcorper eget. Ut
            libero augue, hendrerit eu sem a, venenatis ornare justo. Etiam
            euismod dignissim nunc nec blandit. Praesent imperdiet non nisi
            interdum porttitor. Aliquam varius ante eget.
          </p>
        </div>

        <Line />

        <div className="ml-[10%] mr-[10%] w-4/5 text-center">
          <h2 className="text-5xl font-bold">Our Mission</h2>
          <p className="mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a elit
            quis nulla venenatis mattis sed sit amet ex. In quis libero
            tristique, rhoncus est a, auctor tortor. Suspendisse egestas enim
            nec gravida ultrices. Phasellus ornare sem vitae enim accumsan, eu
            varius turpis varius. Nam risus neque, ornare vitae mi sit amet,
            fermentum vestibulum nisl. Curabitur dignissim ac sem ac eleifend.
            Nulla pharetra, enim at ullamcorper egestas, nisi purus mollis
            metus, a laoreet massa risus eu massa. Nam velit nibh, aliquet non
            sollicitudin et, vehicula eu magna. Sed non pharetra augue. Integer
            malesuada placerat metus ac gravida. Proin laoreet libero vitae
            pellentesque viverra. Nulla facilisi. Aliquam luctus tincidunt
            turpis, non accumsan nulla euismod a.
          </p>
          <p className="mt-4">
            Curabitur at tristique ex, in efficitur purus. Aliquam quis
            fringilla enim. In at arcu at quam rutrum aliquam quis sit amet
            massa. Praesent vestibulum nisi quam, eu fringilla libero pulvinar
            sagittis. Nulla facilisi. Nullam fermentum nulla nec augue viverra,
            et faucibus metus euismod. Sed pulvinar egestas risus, consectetur
            interdum purus imperdiet id. Nam volutpat, ligula et lacinia
            scelerisque, lacus magna mattis metus, nec gravida lorem mauris vel
            tortor. Vestibulum rhoncus massa orci, non vehicula quam eleifend
            non. Praesent sed nulla dolor. Aenean sit amet leo vel.
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
}
