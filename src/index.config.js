
export function config($logProvider, $mdDateLocaleProvider, $mdThemingProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    
    $mdThemingProvider.definePalette('orangePalette', {
        '50': '#d98f29',
        '100': '#dd9a3f',
        '200': '#e1a654',
        '300': '#e4b16a',
        '400': '#e8bc80',
        '500': '#ecc895',
        '600': '#f4dec1',
        '700': '#f8ead6',
        '800': '#fcf5ec',
        '900': '#ffffff',
        'A100': '#f4dec1',
        'A200': '#f0d3ab',
        'A400': '#ecc895',
        'A700': '#f4dec1',//, local fix to test
        'contrastDefaultColor': 'dark'
        // 'contrastDarkColors': '50 100 200 A100 A200'
    });
    $mdThemingProvider.definePalette('pinkPalette', {
        '50': '#c7cbd9',
        '100': '#99a1ba',
        '200': '#7883a4',
        '300': '#56607e',
        '400': '#49526c',
        '500': '#3d445a',
        '600': '#313648',
        '700': '#242835',
        '800': '#181b23',
        '900': '#07051d',
        'A100': '#c7cbd9',
        'A200': '#99a1ba',
        'A400': '#49526c',
        'A700': '#242835',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': '50 100 200 A100 A200'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('pinkPalette', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '900',
            'hue-3': 'A100'
        })
       // .warnPalette('red')
        .accentPalette('orangePalette', {
            'default': '500',
            'hue-1': 'A200',
            'hue-2': 'A100',
            'hue-3': 'A400'
        });
        // .backgroundPalette('grey', {
        //     'default': '50'
        // });
}
