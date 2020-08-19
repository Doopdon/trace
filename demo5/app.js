traceInit(window);

var list  = new RenderList([{a:5,b:'c'},{a:2,b:'b'},{a:3,b:'a'},{a:4,b:'d'}]);
div([
    div([
        button({onclick:()=>sortList('a')},'sort-up'),
        button({onclick:()=>sortList('b')},'sort-up')
    ]),
    list.display((x,y)=> div([
        textarea({onchange:(e)=>y.update(x=>(x.a = e.target.value) && x)},x.a),
        textarea({onchange:(e)=>y.update(x=>(x.b = e.target.value) && x)},x.b)
    ])),
    // div([
    //     button('sort-down'),
    //     button('sort-down')
    // ]),
    // list.display(x=>div([
    //     h3(x.a),
    //     h4(x.b)
    // ]))
]).render(document.getElementById('root'))

function sortList(prop,backwards){
    list.sortOn(prop)
}