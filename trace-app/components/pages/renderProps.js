function renderProps(){
    
    return div([
        spacer(),
        simpleRenderPropDemo(),
        spacer(),
        recursiveRenderPropDemo(),
        spacer(),
        renderPropListDemo(),
    ])


    function simpleRenderPropDemo(){
        let input;
        let rp = new RenderProp('Trac³');
        return displayBox({class:'render-prop-demo'},[
            h4('Here you can see a render prop in action'),
            p('change the text and see all the corresponding items change'),
            p('Here is a renderprop:'),
            rp.display(x=>h3({class:'render-prop-item'},x)),
            p('and another:'),
            rp.display(x=>h1({class:'render-prop-item'},x)),
            rp.display(x=>input = textarea({class:'render-prop-item'},x)),
            buttonComp('Update',()=>rp.val = input.$element.value),
        ])
    }

    function recursiveRenderPropDemo(){

        let users = [
            {
                name: new RenderProp('Abe'),
                email: new RenderProp('Abe@example.com'),
                address: new RenderProp('123 Fake Street')
            },
            {
                name: new RenderProp('Bob'),
                email: new RenderProp('bob@example.com'),
                address: new RenderProp('543 Real Street')
            },
            {
                name: new RenderProp('Carl'),
                email: new RenderProp('carl@example.com'),
                address: new RenderProp('639 South Hampton Ave')
            }
        ]

        let currentUser = new RenderProp(users[0]);

        function changeUser(event){
            currentUser.val = users[event.target.selectedIndex];
        }

        let renderPropDisplayElem = x=> p({class:'render-prop-item'},x)

        return displayBox({class:'render-prop-demo block'},[
           select({onchange:x=>changeUser(x)},[
               users.map((x,i)=>option('User: '+(i+1)))
           ]),
           currentUser.display(x=>{
               return div([
                    x.name.display(renderPropDisplayElem),
                    x.email.display(renderPropDisplayElem),
                    x.address.display(renderPropDisplayElem),
               ])
           }),
           currentUser.display(x=>div([
               editField(x.name),
               editField(x.email),
               editField(x.address),
           ]))
        ])
    }

    function renderPropListDemo(){
        
        let names = new RenderList([
            'Abe',
            'Bob',
            'Carl',
            'Dave',
            'Edd',
            'Frank',
        ])

        
        return displayBox({},[
            names.display(x=>p({class:'render-prop-item'},x)),
            names.display((x,r)=>{return div({class:'list-item'},[
                div({class:'edit-item inline-block'},editField(r,{class:'inline'})),
                buttonComp('🗑',()=>r.delete()),
                buttonComp('⬆',()=>r.moveTo(r.index-1)),
                buttonComp('⬇',()=>r.moveTo(r.index+1)),
            ])}),
            buttonComp('Add',()=>names.push('new user')),
        ])
    }
}