export interface Admin {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    nationality: string;
    nationalityId: number;
    phoneNumber: string;
    password: string;
    status: string;
}

export interface AdminFormData {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    nationalityId: number;
    phoneNumber: string;
    password: string;
    image: File | null;
    imagePreview: string;
}

//  nationalityId: 1,
//     firstName: '',
//     lastName: '',
//     userName: '',
//     phoneNumber: '',
//     email: '',
//     password: '',
//     image: null as File | null,
//     imagePreview: selectedAdmin?.image || '',