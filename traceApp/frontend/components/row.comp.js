function rowComp(data,util){
    var quantityElem;//you can save references to individual renderObjects. they may not have an element rendered yet
    //but you can reference that element after its rendered
    trace(this);
    return tr([
        td({class:'row-item'},[
            data.name.ufDisplay(//using an un-focused display so that it will not update unless its not focused TODO update when focus is lost
                theValueInTheRenderProp=>textArea( //ufDisplay/display call a function with the value you gave it
                    {onkeyup:e=>data.name.set(e.target.value)},//when the key is up I set the value to the target value causing the RenderProp's "state" to update
                     theValueInTheRenderProp)//this should just be a string of what is in the render prop. //TODO make ['string'] work.
            )
        ]),
        td({class:'row-item'},[
            quantityElem = textArea(data.quantity),//here i am just setting the textArea to the values
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
                    x=>util.val().set(new DataForRendering(x))
                )}
            )
        ]),
    ])
}