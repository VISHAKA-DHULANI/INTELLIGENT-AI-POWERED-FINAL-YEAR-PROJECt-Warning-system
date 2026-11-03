import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Github,
  AlertTriangle,
  ChartNoAxesCombined,
  Plus,
  Search,
  Bell,
  Activity,
  Users,
  ShieldCheck
} from "lucide-react";

import { projects as initialProjects } from "./data/projects";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  function addProject(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newProject = {
      id: Date.now(),
      title: data.get("title"),
      team: data.get("team"),
      supervisor: data.get("supervisor"),
      category: data.get("category"),
      github: data.get("github"),
      health: 0,
      completion: 0,
      commits: 0,
      risk: "Medium"
    };

    setProjects([...projects, newProject]);
    setShowForm(false);
  }

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Projects", icon: FolderKanban },
    { name: "GitHub Insights", icon: Github },
    { name: "Early Warnings", icon: AlertTriangle },
    { name: "Analytics", icon: ChartNoAxesCombined }
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <Activity size={25} />
          <span>FYP Intelligence</span>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        {navigation.map(item => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}

        <div className="sidebar-footer">
          <ShieldCheck size={20} />
          <span>Project Monitoring System</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="muted">Workspace / </span>
            <strong>{activePage}</strong>
          </div>

          <div className="top-actions">
            <span className="demo-label">DEMO DATA</span>
            <Bell size={20} />
            <div className="avatar">AD</div>
          </div>
        </header>

        <section className="content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">PROJECT MANAGEMENT PLATFORM</p>
              <h1>{activePage}</h1>
              <p className="muted">
                Monitor project progress, team activity and project health.
              </p>
            </div>

            {activePage === "Projects" && (
              <button className="primary-button" onClick={() => setShowForm(true)}>
                <Plus size={17} /> Add Project
              </button>
            )}
          </div>

          {activePage === "Dashboard" && (
            <>
              <div className="stats">
                <Stat icon={FolderKanban} label="Total Projects" value={projects.length} />
                <Stat icon={Activity} label="Average Health" value="62.6%" />
                <Stat icon={AlertTriangle} label="Projects at Risk" value={projects.filter(p => p.risk !== "Low").length} />
                <Stat icon={Users} label="Active Teams" value="12" />
              </div>

              <div className="grid">
                <div className="card">
                  <h3>Project Monitoring</h3>
                  <p className="muted">
                    Monitor health score, completion and project risk.
                  </p>

                  {projects.map(project => (
                    <div className="monitor-row" key={project.id}>
                      <div>
                        <strong>{project.title}</strong>
                        <p className="muted">{project.team}</p>
                      </div>
                      <span className={`risk ${project.risk.toLowerCase()}`}>
                        {project.risk}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <h3>Early Warning System</h3>
                  <div className="alert">
                    <AlertTriangle size={19} />
                    <div>
                      <strong>Project risk monitoring</strong>
                      <p className="muted">
                        Review projects with medium or high risk.
                      </p>
                    </div>
                  </div>
                  <div className="alert">
                    <Github size={19} />
                    <div>
                      <strong>Repository activity</strong>
                      <p className="muted">
                        Check recent development activity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === "Projects" && (
            <div className="card">
              <div className="search">
                <Search size={18} />
                <input
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Team</th>
                      <th>Health</th>
                      <th>Completion</th>
                      <th>Risk</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProjects.map(project => (
                      <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>{project.team}</td>
                        <td>{project.health}%</td>
                        <td>{project.completion}%</td>
                        <td>
                          <span className={`risk ${project.risk.toLowerCase()}`}>
                            {project.risk}
                          </span>
                        </td>
                        <td>
                          <button
                            className="small-button"
                            onClick={() => setSelected(project)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage === "GitHub Insights" && (
            <div className="card">
              <h3><Github size={20} /> GitHub Repository Monitoring</h3>
              <p className="muted">
                Repository links and commit counts below are sample values.
                Live GitHub integration must be connected through your backend.
              </p>

              {projects.map(project => (
                <div className="monitor-row" key={project.id}>
                  <div>
                    <strong>{project.title}</strong>
                    <p className="muted">{project.commits} demo commits</p>
                  </div>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    Open repository
                  </a>
                </div>
              ))}
            </div>
          )}

          {activePage === "Early Warnings" && (
            <div className="card">
              <h3>Project Risk Assessment</h3>
              {projects.map(project => (
                <div className="monitor-row" key={project.id}>
                  <strong>{project.title}</strong>
                  <span className={`risk ${project.risk.toLowerCase()}`}>
                    {project.risk} Risk
                  </span>
                </div>
              ))}
            </div>
          )}

          {activePage === "Analytics" && (
            <div className="card">
              <h3>Predictive Analytics</h3>
              <p className="muted">
                Project health and completion indicators.
              </p>
              {projects.map(project => (
                <div className="analytics-row" key={project.id}>
                  <strong>{project.title}</strong>
                  <div className="bar">
                    <span style={{ width: `${project.health}%` }} />
                  </div>
                  <b>{project.health}%</b>
                </div>
              ))}
            </div>
          )}

          <footer>
            FYP Intelligence System · Frontend Prototype · 2026
          </footer>
        </section>
      </main>

      {showForm && (
        <div className="overlay">
          <form className="modal card" onSubmit={addProject}>
            <h2>Create Project</h2>

            <input name="title" placeholder="Project title" required />
            <input name="team" placeholder="Team name" required />
            <input name="supervisor" placeholder="Supervisor name" />
            <input name="category" placeholder="Project category" />
            <input name="github" placeholder="GitHub repository URL" />

            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {selected && (
        <div className="overlay">
          <div className="modal card">
            <button className="close" onClick={() => setSelected(null)}>✕</button>
            <h2>{selected.title}</h2>
            <p>Team: {selected.team}</p>
            <p>Supervisor: {selected.supervisor}</p>
            <p>Health Score: {selected.health}%</p>
            <p>Completion: {selected.completion}%</p>
            <p>Risk: {selected.risk}</p>
            <a href={selected.github} target="_blank" rel="noreferrer">
              GitHub Repository
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon"><Icon size={21} /></div>
      <p className="muted">{label}</p>
      <h2>{value}</h2>
    </div>
  );
}