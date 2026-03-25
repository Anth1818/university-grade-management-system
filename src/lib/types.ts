export type TeacherNameAndEmail = {
    name: string;
    email?: string;
};

export type TeacherIdAndName = {
    id: string;
    name: string;
};

export type Subject = {
    id: string | number;
    name: string;
    code: string;
    credits: number;
    teacherAssing: TeacherIdAndName | null; 
    teachers?: TeacherNameAndEmail[];
    teacher: string;
    teacherOptions?: TeacherIdAndName[];
    day: string;
    classroom: string;
    time: string;
};

export type SemesterData = {
    career?: string;
    semester: string;
    block: string;
    turn: string;
    subjects: Subject[];
};

export type Grade = {
    id: string
    subject?: string
    career?: string
    semester?: number | string
    subjectName?: string
    subjectCode?: string
    evaluation1: number
    evaluation2: number
    evaluation3: number
    evaluation4: number
    evaluation5: number
    evaluation6: number
    evaluation7: number
    evaluation8: number
    finalGrade?: number
  }

export type SemesterSubjects = SemesterData[];

export type RecoveryStatus = 'eligible' | 'not-eligible' | 'already-enrolled';  

export type SignOnStatus = RecoveryStatus | 'not-available';

export type Status = 'checking' | 'eligible' | 'not-eligible' | 'already-requested' | 'period-closed' | 'error';

export type DegreeActStatus = Status;

export type CertifiedNotesStatus = Status;

export type EligibilityStatus = Status | 'loading';

export type StudentDetailsType = {
    id: string | number;
    name: string;
    email: string;
    phone: string;
    address: string;
    idSection: string | number | undefined;
}

export type Section = {
    idSection: string;
    career: string;
    semester: number;
    turn: string;
    totalStudents: number;
    students?: Array<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        idSection: string;
    }>;
    classroom?: string;
    day?: string;
    time?: string;
}