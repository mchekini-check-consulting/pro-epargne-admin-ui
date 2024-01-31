import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { map } from 'rxjs';

export const HttpRequestInterceptor: HttpInterceptorFn = (req, next) => {

    const oauthService = inject(OAuthService)


    const accessToken = oauthService.getAccessToken();

    if (accessToken != null) {
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
        });
    }

    return next(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body && event.body.data) {
                    event = event.clone({body: event.body.data});
                } else {
                    event = event.clone({body: event.body});
                }
            }
            return event;
        })
    );
}
