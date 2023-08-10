import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface AilmentView {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

//For single view
export interface AilmentSingleResponseView extends ApiResponse {
    response: AilmentView;
}

//For table view with pagination
export interface AilmentPaginatedResponseView extends ApiResponsePaginated {
    response: Array<AilmentView>;
}

export interface AilmentViewList extends Array<AilmentView> {
}

export interface AilmentResponseView extends ApiResponse {
    response: Array<AilmentView>;
}