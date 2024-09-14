import { FC } from "react";
import ResumeHeader from "./header";
import Education from "./education";
import Skills from "./skills";
import Courses from "./courses";
import ExtraCurricular from "./extraCurricular";
import Hobbies from "./hobbies";
import Languages from "./languages";
import Profile from "./profile";
import EmploymentHistory from "./employment";

const Resume: FC = () => {
  const personalInfo = {
    name: "Pawan Awasthi",
    title: "Software Engineer",
  };

  const hobbies = [
    "Making Videos",
    "Traveling",
    "Playing Guitar",
    "Building PCs",
  ];

  const languages = [
    { name: "English", level: 5 },
    { name: "Nepali", level: 5 },
    { name: "Hindi", level: 4 },
  ];

  const jobs = [
    {
      title: "Front-end React Developer",
      company: "Native Plug",
      duration: "Oct 2023 - Jan 2024",
      responsibilities: [
        "Developing reusable UI components in React.",
        "Collaborating with design and backend teams to create seamless user experiences.",
        "Ensuring responsiveness and performance of web applications.",
        "Participating in code reviews and improvements.",
      ],
    },
    {
      title: "React Native Developer",
      company: "Startek",
      duration: "Jul 2023 - Aug 2024",
      responsibilities: [
        "Developing and implementing mobile applications using React Native.",
        "Ensuring smooth user experiences and performance.",
        "Utilizing Firebase for database and authentication.",
        "Staying updated with modern technologies.",
      ],
    },
  ];

  const schools = [
    {
      degree: "Bachelors in Engineering",
      institution: "IOE Purwanchal Campus",
      duration: "Apr 2022 — Present",
    },
    {
      degree: "High School",
      institution: "National Academy of Science and Technology",
      duration: "Jan 2018 — Jan 2020",
    },
  ];

  const skills = [
    { name: "Time Management", level: 5 },
    { name: "Problem Solving", level: 4 },
    { name: "Software Architecture", level: 3 },
    { name: "Communication", level: 4 },
    { name: "Database Design", level: 5 },
  ];

  return (
    <div className="relative">
      <ResumeHeader {...personalInfo} />

      <div className="container mx-auto px-4 py-32">
        {" "}
        {/* Added padding top here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <Profile />
              <Skills skills={skills} />
              <Languages languages={languages} />
              <Hobbies hobbies={hobbies} />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <EmploymentHistory jobs={jobs} />
            <Education schools={schools} />
            <ExtraCurricular />
            <Courses />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
