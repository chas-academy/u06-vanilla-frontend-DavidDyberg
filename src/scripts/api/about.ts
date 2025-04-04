import AboutType from "../../types/aboutTypes";

export async function fetchAboutData() {
  const apiUrl = "https://david-dyberg-portfolio-api.vercel.app/api/about";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AboutType[] = await response.json();

    const aboutData: AboutType | undefined = data.find(
      (item) => "_id" in item && item._id === "67d81701db328e5ebbc4d096"
    );

    if (!aboutData) {
      console.error("No data found with the specified ID.");
      return;
    }

    const nameElement = document.querySelector(".name");
    const bioElement = document.querySelector(".biography");
    const skillsElement = document.querySelector(".skills");

    if (nameElement) {
      nameElement.textContent =
        aboutData.firstName && aboutData.lastName
          ? `${aboutData.firstName} ${aboutData.lastName}`
          : "";
    }
    if (bioElement) {
      bioElement.textContent = aboutData.bio ?? "";
    }

    if (skillsElement) {
      skillsElement.innerHTML = "";
      if (aboutData.skills) {
        aboutData.skills.forEach((skill) => {
          const skillItem = document.createElement("li");
          skillItem.textContent = skill;
          skillsElement.appendChild(skillItem);
        });
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
