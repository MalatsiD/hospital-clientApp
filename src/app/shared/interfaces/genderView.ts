import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface GenderView {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

//For single view
export interface GenderSingleResponseView extends ApiResponse {
    response: GenderView;
}

//For table view with pagination
export interface GenderPaginatedResponseView extends ApiResponsePaginated {
    response: Array<GenderView>;
}

export interface GenderViewList extends Array<GenderView> {
}

export interface GenderResponseView extends ApiResponse {
    response: Array<GenderView>;
}