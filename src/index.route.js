export function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject';
    //$locationProvider.hashPrefix(''); // by default '!'
    //$locationProvider.html5Mode({enabled: true, requireBase: false});
    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: './main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
    $urlRouterProvider.otherwise(($injector, $location) => {
        console.log('route:)');
        let mainService = $injector.get('MainService');
        // ID:counterBugRoute
        mainService.countCompleted+=2;
        return $location.path('/');
    });
}
