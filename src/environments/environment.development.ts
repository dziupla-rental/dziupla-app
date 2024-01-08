export const environment = {
  production: false,
  appUrl: 'http://dziupla.local',
  backendPort: 8080,
  apiUrl: '',
};

environment.apiUrl =
  environment.appUrl + ':' + environment.backendPort + '/api';
