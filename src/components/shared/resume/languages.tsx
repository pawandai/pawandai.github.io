interface LanguagesProps {
  languages: {
    name: string;
    level: number;
  }[];
}

const Languages = ({ languages }: LanguagesProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name} className="mb-1 flex justify-between">
            <span>{language.name}</span>
            <span>{"★".repeat(language.level)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
