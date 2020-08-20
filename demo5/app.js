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
    button({onclick:()=>{list.removeWhen(x=>x.a > 1980)}},'remove'),
    button({onclick:()=>{list.hideWhen(x=>x.a > 1980)}},'hide'),
    button({onclick:()=>{list.showWhen(x=>x.a > 1980)}},'show'),
]).render(document.getElementById('root'))

function sortList(prop,backwards){
    list.sortOn(prop,backwards)
}