import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Login request ला interceptor header लावू नये
  if (req.url.endsWith('/api/admin/login')) {
    return next(req);
  }

  const admin = localStorage.getItem('admin');

  if (!admin) {
    return next(req);
  }

  try {
    const adminData = JSON.parse(admin);

    const cloned = req.clone({
      headers: req.headers.set(
        'X-Admin-Id',
        String(adminData.id)
      )
    });

    return next(cloned);

  } catch (error) {
    console.error('Auth interceptor error:', error);
    localStorage.removeItem('admin');
    return next(req);
  }
};