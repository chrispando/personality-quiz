"use strict";
const E = QuizEngine,
  D = QuizData,
  attempt = E.load(sessionStorage),
  root = document.querySelector("#reveal");
function render() {
  const s = E.stats(attempt);
  if (s.completed !== 10) {
    location.replace("index.html");
    return;
  }
  const genre = s.winner,
    p = D.profiles[genre];
  const picks = attempt.choices
    .map((choice, i) => D.questions[i].options[choice])
    .filter((o) => E.points(o, genre) > 0)
    .sort((a, b) => E.points(b, genre) - E.points(a, genre))
    .slice(0, 2);
  root.innerHTML = `<div class="reveal-layout"><article class="personal-cover cover-${genre.toLowerCase().replace("-", "")}" style="--cover-color:${p.color}"><p class="edition-label">CODYZA · YOUR PERSONAL EDITION</p><p class="cover-intro">Your literary genre is</p><h1 tabindex="-1">${genre}</h1><div class="cover-ornament" aria-hidden="true">${p.symbol}</div><p class="cover-subtitle">${p.subtitle}</p><div class="cover-rule"></div><p class="cover-bottom">A STORY ONLY YOU COULD CHOOSE</p></article><section class="reveal-copy"><p class="round-label">WELCOME TO YOUR SHELF</p><h2>A little more <em>${genre.toLowerCase()}.</em><br>A little more you.</h2><p class="genre-blurb">${p.blurb}</p><h3>What tipped the scales?</h3><div class="winning-picks">${picks.map((o) => `<span>${o.title}</span>`).join("")}</div><p>${picks.map((o) => o.title).join(" and ")} ${picks.length === 1 ? "nudged" : "both nudged"} your story toward ${genre}.</p><button class="next-button" data-restart>Restart quiz <span aria-hidden="true">↻</span></button></section></div>`;
}
root.addEventListener("click", (event) => {
  const b = event.target.closest("button");
  if (!b) return;
  if (b.hasAttribute("data-restart")) {
    E.restart(sessionStorage);
    location.href = "quiz.html";
  }
});
render();
