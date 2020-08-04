import { Injectable } from '@angular/core';
import { ApiClient } from '../common/api.client';
import { TokenService } from './../services/token.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private api: ApiClient, private tokenService: TokenService) { }

    login(data) {
        return this.api.post('auth/user/login', data);
    }

    register(data) {
        return this.api.post('auth/user/register', data);
    }

    me() {
        return this.api.get('auth/user/me');
    }

    profile(data) {
        return this.api.post('auth/user/update', data);
    }

    resendVerification(data) {
        return this.api.post('auth/user/resend-verification', data);
    }

    verifyUser(data) {
        return this.api.post('auth/user/verify-user', data);
    }

    forgotPassword(data) {
        return this.api.post('auth/user/forgot-password', data);
    }

    resetPassword(data) {
        return this.api.post('auth/user/reset-password', data);
    }
    
    logout(){
        this.tokenService.logout();
    }
}