export function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject';
    $locationProvider.hashPrefix(''); // by default '!'
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: './main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
    $urlRouterProvider.otherwise('/');
}
