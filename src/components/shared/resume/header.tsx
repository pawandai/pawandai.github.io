import { FC } from "react";

interface ResumeHeaderProps {
  name: string;
  title: string;
}

const ResumeHeader: FC<ResumeHeaderProps> = ({ name, title }) => {
  return (
    <header className="w-full bg-gray-200 py-6 shadow-md mb-8 absolute left-0">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{name}</h1>
          <p className="text-lg font-light mt-2 tracking-wide">{title}</p>
        </div>
      </div>
    </header>
  );
};

export default ResumeHeader;
