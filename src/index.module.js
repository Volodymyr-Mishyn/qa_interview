import 'angular';
import "angular-aria";
import "angular-animate";
import "@uirouter/angularjs";
import "angular-material";
import "angular-material/angular-material.scss";

import {routerConfig} from './index.route';
import {config} from './index.config';

import {MainController} from "./main/main.controller";
import {MainService} from "./main/main.service";

angular.module('testQA', ['ui.router', 'ngMaterial'])
    .config(config)
    .config(routerConfig)
    .service('MainService', MainService)
    .controller('MainController', MainController);
