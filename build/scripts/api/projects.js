var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchLimitedProjectData() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "https://david-dyberg-portfolio-api.vercel.app/api/projects?limit=2";
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const projectNameElements = document.querySelectorAll(".project-name");
            projectNameElements.forEach((element, index) => {
                if (data[index]) {
                    element.textContent = data[index].title;
                }
            });
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
export function fetchAllProjectData() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "https://david-dyberg-portfolio-api.vercel.app/api/projects";
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const projectsContainer = document.querySelector(".projects-container");
            if (projectsContainer) {
                projectsContainer.innerHTML = "";
                data.map((project) => {
                    const projectElement = document.createElement("div");
                    projectElement.classList.add("project-item");
                    projectElement.innerHTML = `
          <a class="project-link" href="/u06-vanilla-frontend-DavidDyberg/project?id=${project._id}">
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
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
export function fetchProjectById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const apiUrl = `https://david-dyberg-portfolio-api.vercel.app/api/projects/${id}`;
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const project = yield response.json();
            const projectBrowserTitle = document.querySelector("title");
            const projectTitleElement = document.querySelector(".project-title");
            const projectDescriptionElement = document.querySelector(".description");
            const projectImageElement = document.querySelector(".project-image");
            const projectTechStackElement = document.querySelector(".tech-stack");
            const projectGithubLinkElement = document.querySelector(".github-link");
            const projectLiveDemoElement = document.querySelector(".live-demo");
            const inputTitle = document.querySelector(".name");
            const inputDescription = document.querySelector("#description");
            const inputLiveLink = document.querySelector(".live-link");
            const inputSourceCode = document.querySelector(".source-code");
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
                (_a = project.techStack) === null || _a === void 0 ? void 0 : _a.forEach((tech) => {
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
            if (inputTitle) {
                inputTitle.value = project.title;
            }
            if (inputDescription) {
                inputDescription.value = project.description;
            }
            if (inputLiveLink) {
                inputLiveLink.value = project.liveDemo || "";
            }
            if (inputSourceCode) {
                inputSourceCode.value = project.githubLink || "";
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
export function createProject() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `https://david-dyberg-portfolio-api.vercel.app/api/projects/`;
        const inputTitle = document.querySelector(".name");
        const inputDescription = document.querySelector("#description");
        const inputLiveLink = document.querySelector(".live-link");
        const inputSourceCode = document.querySelector(".source-code");
        const newProject = {
            title: inputTitle.value,
            description: inputDescription === null || inputDescription === void 0 ? void 0 : inputDescription.value,
            liveDemo: inputLiveLink === null || inputLiveLink === void 0 ? void 0 : inputLiveLink.value,
            githubLink: inputSourceCode === null || inputSourceCode === void 0 ? void 0 : inputSourceCode.value,
        };
        try {
            const response = yield fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(newProject),
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Project created successfully!", data);
            const modal = document.querySelector(".modal");
            modal.classList.add("hidden");
            fetchLimitedProjectData();
            fetchAllProjectData();
        }
        catch (error) {
            console.error("Error while creating project:", error);
        }
    });
}
export function updateProjectById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `https://david-dyberg-portfolio-api.vercel.app/api/projects/${id}`;
        const inputTitle = document.querySelector(".name");
        const inputDescription = document.querySelector("#description");
        const inputLiveLink = document.querySelector(".live-link");
        const inputSourceCode = document.querySelector(".source-code");
        const updatedProject = {
            title: inputTitle === null || inputTitle === void 0 ? void 0 : inputTitle.value,
            description: inputDescription === null || inputDescription === void 0 ? void 0 : inputDescription.value,
            liveDemo: inputLiveLink === null || inputLiveLink === void 0 ? void 0 : inputLiveLink.value,
            githubLink: inputSourceCode === null || inputSourceCode === void 0 ? void 0 : inputSourceCode.value,
        };
        try {
            const response = yield fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(updatedProject),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Project updated successfully:", data);
            const modal = document.querySelector(".modal");
            modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
            fetchProjectById(id);
            fetchAllProjectData();
            fetchLimitedProjectData();
        }
        catch (error) {
            console.error("Error updating project:", error);
        }
    });
}
export function deleteProjectById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `https://david-dyberg-portfolio-api.vercel.app/api/projects/${id}`;
        try {
            const response = yield fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Project deleted successfully:", data);
            fetchAllProjectData();
        }
        catch (error) {
            console.error("Error deleting project:", error);
        }
    });
}
