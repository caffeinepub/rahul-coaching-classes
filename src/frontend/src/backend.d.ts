import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SamplePaper {
    id: bigint;
    title: string;
    classNumber: bigint;
    subject: string;
    year: bigint;
    uploadDate: Time;
    fileUrl: string;
}
export interface Material {
    id: bigint;
    title: string;
    classNumber: bigint;
    subject: string;
    description: string;
    fileType: string;
    uploadDate: Time;
    fileUrl: string;
}
export type Time = bigint;
export interface Announcement {
    id: bigint;
    title: string;
    content: string;
    date: Time;
    isPinned: boolean;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAnnouncement(announcement: Announcement): Promise<void>;
    addMaterial(material: Material): Promise<void>;
    addSamplePaper(paper: SamplePaper): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAnnouncement(id: bigint): Promise<void>;
    deleteMaterial(id: bigint): Promise<void>;
    deleteSamplePaper(id: bigint): Promise<void>;
    generateId(): Promise<bigint>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllMaterials(): Promise<Array<Material>>;
    getAllSamplePapers(): Promise<Array<SamplePaper>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMaterialsByClass(classNumber: bigint): Promise<Array<Material>>;
    getSamplePapersByYear(year: bigint): Promise<Array<SamplePaper>>;
    getStats(): Promise<{
        totalAnnouncements: bigint;
        totalMaterials: bigint;
        totalPapers: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAnnouncement(id: bigint, announcement: Announcement): Promise<void>;
    updateMaterial(id: bigint, material: Material): Promise<void>;
    updateSamplePaper(id: bigint, paper: SamplePaper): Promise<void>;
}
