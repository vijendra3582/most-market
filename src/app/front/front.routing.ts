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
    DashboardComponent
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
        path: "vendors",
        canActivate: [],
        component: ListingComponent
    },
    {
        path: "brand/:slug",
        canActivate: [],
        component: ListingComponent
    },
    {
        path: "category/:slug",
        canActivate: [],
        component: ListingComponent
    },
    {
        path: "sub-category/:slug",
        canActivate: [],
        component: ListingComponent
    },
    {
        path: "product/:slug",
        canActivate: [],
        component: SingleComponent
    },
    {
        path: "checkout",
        canActivate: [AuthGuard],
        component: CheckoutComponent
    },
    {
        path: "user/dashboard",
        canActivate: [AuthGuard],
        component: DashboardComponent
    }
];