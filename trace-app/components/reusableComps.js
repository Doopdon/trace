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
                renderProp.display(x=>area = textarea(x)),
                buttonComp('Save',()=>{
                    renderProp.val = area.$element.value;
                    editMode.val = false;
                })
            ])
        }
    })
}

function headerComponent(){
    return div({class:'header-wrapper'},[
        link({rel:'icon',type:'image/png',href:'content/favicon.ico'},[]),
        div({class:'menu-item left'},[
            titleComp()
        ]),
        div({class:'menu-item right'},[
            menuComp()
        ]),
    ])
}

function footerComp(){
    return div({class:'footer'},[
        'this is a footer'
    ])
}

function menuComp(){
    return div({class:'burger-menu'},[
        div({class:'bar'},[]),
        div({class:'bar'},[]),
        div({class:'bar'},[]),
    ])
}

function titleComp(){
    return div({class:'title',onclick:()=>__pageController.val = homePageComp},[
        'Trac³'
    ])
}