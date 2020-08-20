traceInit(window);

var prop = new RenderProp({name:'Gannon',dob:1991});

// div([
//     prop.display(x=>h1(x.name)),
//     prop.display(x=>h2(x.dob)),
//     prop.display(x=>h3(x.name+','+x.dob)),
//     button({onclick:()=>prop.hide()},'hide'),
//     button({onclick:()=>prop.show()},'show'),
// ]).render(document.getElementById('root'))


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