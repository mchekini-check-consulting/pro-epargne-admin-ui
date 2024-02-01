import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://keycloak.check-consulting.net/auth/realms/pro-epargn-admin',
    redirectUri: window.location.origin,
    clientId: 'pro-epargne-admin',
    responseType: 'code',
    logoutUrl : 'https://keycloak.check-consulting.net/auth/realms/pro-epargn-admin/protocol/openid-connect/logout',
    postLogoutRedirectUri: window.location.origin,
    showDebugInformation: true,
    requireHttps: false
};
