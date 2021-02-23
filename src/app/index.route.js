import mainTemplate from './main/main.html';

export function routerConfig($stateProvider, $urlRouterProvider,$locationProvider) {
    'ngInject';
    $locationProvider.hashPrefix(''); // by default '!'

    $stateProvider
        .state('search', {
            url: '/',
            template: mainTemplate,
            controller: 'MainController',
            controllerAs: 'main'
        });
    $urlRouterProvider.otherwise(($injector, $location) => {
        console.log('route:)');
        const mainService = $injector.get('MainService');
        // BUG_ID:counterBugRoute
        mainService.countCompleted+=2;
        return $location.path('/');
    });
}
