export const environment = {
  production: true,
  appUrl: 'https://dziupla.shop',
  backendPort: 80,
  apiUrl: '',
};

environment.apiUrl =
  'api.' + environment.appUrl + ':' + environment.backendPort + '/api';
