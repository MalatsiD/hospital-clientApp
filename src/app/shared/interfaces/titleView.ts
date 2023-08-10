import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface TitleView {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

//For single view
export interface TitleSingleResponseView extends ApiResponse {
    response: TitleView;
}

//For table view with pagination
export interface TitlePaginatedResponseView extends ApiResponsePaginated {
    response: Array<TitleView>;
}

export interface TitleViewList extends Array<TitleView> {
}

export interface TitleResponseView extends ApiResponse {
    response: Array<TitleView>;
}