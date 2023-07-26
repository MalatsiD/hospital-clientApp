import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface CountryView {
    id: number;
    name: string;
    code: string;
    description: string;
    active: boolean;
}

//For single view
export interface CountrySingleResponseView extends ApiResponse {
    response: CountryView;
}

//For table view with pagination
export interface CountryPaginatedResponseView extends ApiResponsePaginated {
    response: Array<CountryView>;
}

export interface CountryViewList extends Array<CountryView> {
}

export interface CountryResponseView extends ApiResponse {
    response: Array<CountryView>;
}