import { Subject } from "../models/Subject";

export class GPACalculator {
  private subjects: Map<number, Subject> = new Map();
  private nextId: number = 1;

  public addSubject(name: string, score: number): Subject {
    const subject = new Subject(this.nextId++, name, score);
    this.subjects.set(subject.id, subject);
    return subject;
  }

  public getSubject(id: number): Subject | undefined {
    return this.subjects.get(id);
  }

  public getAllSubjects(): Subject[] {
    return Array.from(this.subjects.values());
  }

  public updateSubjectScore(id: number, score: number): Subject {
    const subject = this.subjects.get(id);
    if (!subject) {
      throw new Error("Subject not found");
    }
    subject.updateScore(score);
    return subject;
  }

  public deleteSubject(id: number): Subject {
    const subject = this.subjects.get(id);
    if (!subject) {
      throw new Error("Subject not found");
    }
    this.subjects.delete(id);
    return subject;
  }

  public calculateAverage(): number {
    const allSubjects = this.getAllSubjects();
    if (allSubjects.length === 0) return 0;

    const totalScore = allSubjects.reduce((sum, s) => sum + s.score, 0);
    return Number((totalScore / allSubjects.length).toFixed(2));
  }

  public calculateDegreeBand(): { average: number; degreeBand: string } {
    const average = this.calculateAverage();
    if (this.getAllSubjects().length === 0) {
      return { average: 0, degreeBand: "No subjects available" };
    }

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

    return { average, degreeBand };
  }
}