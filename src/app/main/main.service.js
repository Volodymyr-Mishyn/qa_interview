import { STORAGE_NAMES } from "./storage-names";

export class MainService {

    constructor(localStorageService) {
        'ngInject';
        this.localStorageService = localStorageService;
        this.list = [];
        console.log('%c CLICK LINK ------------------------------------------>','background: #222; color: #bada55');
        /* If you are reading this: congratulations, you know how to open dev tools:)
            Some intended bugs in code have their own id. Add those ids to corresponding test cases to gain additional karma
         */
        const fromStorage = this.localStorageService.get(STORAGE_NAMES.list);
        if (fromStorage) {
            this.list = fromStorage;
        }
        const countFromStorage = this.localStorageService.get(STORAGE_NAMES.count);
        if (countFromStorage) {
            this.countCompleted = countFromStorage;
            // BUG_ID:counterBugOne
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
        // BUG_ID:lengthBug
        if (this.list.length < 7) {
            this.list.push(item);
            this.localStorageService.remove(STORAGE_NAMES.list);
            this.localStorageService.set(STORAGE_NAMES.list, this.list);
        }
    }

    removeItem(item) {
        const index = this.list.indexOf(item);
        if (index >= 0) {
            this.list.splice(index, 1);
            this.localStorageService.remove(STORAGE_NAMES.list);
            if (this.list.length > 0) {
                this.localStorageService.set(STORAGE_NAMES.list, this.list);
            }
        }
    }

    completeItem(item) {
        this.countCompleted++;
        // BUG_ID:counterBugTwo
        let randomizer = Math.floor(Math.random() * 5) + 1;
        if (randomizer===3){
            console.log('bug:)');
            this.countCompleted++;
        }
        this.removeItem(item);
        this.localStorageService.remove(STORAGE_NAMES.count);
        this.localStorageService.set(STORAGE_NAMES.count, this.countCompleted);
    }

    clearAll() {
        this.list = [];
        this.localStorageService.remove(STORAGE_NAMES.list);
    }
}