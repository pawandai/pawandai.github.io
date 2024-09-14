const Courses = () => {
  const courses = [
    {
      title: "Data Structures and Algorithm",
      institution: "IOE Purwanchal Campus",
      duration: "Nov 2023 — Mar 2024",
    },
    {
      title: "Computer Organization and Architecture",
      institution: "IOE Purwanchal Campus",
      duration: "Jun 2024 — Sep 2024",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Courses</h2>
      {courses.map((course, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-bold">{course.title}</h3>
          <span className="text-gray-600">{course.institution}</span>
          <span className="block text-gray-600">{course.duration}</span>
        </div>
      ))}
    </div>
  );
};

export default Courses;
