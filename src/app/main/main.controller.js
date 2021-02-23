import angular from 'angular';

export class MainController {

    constructor(MainService,$mdPanel) {
        'ngInject';
        this.MainService = MainService;
        this.$mdPanel = $mdPanel;
        console.log('test-qa');
        /* If you are reading this: congratulations, you know how to open dev tools:)
            Some intended bugs in code have their own id. Add those ids to corresponding test cases to gain additional karma
         */
        this.list = this.MainService.getList();
    }

    removeAll() {
        this.list = [];
        this.MainService.clearAll();
        this.list = this.MainService.getList();
    }

    addItem() {
        // BUG_ID:emptyTextBug
        if (!this.title||this.title===''){
            return;
        }
        let text = '';
        // BUG_ID:textBugTwo
        if (this.text.length > 60) {
            text = this.text.substring(0, 59);
        } else {
            text = this.text;
        }
        let item = {title: this.title, text: text};
        this.MainService.addItem(item);
        this.title = '';
        // BUG_ID:spacesBug
        this.text = '   ';
    }

    removeItem(item) {
        this.MainService.removeItem(item);
    }

    completeItem(item) {
        this.MainService.completeItem(item);
    }

    openHelpPanel($event) {
        let position = this.$mdPanel.newPanelPosition()
            .relativeTo('#help')
            .addPanelPosition(this.$mdPanel.xPosition.ALIGN_START, this.$mdPanel.yPosition.BELOW);
        let config = {
            attachTo: angular.element(document.body),
            position: position,
            targetEvent: $event,
            template: `
                    Application should have following functionality:</br>
                    1. Ability to add todo elements in list</br>
                    2. Maximum amount of elements limited to 10</br>
                    3. Every todo should consist of title and text. Both fields required</br>
                    4. Max title length  - 20. Max text length -100</br>
                    5. Ability to remove todo elements from list</br>
                    6. Ability to complete todo elements from list</br>
                    7. Track count of completed todo elements</br>
                    8. Ability to remove all todo elements from list</br>
                    9. Persist all data during state transfers</br>
            `,
            panelClass: 'help-search-container',
            zIndex: 1000,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };
        this.$mdPanel.open(config);
    }
}