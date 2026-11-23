"use strict";
const E = QuizEngine,
  D = QuizData;
let attempt = E.load(sessionStorage);
const main = document.querySelector("#round");
const nextButton = document.querySelector("#next-question");
const status = document.querySelector("#action-status");
let storageOK = true;
function persist() {
  storageOK = E.save(sessionStorage, attempt);
}
function updateSelection() {
  main.querySelectorAll("[data-pick]").forEach((button) => {
    const selected = Number(button.dataset.pick) === attempt.selection;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.querySelector(".selection-dot").textContent = selected ? "✓" : "";
  });
  nextButton.disabled = attempt.selection === null;
  status.textContent =
    attempt.selection === null
      ? "Pick a favorite to begin this round."
      : `${D.questions[attempt.choices.length].options[attempt.selection].title} selected. You can change your mind before continuing.`;
  if (!storageOK)
    status.textContent +=
      " Browser storage is unavailable; allow it to save your result.";
}
function render(focus = true) {
  const round = attempt.choices.length;
  if (round === D.questions.length) {
    location.replace("results.html");
    return;
  }
  const q = D.questions[round];
  document.querySelector("#progress-area").innerHTML =
    `<div class="progress-label"><strong>Question ${round + 1} of 10</strong><span>${round} rounds complete</span></div><div class="segments" role="progressbar" aria-label="Completed rounds" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${round}" aria-valuetext="Question ${round + 1} of 10; ${round} rounds complete">${D.questions.map((_, i) => `<span class="${i === round ? "current" : i < round ? "done" : ""}" aria-hidden="true"></span>`).join("")}</div>`;
  main.innerHTML = `<p class="round-label">${q.label}</p><h1 class="round-title" tabindex="-1">${q.title} <em>${q.closing}</em></h1><div class="favorite-grid" role="group" aria-label="Choose one favorite">${q.options.map((o, i) => `<button class="favorite-card tint-${i}" data-pick="${i}" data-round="${round}" aria-pressed="false" aria-label="Choose ${o.title}: ${o.description}"><span class="illustration-panel"><span class="medallion"><img src="images/${o.illustration}.svg" alt="" width="100" height="100" draggable="false"></span></span><span class="card-title">${o.title}<span class="selection-dot" aria-hidden="true"></span></span><span class="card-description">${o.description}</span></button>`).join("")}</div><p class="favorite-note"><span aria-hidden="true">♥</span> Every favorite counts toward your genre — there’s no wrong pick.</p>`;
  nextButton.dataset.round = String(round);
  nextButton.innerHTML = `${round === 9 ? "Reveal my genre" : "Next question"} <span aria-hidden="true">→</span>`;
  updateSelection();
  if (focus) main.querySelector("h1").focus({ preventScroll: true });
}
main.addEventListener("click", (event) => {
  const button = event.target.closest("[data-pick]");
  if (!button || !main.contains(button)) return;
  if (
    E.select(attempt, Number(button.dataset.pick), Number(button.dataset.round))
  ) {
    persist();
    updateSelection(); // Keep the same controls and keyboard focus on screen.
  }
});
nextButton.addEventListener("keydown", (event) => {
  if (event.repeat && (event.key === "Enter" || event.key === " "))
    event.preventDefault();
});
nextButton.addEventListener("click", (event) => {
  if (nextButton.disabled || event.detail > 1) return;
  const round = Number(nextButton.dataset.round);
  if (!E.commit(attempt, round)) return;
  persist();
  if (attempt.choices.length === D.questions.length) {
    if (storageOK) {
      nextButton.disabled = true;
      location.href = "results.html";
    } else {
      // Keep the last selection available for a storage retry, without a duplicate commit.
      attempt.selection = attempt.choices.pop();
      status.textContent =
        "Allow browser session storage to save your result, then choose Reveal my genre again.";
    }
  } else {
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
});
document.querySelector("#restart").addEventListener("click", () => {
  attempt = E.restart(sessionStorage);
  storageOK = true;
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
});
render(false);
