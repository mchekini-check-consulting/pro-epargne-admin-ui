import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://keycloak.check-consulting.net/auth/realms/master',
    redirectUri: window.location.origin,
    clientId: 'pro-epargne',
    responseType: 'code',
    logoutUrl : 'https://keycloak.check-consulting.net/auth/realms/master/protocol/openid-connect/logout',
    postLogoutRedirectUri: window.location.origin,
    showDebugInformation: true,
    requireHttps: false
};
