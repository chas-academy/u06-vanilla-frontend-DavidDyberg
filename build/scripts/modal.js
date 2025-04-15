"use strict";
const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const openModal = function () {
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("hidden");
};
const closeModal = function () {
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
};
openModalBtn === null || openModalBtn === void 0 ? void 0 : openModalBtn.addEventListener("click", openModal);
closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener("click", closeModal);
