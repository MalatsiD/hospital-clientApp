import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface CountryView {
    id: number;
    name: string;
    code: string;
    description: string;
    active: boolean;
}

export interface CountryResponseView extends ApiResponsePaginated {
    response: Array<CountryView>;
}

export interface CountryViewList extends Array<CountryView> {
}