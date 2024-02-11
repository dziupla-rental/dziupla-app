export const environment = {
  production: true,
  appUrl: 'https://api.dziupla.shop',
  backendPort: 80,
  apiUrl: '',
};

environment.apiUrl =
  environment.appUrl + ':' + environment.backendPort + '/api';
