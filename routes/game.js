function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: 'Co oznacza skrót "IATA"?',
      answers: [
        "International Air Transport Association",
        "International Aviation Transportation Authority",
        "International Association of Travel Agencies",
        "Intercontinental Air Traffic Administration",
      ],
      correctAnswer: 0,
    },
    {
      question: "Jak nazywa się największy samolot pasażerski na świecie?",
      answers: ["Boeing 747", "Airbus A320", "Airbus A380", "Antonov An-225"],
      correctAnswer: 2,
    },
    {
      question:
        'Które z poniższych zdań najlepiej opisuje termin "stall" w lotnictwie?',
      answers: [
        "Przyspieszenie samolotu do maksymalnej prędkości",
        "Utrata siły nośnej i kontrolowania lotu",
        "Manewr zmniejszenia wysokości lotu",
        "Rutynowe lądowanie samolotu",
      ],
      correctAnswer: 1,
    },
  ];
  app.get("/question", (req, res) => {
    // Inicjalizacja sesji dla nowego użytkownika
    if (typeof req.session.goodAnswers === "undefined") {
      req.session.goodAnswers = 0;
      req.session.isGameOver = false;
    }

    // Sprawdzanie, czy użytkownik wygrał
    if (req.session.goodAnswers === questions.length) {
      req.session.isGameOver = true;
      res.json({ winner: true });
    } else if (req.session.isGameOver) {
      res.json({ loser: true });
    } else {
      // Wyświetlanie kolejnego pytania
      const nextQuestion = questions[req.session.goodAnswers];
      res.json({
        question: nextQuestion.question,
        answers: nextQuestion.answers,
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    // Odpowiedź, gdy gra się zakończyła
    if (req.session.isGameOver) {
      return res.json({ loser: true });
    }

    // Sprawdzanie odpowiedzi
    const { index } = req.params;
    const question = questions[req.session.goodAnswers];
    const isCorrect = question.correctAnswer === Number(index);

    // Aktualizacja stanu sesji
    if (isCorrect) {
      req.session.goodAnswers++;
    } else {
      req.session.isGameOver = true;
    }

    // Informowanie użytkownika o wyniku
    const hasFinished = req.session.goodAnswers === questions.length;
    res.json({
      correct: isCorrect,
      goodAnswers: req.session.goodAnswers,
      winner: hasFinished,
      loser: !isCorrect && !hasFinished,
    });
  });
}

export { gameRoutes };
