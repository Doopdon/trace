var demos = [
    intro,
    bindingDemo,
    makeBigGraphInEfficient,
    makeEfficientGraph,
    makeThing3,
]

function app(root){
    var state = new renderProp(0);
    trace(this);
    div([
        state.display(x=>{
            return demos[x]();
        })
    ]).render(root)

    document.addEventListener('keypress',(e)=>{e.keyCode == 13 && state.update(x=>{return(x+1)%demos.length})})
}

var _root = document.getElementById('root');
app(_root)