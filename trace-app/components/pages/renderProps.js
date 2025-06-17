function renderProps(){
    
    return div([
        spacer(),
        simpleRenderPropDemo(),
        spacer(),
        recursiveRenderPropDemo(),
        spacer(),
        renderPropListDemo(),
        spacer(),
        bindingDemoComp()
    ])


    function simpleRenderPropDemo(){
        let input;
        let rp = new RenderProp('Trac³');
        return displayBox({class:'render-prop-demo'},[
            h4('Here you can see a render prop in action'),
            p('change the text and see all the corresponding items change'),
            p('Here is a render prop:'),
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
            p('Here is an example of the recursive nature of render props.'),
            p('In this example there is a render prop that takes an object in ths case a user object with a name, email and address propery.'),
            p('You can change render prop with this drop down'),
           select({onchange:x=>changeUser(x)},[
               users.map((x,i)=>option('User: '+(i+1)))
           ]),
           p('This swaps the render prop with another user object.'),
           p('But the name, email and address are themselves render props of the user object'),
           p('Because of this only the email elements change when the email is changed which saves on dom manipulation'),
           currentUser.display(x=>{
               return div([
                    x.name.display(renderPropDisplayElem),
                    x.email.display(renderPropDisplayElem),
                    x.address.display(renderPropDisplayElem),
               ])
           }),
           p('Here you can edit the individual sub-render props and see them affect the elements above.'),
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
            p('The most powerful render prop is the render list, which handles a list of render props.'),
            p('You could simply create an array of render props, but deleting, inserting and reordering will be difficult.'),
            p('A render List handles all the deleting, inserting and reordering while changing as few elements as possible.'),
            p('When you create a render and call "display" you will get a render prop with added functionality to help you interface with the render list the render prop is apart of'),
            p('Here you can see how a render list can add, edit, remove and reorder a set of list items.'),
            names.display(x=>p({class:'render-prop-item'},x+',')),
            p('You can see how the list above changes with the editable list below.'),
            names.display((x,r)=>{return div({class:'list-item'},[
                div({class:'edit-item inline-block'},
                editField(r,{class:'inline'})),
                buttonComp('🗑',()=>r.delete()),
                buttonComp('⬆',()=>r.moveTo(r.index-1)),
                buttonComp('⬇',()=>r.moveTo(r.index+1)),
            ])}),
            buttonComp('Add',()=>names.push('new user')),
            p('Some additional info:'),
            ul([
                li(p('Each list item has an Id that is simply an int that gets incremented with each new item (it never resets or decrements)')),
                li(p('Whenever a reorder, delete or insert occurs the render list iterates through each index and ties the items id to the index so index can be found quickly')),
                li(p('When an item is moved, it is deleted and reinserted but the id is kept')),
            ])

        ])
    }

    function bindingDemoComp(){
        let t = new RenderProp('change this text')
        return div([
            t.display(x=>p(x)),
            t.display((x,r)=>input({onkeyup:r.bUp(),value:x},'')),
            t.display(x=>input({onkeyup:t.boundUpdate.bind(t),value:x},'')),
        ])
    }
}