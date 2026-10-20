export class Subject {
  private _id: number;
  private _name: string;
  private _score: number;

  constructor(id: number, name: string, score: number) {
    this._id = id;
    this._name = name.trim();
    this.validateScore(score);
    this._score = score;
  }

  private validateScore(score: number): void {
    if (typeof score !== "number" || score < 0 || score > 100) {
      throw new Error("Score must be a number between 0 and 100.");
    }
  }

  get id(): number { return this._id; }
  get name(): string { return this._name; }
  get score(): number { return this._score; }

  public updateScore(newScore: number): void {
    this.validateScore(newScore);
    this._score = newScore;
  }

  public toJSON() {
    return {
      id: this._id,
      subject: this._name,
      score: this._score,
    };
  }
}