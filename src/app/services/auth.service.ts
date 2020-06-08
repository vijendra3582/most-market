import { Injectable } from '@angular/core';
import { ApiClient } from '../common/api.client';
import { TokenService } from './../services/token.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private api: ApiClient, private tokenService: TokenService) { }

    login(data) {
        return this.api.post('auth/customer/login', data);
    }

    register(data) {
        return this.api.post('auth/customer/register', data);
    }

    resendVerification(data) {
        return this.api.post('auth/customer/resend-verification', data);
    }

    verifyUser(data) {
        return this.api.post('auth/customer/verify-user', data);
    }

    forgotPassword(data) {
        return this.api.post('auth/customer/forgot-password', data);
    }

    resetPassword(data) {
        return this.api.post('auth/customer/reset-password', data);
    }
    
    logout(){
        this.tokenService.logout();
    }
}