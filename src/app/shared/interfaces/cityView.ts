import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface CityView {
    id: number;
    name: string;
    code: string;
    description: string;
    provinceId: number;
    provinceName: string;
    active: boolean;
}

export interface CityControlView {
    id: number;
    name: string;
    code: string;
}

export interface CityControlListView extends Array<CityControlView> {}

//For single view
export interface CitySingleResponseView extends ApiResponse {
    response: CityView;
}

//For table view with pagination
export interface CityPaginatedResponseView extends ApiResponsePaginated {
    response: Array<CityView>;
}

export interface CityViewList extends Array<CityView> {
}

export interface CityResponseView extends ApiResponse {
    response: Array<CityView>;
}