traceInit(window)
routerInit(window)

let __router = new Trac3Router(homePageComp,window)
let a = new RenderProp('test')
div({},[
    a.display((x,r)=>input({onkeyup:e=>r.bind(e),value:x},[])),
    
    
    div({class:'background'},[
        headerComponent(),
        a.display(x=>p(x)),
        div({class:'app-body'},[
            a.display((x,r)=>div([
                p(x),
                a.display((x,r)=>input({onkeyup:e=>r.bind(e),value:x},[]))
            ])),
            __router.display(x=>x()),
        ]),
        footerComp()
    ])
]).render('root')





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