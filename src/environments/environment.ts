export const environment = {
  production: true,
  appUrl: 'https://dziupla.shop',
  backendPort: 8080,
  apiUrl: '',
};

environment.apiUrl =
  environment.appUrl + ':' + environment.backendPort + '/api';
