import { HospitalAddressDto } from "./hospital-address-dto";
import { PersonAddressDto } from "./person-address-dto";

export interface AddressDto {
    id: number;
    addressDetail: string;
    zipCode: number;
    cityId: number;
    addressTypeId: number;
    addressFor?: number;
    active: boolean;
    hospitalAddressDto?: HospitalAddressDto;
    personAddressDto?: PersonAddressDto;
}

export interface AddressDtoList extends Array<AddressDto> {}