import { FC } from "react";

interface EducationProps {
  schools: {
    degree: string;
    institution: string;
    duration: string;
  }[];
}

const Education: FC<EducationProps> = ({ schools }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Education</h2>
      {schools.map((school, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-bold">{school.degree}</h3>
          <span className="text-gray-600">{school.institution}</span>
          <span className="block text-gray-600">{school.duration}</span>
        </div>
      ))}
    </div>
  );
};

export default Education;
