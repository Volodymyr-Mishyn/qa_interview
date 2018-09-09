export class MainService {

    constructor(localStorageService) {
        'ngInject';
        this.localStorageService =localStorageService;
        this.list = [];
       // this.localStorageService.remove('list');
        let fromStorage = this.localStorageService.get('list');
        if (fromStorage){
            this.list = fromStorage;
        }
    }

    getList(){
        return this.list;
    }

    addItem(item){
        item.id = this.list.length+1;
        this.list.push(item);
        this.localStorageService.remove('list');
        this.localStorageService.set('list',this.list);
    }

    removeItem(item){
        let index= this.list.indexOf(item);
        if (index>=0){
            this.list.splice(index,1);
            this.localStorageService.remove('list');
            if (this.list.length>0){
                 this.localStorageService.set('list',this.list);
            }
        }
    }

    clearAll(){
        this.list = [];
        this.localStorageService.remove('list');
    }
}