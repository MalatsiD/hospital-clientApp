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
                routeLink: 'pharmaceutical-categories',
                icon: 'fa fa-hourglass-half',
                label: 'Pharmaceutical Categories'
            },
            {
                routeLink: 'pharmaceuticals',
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
                routeLink: 'countries',
                icon: 'fa fa-globe',
                label: 'Countries'
            },
            {
                routeLink: 'provinces',
                icon: 'fa fa-map-location-dot',
                label: 'Provinces'
            },
            {
                routeLink: 'cities',
                icon: 'fa fa-city',
                label: 'Cities'
            },
            {
                routeLink: 'address-types',
                icon: 'fa fa-map-pin',
                label: 'Address Types'
            },
            {
                routeLink: 'hospitals',
                icon: 'fa fa-circle-h',
                label: 'Hospitals'
            },
            {
                routeLink: 'ailments',
                icon: 'fa fa-lungs-virus',
                label: 'Ailments'
            },
            {
                routeLink: 'roles',
                icon: 'fa fa-users',
                label: 'Roles'
            },
            {
                routeLink: 'genders',
                icon: 'fa fa-venus-mars',
                label: 'Genders'
            },
            {
                routeLink: 'titles',
                icon: 'fa fa-graduation-cap',
                label: 'Titles'
            }
        ]
    },
];