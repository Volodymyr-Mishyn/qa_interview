export class MainController {

    constructor(MainService) {
        'ngInject';
        this.MainService = MainService;
        console.log('test-qa');
        this.list = this.MainService.getList();
    }

    removeAll() {
        this.list = [];
        this.MainService.clearAll();
        this.list = this.MainService.getList();
    }

    addItem() {
        let text = '';
        if (this.text.length > 60) {
            text = this.text.substring(0, 59);
        } else {
            text = this.text;
        }
        let item = {title: this.title, text: text};
        this.MainService.addItem(item);
        this.title = '';
        this.text = '   ';
    }

    removeItem(item) {
        this.MainService.removeItem(item);
    }

    completeItem(item) {
        this.MainService.completeItem(item);
    }
}