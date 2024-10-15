import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectID: prevState.selectedProject,
        id: taskID,
      };
      return {
        ...prevState,
        selectedProject: undefined,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }
  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }
  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }

  function handleDelete() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProject
        ),
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID,
      };
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProject
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProject === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
