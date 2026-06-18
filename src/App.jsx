import "./App.css";
import profile from "./assets/profile.jpg";

const projects = [
  {
    title: "Bank Management System",
    url: "https://github.com/tyang146/Bank-Management-System",
  },
  {
    title: "Workout Tracker",
    url: "https://github.com/tyang146/WorkoutTracker",
  },
  {
    title: "Bloxorz AI",
    url: "https://github.com/tyang146/BloxorzAI",
  },
  {
    title: "S3 Bucket API",
    url: "https://github.com/tyang146/My-S3-Bucket-Api",
  },
  {
    title: "Football Regression Analysis",
    url: "https://github.com/tyang146/regression_analysis_streamlit",
  },
  {
    title: "Movie Field Deduction",
    url: "https://huggingface.co/spaces/tyang146/movie_field_deduction",
  },
  {
    title: "Ransomware Evolution: Chapter 5",
    url: "https://www.taylorfrancis.com/books/edit/10.1201/9781003469506/ransomware-evolution-mohiuddin-ahmed",
  },
];

function SkillCard({ title, skills }) {
  return (
    <div className="skill-card">
      <h3>{title}</h3>

      <div className="skill-badges">
        {skills.map((skill, index) => (
          <span key={index} className="badge">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">Thong Yang</h2>

        <div className="links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
        </div>
      </nav>

      <section id="about" className="hero">
        <div className="hero-content">
          <p className="hero-label">Aspiring Software Engineer</p>

          <h1>
            Hello,
          </h1>

          <div className="hero-card">
            <p>
              I'm Thong Yang, a Computer Science graduate from the University of Wisconsin Green Bay. 
              I enjoy building applications, analyzing data, developing AI solutions and exploring cloud technologies. 
              I'm passionate about leveraging technology to solve real-world problems from various domains, including cybersecurity, data science, and software development.
              I'm always looking to grow my skills, connect with like-minded individuals, and contribute to impactful projects.
            </p>
          </div>
        </div>

        <img src={profile} alt="Thong Yang" className="hero-img" />
      </section>

      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>

        <div className="skills-grid">
          <SkillCard
            title="Programming Languages"
            skills={[
              "Python",
              "Java",
              "JavaScript",
              "C++",
              "C#",
              "HTML",
              "CSS",
            ]}
          />

          <SkillCard
            title="Databases"
            skills={["SQL Server", "SQLite"]}
          />

          <SkillCard
            title="Cloud & DevOps"
            skills={[
              "AWS",
              "Azure",
              "Docker",
              "Git",
              "GitHub",
              "Jenkins",
            ]}
          />

          <SkillCard
            title="Frameworks & Tools"
            skills={[
              "React",
              ".NET",
              "VS Code",
              "Android Studio",
            ]}
          />
        </div>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title">Selected Projects</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="project-card"
            >
              <span>Project</span>
              <h3>{project.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;