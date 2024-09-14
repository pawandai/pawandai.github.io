import { FC } from "react";

interface SkillsProps {
  skills: {
    name: string;
    level: number;
  }[];
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name} className="mb-1 flex justify-between">
            <span>{skill.name}</span>
            <span>{"★".repeat(skill.level)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
