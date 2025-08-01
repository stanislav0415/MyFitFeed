import { HttpInterceptorFn } from "@angular/common/http";


export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
 

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token.trim()}` } })
    : req;

  return next(authReq);
}
