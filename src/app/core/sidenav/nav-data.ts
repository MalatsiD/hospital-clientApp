import { INavbarData } from "./interfaces/helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'employees',
        icon: 'fa fa-user-doctor',
        label: 'Employees'
    },
    {
        routeLink: 'patients',
        icon: 'fa fa-bed-pulse',
        label: 'Patients'
    },
    {
        routeLink: 'departments',
        icon: 'fa-regular fa-building',
        label: 'Departments'
    },
    {
        routeLink: 'wards',
        icon: 'fa fa-hospital-user',
        label: 'Wards'
    },
    {
        routeLink: 'pharmacy',
        icon: 'fa fa-prescription-bottle-medical',
        label: 'Pharmacy',
        items: [
            {
                routeLink: 'pharmacy/pharmaceutical-categories',
                icon: 'fa fa-hourglass-half',
                label: 'Pharmaceutical Categories'
            },
            {
                routeLink: 'pharmacy/pharmaceuticals',
                icon: 'fa fa-pills',
                label: 'Pharmaceuticals'
            }
        ]
    },
    {
        routeLink: 'vendors',
        icon: 'fa fa-store',
        label: 'Vendors'
    },
    {
        routeLink: 'settings',
        icon: 'fa fa-cog',
        label: 'Settings',
        items: [
            {
                routeLink: 'settings/countries',
                icon: 'fa fa-globe',
                label: 'Countries'
            },
            {
                routeLink: 'settings/provinces',
                icon: 'fa fa-map-location-dot',
                label: 'Provinces'
            },
            {
                routeLink: 'settings/cities',
                icon: 'fa fa-city',
                label: 'Cities'
            },
            {
                routeLink: 'settings/address-types',
                icon: 'fa fa-map-pin',
                label: 'Address Types'
            },
            {
                routeLink: 'settings/hospitals',
                icon: 'fa fa-circle-h',
                label: 'Hospitals'
            },
            {
                routeLink: 'settings/ailments',
                icon: 'fa fa-lungs-virus',
                label: 'Ailments'
            },
            {
                routeLink: 'settings/roles',
                icon: 'fa fa-users',
                label: 'Roles'
            },
            {
                routeLink: 'settings/genders',
                icon: 'fa fa-venus-mars',
                label: 'Genders'
            },
            {
                routeLink: 'settings/titles',
                icon: 'fa fa-graduation-cap',
                label: 'Titles'
            }
        ]
    },
];