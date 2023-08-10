import { AddressDtoList } from "./address-dto";

export interface HospitalDto {
    name: string;
    phoneNumber: string;
    email: string;
    registrationNumber: string;
    active: boolean;
    addresses: AddressDtoList;
}