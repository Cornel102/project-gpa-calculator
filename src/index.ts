import express, { Request, Response } from "express";
import { GPACalculator } from "../services/GPACalculator";
import { Subject } from "../models/Subject";

const app = express();
app.use(express.json());

const calculator = new GPACalculator();

app.get("/", (req: Request, res: Response) => {
  res.send("GPA Calculator API is running");
});

// Add Subject
app.post("/subjects", (req: Request, res: Response) => {
  try {
    const { subject, score } = req.body;

    if (!subject || typeof subject !== "string") {
      return res.status(400).json({ message: "Subject must be a valid string" });
    }

    const newSubject = calculator.addSubject(subject, score);
    res.status(201).json(newSubject.toJSON());
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Subjects
app.get("/subjects", (req: Request, res: Response) => {
  const subjects = calculator.getAllSubjects().map((s: Subject) => s.toJSON());
  res.json(subjects);
});

// Edit Subject Score
app.put("/subjects/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { score } = req.body;

    const updatedSubject = calculator.updateSubjectScore(id, score);
    res.json(updatedSubject.toJSON());
  } catch (error: any) {
    const status = error.message === "Subject not found" ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
});

// Delete Subject
app.delete("/subjects/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedSubject = calculator.deleteSubject(id);
    res.json({
      message: "Subject deleted",
      deletedSubject: deletedSubject.toJSON(),
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// Calculate GPA
app.get("/gpa", (req: Request, res: Response) => {
  const subjects = calculator.getAllSubjects();
  if (subjects.length === 0) {
    return res.json({ gpa: 0, message: "No subjects added yet" });
  }

  const gpa = calculator.calculateAverage();
  res.json({
    totalSubjects: subjects.length,
    gpa,
  });
});

// Calculate Degree Band
app.get("/degree-band", (req: Request, res: Response) => {
  const result = calculator.calculateDegreeBand();
  res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});