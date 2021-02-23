'use strict';
import angular from 'angular';
import "@uirouter/angularjs";
import "angular-material";
import "angular-material/angular-material.scss";
import "angular-local-storage";

import {routerConfig} from './index.route';
import {config} from './index.config';

import {MainController} from "./main/main.controller";
import {MainService} from "./main/main.service";

angular.module('testQA', ['ui.router', 'ngMaterial','LocalStorageModule'])
    .config(config)
    .config(routerConfig)
    .service('MainService', MainService)
    .controller('MainController', MainController);
