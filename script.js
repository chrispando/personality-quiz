"use strict";
document.querySelector("#start-button").addEventListener("click", () => {
  QuizEngine.restart(sessionStorage);
  location.href = "quiz.html";
});
document.querySelector("#genre-descriptions").innerHTML = QuizData.genres
  .map(
    (g) =>
      `<article style="--genre-color:${QuizData.profiles[g].color}"><h3>${g}</h3><p>${QuizData.profiles[g].blurb}</p></article>`,
  )
  .join("");
document.querySelector("[data-shelf]").addEventListener("click", () => {
  document.querySelector("#shelf").hidden = false;
  document.querySelector("#shelf-title").focus({ preventScroll: true });
});
