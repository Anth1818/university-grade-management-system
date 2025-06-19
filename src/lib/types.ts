export type Teacher = {
    name: string;
    email?: string;
};

export type Subject = {
    id: string;
    name: string;
    code: string;
    credits: number;
    teacher: string; // Keeping for backward compatibility
    teachers: Teacher[];
    day: string;
    classroom: string;
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

export type RecoveryStatus = 'eligible' | 'not-eligible' | 'already-enrolled';  

export type SignOnStatus = RecoveryStatus | 'not-available';

export type Status = 'checking' | 'eligible' | 'not-eligible' | 'already-requested' | 'period-closed' | 'error';

export type DegreeActStatus = Status;

export type CertifiedNotesStatus = Status;

export type EligibilityStatus = Status | 'loading';

