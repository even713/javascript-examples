class BaseInfiniteScrollFactory extends laygoon.util.BaseFactoryClass {
    constructor(injects, {ctrlScope, updateEventName, itemKeyName}){
        super(...injects);
        this.numPerPage = 1; // how many row will be fetched when a scroll event fired
        this.wholeList = []; // the whole list which will be fetched quickly once the page load
        this.viewingList = []; // the list that user current viewing
        this.items = []; // the datasource needed to be rendered for ng-repeat
        this.busy = false; // flag indicate if client is fetching data
        this.ctrlScope = ctrlScope;
        this.updateEventName = updateEventName;
        this.itemKeyName = itemKeyName;
    }

    // to be overreid
    updateView(){
        if(!this.items.length)
            return this.getWholeList();
        else
            return this.refresh();
    }

    // to be override
    // when a timerange change, refresh function will detect if we need to reload or update the page.
    refresh(){
        this.wholeList = [];//?

        this.busy = false;

        return this.getWholeList().then(() => {
            let viewListLength = this.viewingList.length;
            this.viewingList = this.wholeList.slice(0, viewListLength);
            let actualSize = this.viewingList.length;
            let newItems = [];
            this.viewingList.forEach(d => {
              let v;
              if(typeof d === "string")
                v = d;
              else {
                v = d[this.itemKeyName]
              }

              let item = this.items.find(d => d[this.itemKeyName] == v) || {[this.itemKeyName]: v};
              newItems.push(item);
            });
            this.items = newItems;
            console.log("refresh", this.items);
            //this.items.splice(actualSize, viewListLength - actualSize);
            this.update();
            // let compareList = this.wholeList.slice(0, this.viewingList.length);
            //
            // if(JSON.stringify(compareList) == JSON.stringify(this.viewingList)){
            //     if(this.numPerPage == -1) {
            //         this.viewingList = this.wholeList.slice();
            //     }
            //     this.update();
            // } else {
            //     // empty the content and then reload
            //     this.viewingList = [];
            //     this.items = [];
            // }

            this.$timeout(() => {
                //this.nextPage();
                this.ctrlScope.$emit(this.updateEventName);
            });
        });
    }

    update(){
        let updateList = this.viewingList.slice();
        this._update(updateList, 0);
    }

    // get the top of the queue to query detail
    // use "nth" to update "items" for updating UI
    _update(updateList, nth){
        let key = updateList.shift();
        if(!key) {
            this.busy = false;
            console.log("end of update queue");
            return;
        }

        this.busy = true;
        this.queryDetailPerPage([key]).then(detail => {
            console.log("update items", this.items, nth, detail)
            this.items[nth] = detail;
            this._update(updateList, nth + 1);
        });
    }

    getWholeList(){
        if(this.busy)
            return;

        this.busy = true;

        this.request = this.queryWholeList().then(data => {
            this.wholeList = data;
            this.busy = false;
            this.request = null;
            //console.log(this.wholeList);
        });

        return this.request;
    }

    // to be override
    // return a promise
    queryWholeList(){
    }

    // to be override
    queryDetailPerPage(list){
    }

    nextPage(){
        console.log("nextPage", this.busy);
        if(this.busy)
            return;

        let viewingListLength = this.viewingList.length;
        if(viewingListLength == this.wholeList.length)
            return;

        this.busy = true;

        if(this.numPerPage == -1) {
            this.viewingList = this.wholeList.slice();
            let updateList = this.viewingList.slice();
            this._update(updateList, 0);
        } else {
            let keys = this.wholeList.slice(viewingListLength, viewingListLength + this.numPerPage);

            this.viewingList = this.viewingList.concat(keys);
            //console.log(keys);

            this.request = this.queryDetailPerPage(keys)
                .then((data) => {
                  console.log("append item", data)
                    this.items = this.items.concat(data);
                    this.busy = false;
                    this.request = null;
                });
        }
    }

    removeItem(itemName, keyName){
        keyName = keyName || this.itemKeyName;
        this.wholeList = this.wholeList.filter(d => (keyName ? d[keyName] : d) !== itemName);
        this.viewingList = this.viewingList.filter(d => (keyName ? d[keyName] : d) !== itemName);
        this.items = this.items.filter(d => (keyName ? d[keyName] : d) !== itemName);
    }
}

BaseInfiniteScrollFactory.inject(["$timeout"])
