import { auth, signOut } from "auth";
import { Button } from "@/components/ui/button";

import Navbar from "@/components/navbar";
import Splash from "@/components/splash";
import Testimonial from "@/components/testimonial";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <>
      {!session ? (
        <>
          <Navbar />
          <Splash />
          <main className="w-full">
            <div className="w-4/5 ml-[10%] mr-[10%]">
              <h2>Testimonials</h2>

              <div className="w-full flex items-center justify-between gap-16">
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
          </main>
        </>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </>
      )}
    </>
  );
}
