traceInit(window);

var list  = new RenderList([{a:1991,b:'c'},{a:1990,b:'b'},{a:1977,b:'a'}]);
div([
    div([
        button({onclick:()=>sortList('a')},'sort-up'),
        button({onclick:()=>sortList('b')},'sort-up')
    ]),
    list.display((x,y)=> div([
        textarea({onchange:(e)=>y.update(x=>(x.a = e.target.value) && x)},x.a),
        textarea({onchange:(e)=>y.update(x=>(x.b = e.target.value) && x)},x.b)
    ])),
    div([
        button({onclick:()=>sortList('a',true)},'sort-up'),
        button({onclick:()=>sortList('b',true)},'sort-up')
    ]),
    // list.display(x=>div([
    //     h3(x.a),
    //     h4(x.b)
    // ]))
]).render(document.getElementById('root'))

function sortList(prop,backwards){
    list.sortOn(prop,backwards)
}