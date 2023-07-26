import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface ProvinceView {
    id: number;
    name: string;
    code: string;
    description: string;
    countryId: number;
    countryName: string;
    active: boolean;
}

export interface ProvinceControlView {
    id: number;
    name: string;
    code: string;
}

export interface ProvinceControlListView extends Array<ProvinceControlView> {}

//For single view
export interface ProvinceSingleResponseView extends ApiResponse {
    response: ProvinceView;
}

//For table view with pagination
export interface ProvincePaginatedResponseView extends ApiResponsePaginated {
    response: Array<ProvinceView>;
}

export interface ProvinceViewList extends Array<ProvinceView> {
}

export interface ProvinceResponseView extends ApiResponse {
    response: Array<ProvinceView>;
}