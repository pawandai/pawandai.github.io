import { PROJECTS } from "@/constants";
import ProjectCard from "./projectCard";

const Projects = () => {
  return (
    <div
      className={`grid gap-4 justify-center mx-auto ${
        PROJECTS.length > 1 ? "lg:grid-cols-2" : ""
      }`}
    >
      {PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          createdAt={project.createdAt}
          createdBy={project.createdBy}
          description={project.description}
          githubUrl={project.githubUrl}
          imageUrls={project.imageUrls}
          tags={project.tags}
          liveDemoUrl={project.liveDemoUrl}
        />
      ))}
    </div>
  );
};

export default Projects;
