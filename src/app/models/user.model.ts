export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: Date;
    address: string;
    gender: string;
    profilPicture: string;
    userRole: string;
    fcmToken: string;
}
