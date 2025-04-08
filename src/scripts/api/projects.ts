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

    const data: projectType = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
