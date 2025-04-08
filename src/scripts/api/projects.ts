import projectType from "../../types/projectTypes";

export async function fetchLimitedProjectData() {
  const apiUrl =
    "https://david-dyberg-portfolio-api.vercel.app/api/projects?limit=2";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: projectType[] = await response.json();

    const projectNameElements = document.querySelectorAll(".project-name");

    projectNameElements.forEach((element, index) => {
      if (data[index]) {
        element.textContent = data[index].title;
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchAllProjectData() {
  const apiUrl = "https://david-dyberg-portfolio-api.vercel.app/api/projects";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: projectType[] = await response.json();

    const projectsContainer = document.querySelector(".projects-container");

    if (projectsContainer) {
      projectsContainer.innerHTML = "";

      data.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-item");
        projectElement.innerHTML = `
          <a href="/project.html?id=${project._id}">
            <h3 class="project-name">${project.title}</h3>
            <img
            class="project-image"
            src="./assets/project-fake-image.png"
            alt="Project image"
            />
          </a>
        `;
        projectsContainer.appendChild(projectElement);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchProjectById(id: string) {
  const apiUrl = `https://david-dyberg-portfolio-api.vercel.app/api/projects/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const project: projectType = await response.json();

    const projectBrowserTitle = document.querySelector(
      "title"
    ) as HTMLTitleElement;

    const projectTitleElement = document.querySelector(
      ".project-title"
    ) as HTMLHeadingElement;

    const projectDescriptionElement = document.querySelector(
      ".description"
    ) as HTMLParagraphElement;

    const projectImageElement = document.querySelector(
      ".project-image"
    ) as HTMLImageElement;

    const projectTechStackElement = document.querySelector(
      ".tech-stack"
    ) as HTMLUListElement;

    const projectGithubLinkElement = document.querySelector(
      ".github-link"
    ) as HTMLAnchorElement;

    const projectLiveDemoElement = document.querySelector(
      ".live-demo"
    ) as HTMLAnchorElement;

    if (projectBrowserTitle) {
      projectBrowserTitle.textContent = project.title;
    }

    if (projectTitleElement) {
      projectTitleElement.textContent = project.title;
    }

    if (projectDescriptionElement) {
      projectDescriptionElement.textContent = project.description;
    }

    if (projectImageElement) {
      projectImageElement.src = "./assets/project-fake-image.png";
      projectImageElement.alt = `${project.title} image`;
    }

    if (projectTechStackElement) {
      projectTechStackElement.innerHTML = "";

      project.techStack?.forEach((tech) => {
        const techItem = document.createElement("li");
        techItem.textContent = tech;
        projectTechStackElement.appendChild(techItem);
      });
    }

    if (projectGithubLinkElement) {
      projectGithubLinkElement.href = project.githubLink || "";
    }

    if (projectLiveDemoElement) {
      projectLiveDemoElement.href = project.liveDemo || "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
