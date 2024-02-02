import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://keycloak.check-consulting.net/auth/realms/pro-epargne-admin',
    redirectUri: window.location.origin,
    clientId: 'pro-epargne-admin',
    responseType: 'code',
    logoutUrl : 'https://keycloak.check-consulting.net/auth/realms/pro-epargne-admin/protocol/openid-connect/logout',
    postLogoutRedirectUri: window.location.origin,
    showDebugInformation: true,
    requireHttps: false
};
