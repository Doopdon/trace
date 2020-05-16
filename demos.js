
function makeThing3(){
    var index = 4;
    var list = new renderList([1,2,3])
    trace(this);
    return div([
        button({onclick:()=>list.append(index++)},'append'),
        button({onclick:()=>list.prepend(index++)},'prepend'),
        button({onclick:()=>list.pop()},'pop'),
        button({onclick:()=>list.shift()},'shift'),

        div([
            h1('this is a header'),
            list.display(x=>h5({class:['red-text','green-text','blue-text'][x%3]},x)),
        ]),
        div([
            list.display(x=>h3(x)),
        ]),

        div([
            list.display((x,u)=>div({class:['red','green','blue'][x%3]},[
                label(x),
                button({onclick:()=>u.insertBefore(index++)},'insert before'),
                button({onclick:()=>u.insertAfter(index++)},'insert after'),
                button({onclick:u.delete},'delete'),
                button({onclick:()=>alert(u.getIndex())},'getIndex'),
                button({onclick:()=>u.get().update(x=>x+1)},'edit'),
            ]))
        ]),
        
    ]) 
}

function makeBigGraphInEfficient(){
    var graphSize = 100;
    var graph = []
    for(var i = 0; i < graphSize; i++){
        var t = [];
        for(var j = 0; j < graphSize; j++){
            t.push(i*100+j)
        }
        graph.push(t);
    }

    trace(this);

    var gr = new renderProp(graph)
    return div({class:'blue'},[
        gr.display(
            g=>table([
                g.map((x,i)=>tr(
                    x.map((y,j)=>td(
                        {onclick:()=>{gr.update(a=>a[i][j]++ && a)}}
                    ,y))
                ))
            ])
        )
    ])
}

function makeEfficientGraph(root){
    var graphSize = 100;
    var graph = []
    for(var i = 0; i < graphSize; i++){
        var t = [];
        for(var j = 0; j < graphSize; j++){
            t.push(new renderProp(i*100+j))
        }
        graph.push(t);
    }

    trace(this);
    return div({class:'red'},[
        table([
            graph.map((a)=>tr(
                a.map(rProp=>
                    rProp.display(x=>td({onclick:()=>rProp.update(i=>i+1)},x))
                )
            ))
        ])
    ])
}

function bindingDemo(){
    var state = new renderProp('this is a demo');
    trace(this);
    return div([
        state.display(x=>h1(x)),
        label('this text area uses ufDisplay or un-focused display'),
        br(),
        state.ufDisplay(x=>textArea({onkeyup:(e)=>{state.set(e.target.value)}},x)),
        br(),
        label('this text just uses the default display but it causes issues when editing'),
        br(),
        state.display(x=>textArea({onkeyup:(e)=>{state.set(e.target.value)}},x)),        
    ])
}

function intro(){
    trace(this);
    return div([
        h1({class:'blue-text'},'this is the stupid thing i made'),
        h3({class:'red-text'},'I can add all kinds of things to this'),
        button({onclick:()=>alert('this works')},'buttons work pretty easily'),
        p('this is what the code looks like'),
        p('div(['),
        p(`......h1({class:'blue-text'},'this is the stupid thing i made'),`),
        p(`......h3({class:'red-text'},'I can add all kinds of things to this'),`),
        p(`......button({onclick:()=>alert('this works')},'buttons work pretty easily'),`),
        p(`......p('this is what the code looks like'),`),
        p('])'),
        p('I cant get rid of the "..." because spaces get cut off'),
    ])
}

function types(){
    trace(this)
    return div([
        h1('things').render(blank())
    ])
}

