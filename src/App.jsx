import "./App.css"
import profile from './assets/profile.jpg';
import { useState } from "react";

const projects = [
  { title: "Bank Management System", url: "https://github.com/tyang146/Bank_Management_System" },
  { title: "Workout Tracker", url: "https://github.com/tyang146/WorkoutTracker" },
  { title: "Bloxorz AI", url: "https://github.com/tyang146/BloxorzAI" },
  { title: "S3 Bucket API", url: "https://github.com/tyang146/My-S3-Bucket-Api" },
  { title: "Football Regression Analysis", url: "https://github.com/tyang146/regression_analysis_streamlit" },
  { title: "Movie Field Deduction", url: "https://huggingface.co/spaces/tyang146/movie_field_deduction" },
  { title: "Ransomware Evolution: Chapter 5", url: "https://www.taylorfrancis.com/books/edit/10.1201/9781003469506/ransomware-evolution-mohiuddin-ahmed" },
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
  )
}

function App() {
  const [current, setCurrent] = useState(0);

  const nextProject = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="universe">
      <div className="blackhole"></div>

      <nav className="navbar">
        <h2 className="logo">Thong's Portfolio</h2>
        <div className="links">
          <a href="#hero">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
        </div>
      </nav>

      <section id="hero" className="hero">
        <h1 className="glow">Hello,</h1>
        <div className="hero-card">
          <p>I'm Thong Yang.
            I attended the University of Wisconsin Green Bay and graduated with a Bachelor of Science in Computer Science. 
            My passion lies in playing around with computers and coding. 
            I enjoy building applications that solve real world problems, working with data, creating games, and utilizing cloud computing and machine learning. 
            I am always looking for new challenges and opportunities to grow.
          </p>
        </div>
        <img
          src={profile}
          alt="Thong"
          className="hero-img"
        />
      </section>

      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>

        <div className="skills-grid">
          <SkillCard 
            title="Programming Languages"
            skills={["HTML", "CSS", "JavaScript", "Python", "Java", "C++", "C#"]}
          />

          <SkillCard 
            title="Databases"
            skills={["SQL Server", "SQLite"]}
          />

          <SkillCard 
            title="Cloud & DevOps"
            skills={["AWS", "Docker", "Git", "GitHub", "Azure", "Jenkins"]}
          />

          <SkillCard 
            title="Tools & Frameworks"
            skills={["VS Code", ".NET", "Android Studio", "Windows Server", "React"]}
          />
        </div>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>

        <div className="project-carousel">
          <button className="arrow left" onClick={prevProject}>
            &#8592;
          </button>

          <div className="project-card">
            <a 
              href={projects[current].url} 
              target="_blank" 
            >
              {projects[current].title}
            </a>
          </div>

          <button className="arrow right" onClick={nextProject}>
            &#8594;
          </button>
        </div>
      </section>
    </div>
  )
}

export default App
