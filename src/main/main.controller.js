export class MainController {

    constructor(MainService) {
        'ngInject';
        this.MainService = MainService;
        console.log('test-qa');
        this.list = this.MainService.getList();
    }

    removeAll(){
        this.MainService.clearAll();
    }

    addItem(){
        let text ='';
        if (this.text.length>60){
            text = this.text.substring(0,59);
        }
        let item= {title:this.title,text: this.text};
        this.MainService.addItem(item);
        this.title='';
        this.text ='   ';
    }

    removeItem(item){
        this.MainService.removeItem(item);
    }
}