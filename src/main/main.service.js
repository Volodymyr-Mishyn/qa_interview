export class MainService {

    constructor(localStorageService) {
        'ngInject';
        this.localStorageService = localStorageService;
        this.list = [];

        // this.localStorageService.remove('list');
        let fromStorage = this.localStorageService.get('list');
        if (fromStorage) {
            this.list = fromStorage;
        }
        let countFromStorage = this.localStorageService.get('count');
        if (countFromStorage) {
            this.countCompleted = countFromStorage;
            if (this.countCompleted > 1) {
                this.countCompleted--;
            }
        } else  {
            this.countCompleted = 0;
        }
    }

    getList() {
        return this.list;
    }

    addItem(item) {
        item.id = this.list.length + 1;
        if (this.list.length < 7) {
            this.list.push(item);
            this.localStorageService.remove('list');
            this.localStorageService.set('list', this.list);
        }
    }

    removeItem(item) {
        let index = this.list.indexOf(item);
        if (index >= 0) {
            this.list.splice(index, 1);
            this.localStorageService.remove('list');
            if (this.list.length > 0) {
                this.localStorageService.set('list', this.list);
            }
        }
    }

    completeItem(item) {
        this.countCompleted++;
        this.removeItem(item);
        this.localStorageService.remove('count');
        this.localStorageService.set('count', this.countCompleted);
        console.log(this.countCompleted);
    }

    clearAll() {
        this.list = [];
        this.localStorageService.remove('list');
    }
}