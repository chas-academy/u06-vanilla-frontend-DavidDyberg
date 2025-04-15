var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchAboutData() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const apiUrl = "https://david-dyberg-portfolio-api.vercel.app/api/about";
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const aboutData = data.find((item) => "_id" in item && item._id === "67d81701db328e5ebbc4d096");
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
                bioElement.textContent = (_a = aboutData.bio) !== null && _a !== void 0 ? _a : "";
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
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
