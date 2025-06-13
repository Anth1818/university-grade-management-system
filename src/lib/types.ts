export type Subject = {
    id: string;
    name: string;
    code: string;
    credits: number;
    teacher: string;
    day: string;
    time: string;
   
};

export type SemesterData = {
    semester: string;
    block: string;
    turn: string;
    subjects: Subject[];
};

export type Grade = {
    id: string
    subject: string
    evaluation1: number
    evaluation2: number
    evaluation3: number
    evaluation4: number
    evaluation5: number
    evaluation6: number
    evaluation7: number
    evaluation8: number
    finalGrade: number
  }

export type SemesterSubjects = SemesterData[];

export type SignOnStatus = "eligible" | "not-eligible" | "not-available";