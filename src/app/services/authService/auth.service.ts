import { Injectable, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { 
    AuthModule,
    OidcSecurityService,
    OpenIDImplicitFlowConfiguration,
    OidcConfigService,
    AuthWellKnownEndpoints

 } from 'angular-auth-oidc-client';

@Injectable()
export class AuthService implements OnInit, OnDestroy {
    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;
    loggedUserId:string;
    
    constructor(public oidcSecurityService: OidcSecurityService,
        private oidcConfigService: OidcConfigService,
        private http: HttpClient,
        @Inject('ORIGIN_URL') originUrl: string,
        @Inject('IDENTITY_URL') identityUrl: string
    ) { 
        const openIdImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
        openIdImplicitFlowConfiguration.stsServer = identityUrl;
        openIdImplicitFlowConfiguration.redirect_url = originUrl;
        openIdImplicitFlowConfiguration.client_id = 'dews.web';
        openIdImplicitFlowConfiguration.response_type = 'id_token token';
        openIdImplicitFlowConfiguration.scope = 'openid profile dews.api';
        openIdImplicitFlowConfiguration.post_logout_redirect_uri = originUrl;
        openIdImplicitFlowConfiguration.forbidden_route = '/forbidden';
        openIdImplicitFlowConfiguration.unauthorized_route = '/unauthorized';
        openIdImplicitFlowConfiguration.auto_userinfo = true;
        openIdImplicitFlowConfiguration.log_console_warning_active = true;
        openIdImplicitFlowConfiguration.log_console_debug_active = false;
        openIdImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;


        const authWellKnownEndpoints = new AuthWellKnownEndpoints();
        const identityServerBaseUrl = 'http://localhost:5000'; 
        authWellKnownEndpoints.issuer = identityServerBaseUrl; 
        authWellKnownEndpoints.jwks_uri = identityServerBaseUrl +'/.well-known/openid-configuration/jwks';
        authWellKnownEndpoints.authorization_endpoint = identityServerBaseUrl + '/connect/authorize';
        authWellKnownEndpoints.token_endpoint = identityServerBaseUrl + '/connect/token';
        authWellKnownEndpoints.userinfo_endpoint = identityServerBaseUrl + '/connect/userinfo';
        authWellKnownEndpoints.end_session_endpoint = identityServerBaseUrl + '/connect/endsession';
        authWellKnownEndpoints.check_session_iframe = identityServerBaseUrl + '/connect/checksession';
        authWellKnownEndpoints.revocation_endpoint = identityServerBaseUrl + '/connect/revocation';
        authWellKnownEndpoints.introspection_endpoint = identityServerBaseUrl + '/connect/introspect';
  
        this.oidcSecurityService.setupModule(openIdImplicitFlowConfiguration,authWellKnownEndpoints);

        if (this.oidcSecurityService.moduleSetup) {
            this.doCallbackLogicIfRequired();
        } else {
            this.oidcSecurityService.onModuleSetup.subscribe(() => {
                this.doCallbackLogicIfRequired();
            });
        }
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });
    }

    ngOnDestroy(): void {
        this.isAuthorizedSubscription.unsubscribe();
        this.oidcSecurityService.onModuleSetup.unsubscribe();
    }

    getIsAuthorized(): Observable<boolean> {
        return this.oidcSecurityService.getIsAuthorized();
    }

    login() {
        console.log('start login');
        this.oidcSecurityService.authorize();
    }

    refreshSession() {
        console.log('start refreshSession');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }
    getUserinfo() : Observable<any>
    {
       
        return this.oidcSecurityService.getUserinfo(true,)
    }
    getUserData() : Observable<any>
    {
        return this.oidcSecurityService.getUserData();
    } 
    
    private doCallbackLogicIfRequired() {
        if (typeof location !== "undefined" && window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }
 
    public getHeaders() {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this.appendAuthHeader(headers);
    }
    
    public CheckIsUserAuthorizedToEditDelete(userId): boolean
    { 
        return this.loggedUserId == userId;  
    }
    public setUserId(userId)
    {
        this.loggedUserId = userId;
    }

    public isAuthenticated()
    {
    return this.oidcSecurityService.getToken() != '';
    }
    public appendAuthHeader(headers: HttpHeaders) {
        const token = this.oidcSecurityService.getToken();

        if (token === '') return headers;

        const tokenValue = 'Bearer ' + token;
        return headers.set('Authorization', tokenValue);
    }
}