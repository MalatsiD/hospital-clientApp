import { AddressViewList } from "./addressView";
import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface HospitalView {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    registrationNumber: string;
    active: boolean;
    addresses: AddressViewList;
}

//For single view
export interface HospitalSingleResponseView extends ApiResponse {
    response: HospitalView;
}

//For table view with pagination
export interface HospitalPaginatedResponseView extends ApiResponsePaginated {
    response: Array<HospitalView>;
}

export interface HospitalViewList extends Array<HospitalView> {
}

export interface HospitalResponseView extends ApiResponse {
    response: Array<HospitalView>;
}