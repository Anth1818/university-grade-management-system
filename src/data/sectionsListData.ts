import type { Section } from "@/lib/types";

export const sectionListData: Section[] = [
    {
     idSection: "111",
     career: 'Informática',
     semester: 1,
     turn: 'Mañana',
     totalStudents: 16,
     students: [
        {
            id: 1,
            name: "Juan Pérez",
            email: "jperez@university.edu",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 2,
            name: "María García",
            email: "mgarcia@university.edu",
            phone: "987-654-3210",
            address: "456 Elm St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 3,
            name: "Pedro Martínez",
            email: "pmartinez@university.edu",
            phone: "555-555-5555",
            address: "789 Oak St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 4,
            name: "Ana Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 5,
            name: "Carlos López",
            email: "clopez@university.edu",
            phone: "444-555-6666",
            address: "654 Birch St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 6,
            name: "Lucía Torres",
            email: "ltorres@university.edu",
            phone: "777-888-9999",
            address: "987 Cedar St, Anytown, USA",
            idSection: "111"
        },
        {
           id: 7,
           name: "Luis Rodríguez",
           email: "lrodriguez@university.edu",
           phone: "888-999-0000",
           address: "321 Pine St, Anytown, USA",
           idSection: "111"
        },
        {
            id: 8,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 9,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 10,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 11,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 12,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 13,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 14,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 15,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
        {
            id: 16,
            name: "Ana María Rodríguez",
            email: "arodriguez@university.edu",
            phone: "111-222-3333",
            address: "321 Pine St, Anytown, USA",
            idSection: "111"
        },
     ]   
    },
    { idSection: '112', career: 'Informática', semester: 1, turn: 'Tarde', totalStudents: 30 },
    { idSection: '123', career: 'Informática', semester: 2, turn: 'Noche', totalStudents: 27 },
    { idSection: '221', career: 'Turismo', semester: 2, turn: 'Mañana', totalStudents: 35 },
    { idSection: '222', career: 'Turismo', semester: 2, turn: 'Tarde', totalStudents: 30 },
    { idSection: '233', career: 'Turismo', semester: 3, turn: 'Noche', totalStudents: 29 },
];

export const getStudentById = (id: string | number | undefined) => {
    if (id === undefined) return [];
    return sectionListData.map(section => section.students?.find(student => student.id.toString() === id.toString()));
}

export const getSectionById = (id: string | number | undefined): Section | undefined => {
    if (id === undefined) return undefined;
    return sectionListData.find(section => section.idSection === id.toString());
}
