function buttonComp(text,clickEvent){
    return div({onclick:clickEvent, class:'tron-button'},[
        text
    ])
}

function editField(renderProp,attributes){
    attributes = attributes || {class:'block'};
    let editMode = new RenderProp(false);
    return editMode.display(x=>{
        if(!x){
            return div(attributes,[
                renderProp.display(x=>h2({style:"display:inline;"},x)),
                buttonComp('Edit',()=>editMode.val = true)
            ])
        }
        else{
            let area;
            return div(attributes,[
                renderProp.display(x=>area = input({value:x},[])),
                buttonComp('Save',()=>{
                    renderProp.val = area.$element.value;
                    editMode.val = false;
                })
            ])
        }
    })
}





function displayBox(attributes,body){
    if(!body) {
        body = attributes;
        attributes = {};
    }
    attributes.class = attributes.class && attributes.class + ' info-box' || 'info-box';
    return div(attributes,[body]);
}

function spacer(){
    return div({class:'spacer'},[])
}