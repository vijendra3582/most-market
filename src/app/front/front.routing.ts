import {
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    SingleComponent,
    ListingComponent,
    CheckoutComponent
} from './front.pages';

import {
    DashboardComponent,
    AddressComponent,
    ProfileComponent,
    OrderComponent,
    WishlistComponent
} from './../user/user.pages';

import { Routes } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { LoginGuard } from './../guards/login.guard';

export const frontRoutes: Routes = [
    {
        path: '',
        canActivate: [],
        component: HomeComponent
    },
    {
        path: 'vendor/:slug',
        canActivate: [],
        component: SingleComponent
    },
    {
        path: 'search',
        canActivate: [],
        component: ListingComponent
    },
    {
        path: "category/:slug",
        canActivate: [],
        component: ListingComponent
    },
    {
        path: "checkout",
        canActivate: [AuthGuard],
        component: CheckoutComponent
    },
    {
        path: "auth/login",
        canActivate: [LoginGuard],
        component: LoginComponent
    },
    {
        path: "auth/register",
        canActivate: [LoginGuard],
        component: RegisterComponent
    },
    {
        path: "about-us",
        canActivate: [],
        component: AboutComponent
    },
    {
        path: "contact-us",
        canActivate: [],
        component: ContactComponent
    },
    {
        path: "privacy-policy",
        canActivate: [],
        component: PrivacyPolicyComponent
    },
    {
        path: "terms-condition",
        canActivate: [],
        component: TermsConditionComponent
    },
    {
        path: "user/dashboard",
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: "user/address",
        canActivate: [AuthGuard],
        component: AddressComponent
    },
    {
        path: "user/address/:action",
        canActivate: [AuthGuard],
        component: AddressComponent
    },
    {
        path: "user/address/:action/:id",
        canActivate: [AuthGuard],
        component: AddressComponent
    },
    {
        path: "user/wishlist",
        canActivate: [AuthGuard],
        component: WishlistComponent
    },
    {
        path: "user/order",
        canActivate: [AuthGuard],
        component: OrderComponent
    },
    {
        path: "user/profile",
        canActivate: [AuthGuard],
        component: ProfileComponent
    }
];