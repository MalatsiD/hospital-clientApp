import { ApiResponse, ApiResponsePaginated } from "./api-response";

export interface AddressTypeView {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

//For single view
export interface AddressTypeSingleResponseView extends ApiResponse {
    response: AddressTypeView;
}

//For table view with pagination
export interface AddressTypePaginatedResponseView extends ApiResponsePaginated {
    response: Array<AddressTypeView>;
}

export interface AddressTypeViewList extends Array<AddressTypeView> {
}

export interface AddressTypeResponseView extends ApiResponse {
    response: Array<AddressTypeView>;
}