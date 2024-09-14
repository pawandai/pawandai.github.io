import { FC } from "react";

interface EmploymentHistoryProps {
  jobs: {
    title: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
}

const EmploymentHistory: FC<EmploymentHistoryProps> = ({ jobs }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Employment History</h2>
      {jobs.map((job, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <span className="text-gray-600">
            {job.company} - {job.duration}
          </span>
          <ul className="list-disc list-inside ml-4">
            {job.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EmploymentHistory;
