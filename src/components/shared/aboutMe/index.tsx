import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = () => {
  return (
    <section className="bg-white dark:bg-gray-900 mt-10">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h3 className="text-xl text-center font-bold">About Me</h3>

        <main className="relative w-full z-10 mt-8 md:flex md:items-center xl:mt-12">
          <div className="absolute w-full bg-slate-200 -z-10 md:h-96 rounded-2xl"></div>

          <div className="w-full p-6 bg-slate-200 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
            <Image
              className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
              src="/projects/task_manager/tasks.jpeg"
              alt="client photo"
              height={1000}
              width={1700}
            />

            <div className="mt-2 md:mx-6">
              <div>
                <p className="text-xl font-medium tracking-tight">
                  Pawan Awasthi
                </p>
                <p className="text-muted-foreground">
                  Software Engineer | Full Stack Developer
                </p>
              </div>

              <p className="mt-4 text-lg leading-relaxed md:text-xl">
                {" "}
                “I&apos;m an engineering student with a strong focus on building
                secure, efficient systems, particularly in Python, JavaScript,
                and C#. My recent project shows my strength in database
                management (MySQL) and understanding of user roles and
                permissions, as well as secure authentication methods.”.
              </p>

              <div className="flex items-center justify-between space-x-4 mt-6 md:justify-start">
                <Button size="icon" className="p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>

                <Button size="icon" className="p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AboutMe;
