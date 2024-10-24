import { Badge } from "./badge"
import { Github, Globe } from "lucide-react"

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  deployUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  deployUrl
}: ProjectCardProps = {
  title: "Awesome Project",
  description: "This is a brief description of the awesome project.",
  technologies: ["React", "Next.js", "Tailwind CSS"],
  imageUrl: "/placeholder.svg?height=300&width=400",
  githubUrl: "https://github.com",
  deployUrl: "https://vercel.com"
}) {
  return (
    <div className="relative group overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex flex-col justify-between p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Github size={20} />
            </a>
          )}
          {deployUrl && (
            <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Globe size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}