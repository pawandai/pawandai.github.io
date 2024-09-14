const Hobbies = ({ hobbies }: { hobbies: string[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Hobbies</h2>
      <ul className="list-disc list-inside">
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hobbies;
