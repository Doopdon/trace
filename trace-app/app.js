traceInit(window)

let __pageController = new RenderProp(whatTraceCanDo)

div({},[
     div({class:'background'},[
        headerComponent(),
        div({class:'app-body'},[
            __pageController.display(x=>x()),
        ]),
        footerComp()
    ])
]).render('root')


function displayBox(attributes,body){
    attributes = attributes || {};
    attributes.class = attributes.class && attributes.class + ' info-box' || 'info-box';
    return div(attributes,[body]);
}

function spacer(){
    return div({class:'spacer'},[])
}


//I dont like using get
//I want to just hand in a render prop and it assumes its the value
//no way to get count of list

//I got an error that said i had too many parameters, which was right, but it was hard to track down. caused by 
// div(
//     div(),
//     div(),
//     div()
// )

//looks like render props cannot display an array only an element wrapper

// let user = new RenderProp({name:new RenderProp('gannon'),age:new RenderProp(29)})

// let users = new RenderList([
//     {name:new RenderProp('bill'),age:new RenderProp(23)},
//     {name:new RenderProp('gannon'),age:new RenderProp(29)},
//     {name:new RenderProp('ted'),age:new RenderProp(43)},
// ])


//should add error like "RednerProp Display function does not return anything" happens with rp.display(x={
//  div()
//})


//I got an error I need to look into. "render not defined" when I used this names.display((x,r)=>{return div([editField(r)])})

//ok wierd assed thing that happen. so when you use an onclick the element that is getting clicked gets passed through as "this" which causes errors   buttonComp('delete',r.delete) or at least give a good error message