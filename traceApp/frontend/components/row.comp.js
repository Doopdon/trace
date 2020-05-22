import coolButton from './button.comp.js'
function rowComp(data,util){
    var quantityElem;//you can save references to individual renderObjects. they may not have an element rendered yet
    //but you can reference that element after its rendered
    trace(this);
    return tr([
        td({class:'row-item'},[
            data.name.display(//using an un-focused display so that it will not update unless its not focused TODO update when focus is lost
                theValueInTheRenderProp=>textarea( //ufDisplay/display call a function with the value you gave it
                    {onchange:e=>data.name.set(e.target.value)},//when the key is up I set the value to the target value causing the RenderProp's "state" to update
                     theValueInTheRenderProp)//this should just be a string of what is in the render prop. //TODO make ['string'] work.
            )
        ]),
        td({class:'row-item'},[
            quantityElem = textarea(data.quantity),//here i am just setting the textArea to the values
        ]),
        td({class:'row-item'},[
            h5(data.numUpdates)
        ]),
        td({class:'row-item'},[
            coolButton('delete',()=>{deleteRecord(data.id,util.delete)})//the util that gets passed into all RenderList items has a delete function for easy list manipulation
        ]),
        td({class:'row-item'},[
            coolButton('save',()=>{
                var qty = quantityElem.element.value;//you can get the element from the renderObject and get whatever info you need
                updateRecord(
                    {name:data.name.get(),quantity:qty,id:data.id,numUpdates:data.numUpdates},//TODO i need to make an easier way to get data out
                    x=>util.set(new DataForRendering(x))
                )}
            )
        ]),
    ])
}

//bunch of crud methods I hacked together not really relevant
function updateRecord(newItem,callback){
    fetch('/api/update',{method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newItem)
    }).then(r => r.json()).then(callback)
}

class DataForRendering{
    constructor(data){//takes a simple object and turns one of its props into a RenderProp
        this.id = data.id;
        this.name = new RenderProp(data.name);//using a RenderProp for the name so you can see how it helps.
        this.quantity = data.quantity;//intentionally not making this a RenderProp so you can see its still possible to work with.
        this.numUpdates = data.numUpdates;
    }
}

export default rowComp;