export class MainController {

    constructor(MainService) {
        'ngInject';
        this.MainService = MainService;
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
        // ID:emptyTextBug
        if (!this.title||this.title===''){
            return;
        }
        let text = '';
        // ID:textBugTwo
        if (this.text.length > 60) {
            text = this.text.substring(0, 59);
        } else {
            text = this.text;
        }
        let item = {title: this.title, text: text};
        this.MainService.addItem(item);
        this.title = '';
        // ID:spacesBug
        this.text = '   ';
    }

    removeItem(item) {
        this.MainService.removeItem(item);
    }

    completeItem(item) {
        this.MainService.completeItem(item);
    }
}