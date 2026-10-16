import express from "express";

const app = express();

app.use(express.json());

interface Subject {
  id: number;
  subject: string;
  score: number;
}

const subjects: Subject[] = [];

app.get("/", (req, res) => {
  res.send("GPA Calculator API is running");
});

app.post("/subjects", (req, res) => {
  const { subject, score } = req.body;

  if (
  !subject ||
  typeof subject !== "string" ||
  typeof score !== "number" ||
  score < 0 ||
  score > 100
) {
  return res.status(400).json({
    message: "Subject must be a string and score must be between 0 and 100",
  });
}

  const newSubject = {
    id: subjects.length + 1,
    subject,
    score,
  };

  subjects.push(newSubject);

  res.status(201).json(newSubject);
});

app.get("/subjects", (req, res) => {
  res.json(subjects);
});

app.put("/subjects/:id", (req, res) => {
  const id = Number(req.params.id);
  const { score } = req.body;

  if (
    typeof score !== "number" ||
    score < 0 ||
    score > 100
  ) {
    return res.status(400).json({
      message: "Score must be between 0 and 100",
    });
  }

  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  subject.score = score;

  res.json(subject);
});


app.get("/gpa", (req, res) => {
  if (subjects.length === 0) {
    res.json({
      gpa: 0,
      message: "No subjects added yet"
    });
    return;
  }

  const totalScore = subjects.reduce(
    (sum, subject) => sum + subject.score,
    0
  );

  const gpa = Number(
  (totalScore / subjects.length).toFixed(2)
);

  res.json({
    totalSubjects: subjects.length,
    gpa
  });
});

app.delete("/subjects/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = subjects.findIndex(
    (subject) => subject.id === id
  );

  if (index === -1) {
    res.status(404).json({
      message: "Subject not found",
    });
    return;
  }

  const deletedSubject = subjects.splice(index, 1)[0];

  res.json({
    message: "Subject deleted",
    deletedSubject,
  });
});

app.get("/degree-band", (req, res) => {
  if (subjects.length === 0) {
    res.json({
      degreeBand: "No subjects available",
    });
    return;
  }

  const totalScore = subjects.reduce(
    (sum, subject) => sum + subject.score,
    0
  );

  const average = Number(
  (totalScore / subjects.length).toFixed(2)
);

  let degreeBand = "";

  if (average >= 70) {
    degreeBand = "First Class";
  } else if (average >= 60) {
    degreeBand = "Second Class Upper";
  } else if (average >= 50) {
    degreeBand = "Second Class Lower";
  } else if (average >= 45) {
    degreeBand = "Third Class";
  } else {
    degreeBand = "Fail";
  }

  res.json({
    average,
    degreeBand,
  });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});