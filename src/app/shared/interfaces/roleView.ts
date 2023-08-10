import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface RoleView {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

//For single view
export interface RoleSingleResponseView extends ApiResponse {
    response: RoleView;
}

//For table view with pagination
export interface RolePaginatedResponseView extends ApiResponsePaginated {
    response: Array<RoleView>;
}

export interface RoleViewList extends Array<RoleView> {
}

export interface RoleResponseView extends ApiResponse {
    response: Array<RoleView>;
}