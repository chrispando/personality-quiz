(function (root) {
  "use strict";
  const { genres, questions } = root.QuizData || require("./questions.js");
  const KEY = "codyza-literary-quiz-v3";
  const LEGACY_KEY = "codyza-literary-quiz-v2";
  const points = (option, genre) =>
    option.primary === genre ? 2 : option.secondary === genre ? 1 : 0;
  const available = Object.fromEntries(
    genres.map((g) => [
      g,
      questions.reduce(
        (sum, q) => sum + Math.max(...q.options.map((o) => points(o, g))),
        0,
      ),
    ]),
  );
  const fresh = () => ({ version: 3, choices: [], selection: null });
  const isChoice = (round, choice) =>
    Number.isInteger(choice) && !!questions[round]?.options[choice];
  function valid(attempt) {
    if (
      !attempt ||
      attempt.version !== 3 ||
      !Array.isArray(attempt.choices) ||
      attempt.choices.length > questions.length
    )
      return false;
    // Array.from also exposes holes in malformed arrays.
    if (
      !Array.from(attempt.choices).every((choice, round) =>
        isChoice(round, choice),
      )
    )
      return false;
    return (
      attempt.selection === null ||
      isChoice(attempt.choices.length, attempt.selection)
    );
  }
  function save(storage, attempt) {
    if (!valid(attempt)) return false;
    try {
      storage.setItem(
        KEY,
        JSON.stringify({
          version: 3,
          choices: [...attempt.choices],
          selection: attempt.selection,
        }),
      );
      storage.removeItem(LEGACY_KEY);
      return true;
    } catch {
      return false;
    }
  }
  function load(storage) {
    try {
      const current = storage.getItem(KEY);
      if (current !== null) {
        const attempt = JSON.parse(current);
        if (valid(attempt))
          return {
            version: 3,
            choices: [...attempt.choices],
            selection: attempt.selection,
          };
      } else {
        // Only the complete, valid preferences are needed from an older record.
        const old = JSON.parse(storage.getItem(LEGACY_KEY));
        if (
          old?.version === 2 &&
          Array.isArray(old.responses) &&
          old.responses.length === questions.length
        ) {
          const migrated = {
            version: 3,
            choices: old.responses.map((r) => r?.favorite),
            selection: null,
          };
          if (valid(migrated)) {
            save(storage, migrated);
            return migrated;
          }
        }
      }
    } catch {
      /* Missing, malformed, or unavailable storage starts a fresh attempt. */
    }
    const attempt = fresh();
    save(storage, attempt);
    return attempt;
  }
  function select(attempt, choice, round = attempt.choices.length) {
    if (round !== attempt.choices.length || !isChoice(round, choice))
      return false;
    attempt.selection = choice;
    return true;
  }
  function commit(attempt, round = attempt.choices.length) {
    if (round !== attempt.choices.length || !isChoice(round, attempt.selection))
      return false;
    attempt.choices.push(attempt.selection);
    attempt.selection = null; // Cleared synchronously: another Next cannot commit again.
    return true;
  }
  function firstContributor(choices, candidates) {
    for (const field of ["primary", "secondary"]) {
      for (let i = 0; i < choices.length; i++) {
        const genre = questions[i].options[choices[i]][field];
        if (candidates.includes(genre)) return genre;
      }
    }
    return null;
  }
  function stats(attempt) {
    const earned = Object.fromEntries(genres.map((g) => [g, 0]));
    const primary = Object.fromEntries(genres.map((g) => [g, 0]));
    attempt.choices.forEach((choice, round) => {
      const option = questions[round].options[choice];
      earned[option.primary] += 2;
      earned[option.secondary]++;
      primary[option.primary]++;
    });
    // Exact integer cross-products compare unrounded normalized match strengths.
    const ranked = [...genres].sort(
      (a, b) =>
        earned[b] * available[a] - earned[a] * available[b] ||
        primary[b] - primary[a],
    );
    const first = ranked[0];
    const tied = ranked.filter(
      (g) =>
        earned[g] * available[first] === earned[first] * available[g] &&
        primary[g] === primary[first],
    );
    const winner =
      attempt.choices.length === questions.length
        ? tied.length === 1
          ? tied[0]
          : firstContributor(attempt.choices, tied)
        : null;
    return { earned, primary, completed: attempt.choices.length, tied, winner };
  }
  function restart(storage) {
    try {
      storage.removeItem(KEY);
      storage.removeItem(LEGACY_KEY);
    } catch {
      /* The in-memory attempt can still reset. */
    }
    return fresh();
  }
  const engine = {
    KEY,
    LEGACY_KEY,
    available,
    fresh,
    valid,
    load,
    save,
    select,
    commit,
    stats,
    restart,
    points,
    firstContributor,
  };
  root.QuizEngine = engine;
  if (typeof module !== "undefined") module.exports = engine;
})(globalThis);
