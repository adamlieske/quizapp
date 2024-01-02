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
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else if (isGameOver) {
      res.json({
        loser: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;
      res.json({
        question,
        answers,
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({
        loser: true,
      });
    }
    const { index } = req.params;
    const question = questions[goodAnswers];

    const isCorrect = question.correctAnswer === Number(index);
    if (isCorrect) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isCorrect,
      goodAnswers,
    });
  });
}

export { gameRoutes };
