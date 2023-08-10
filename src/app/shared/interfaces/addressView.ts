export interface AddressView {
    addressId: number;
    addressDetail: string;
    zipCode: number;
    addressTypeId: number;
    addressTypeName: string;
    cityId: number;
    cityName: string;
    provinceId: number;
    provinceName: string;
    countryId: number;
    countryName: string;
}

export interface AddressViewList extends Array<AddressView> {}