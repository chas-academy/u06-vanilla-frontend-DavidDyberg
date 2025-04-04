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
        element.textContent = data[index].title; // Update with the project title
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
