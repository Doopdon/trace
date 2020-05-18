var demos = [
    intro,
    bindingDemo,
    makeBigGraphInEfficient,
    makeEfficientGraph,
    listDemo,
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



function listDemo(){
    var index = 4;
    var list = new renderList([1,2,3])
    trace(this);
    return div([
        h3('Here is the most complicated part... lists'),
        h5('lists need to add, delete and update items without re-rendering. this was hard to do but the code is simple (I think)'),
        h5('Here are some buttons to changes the list. new items will just be 1+ the last highest number'),

        button({onclick:()=>list.append(index++)},'append'),
        button({onclick:()=>list.prepend(index++)},'prepend'),
        button({onclick:()=>list.pop()},'pop'),
        button({onclick:()=>list.shift()},'shift'),

        div([
            h2('Here is a RenderList, it is "displayed" 3 times in 3 different ways'),
            h3('this one displays each number in a different color depending on its remainder when dived by 3 (just so you can see class updates)'),
            list.display(x=>h3({class:['red-text','green-text','blue-text'][x%3]},x)),
        ]),
        div([
            h3('something to mention about lists is they do not replace or remove elements before them'),
            h3('so it may cause confusion, lists are tricky. best to wrap them in a div if you don\'t want trouble'),
            list.display(x=>h5(x)),
        ]),

        div([
            list.display((x,u)=>div({class:['red','green','blue'][x%3]},[
                label(x),
                button({onclick:()=>u.insertBefore(index++)},'insert before'),
                button({onclick:()=>u.insertAfter(index++)},'insert after'),
                button({onclick:u.delete},'delete'),
                button({onclick:()=>alert(u.getIndex())},'getIndex'),
                button({onclick:()=>u.val().update(x=>x+1)},'edit'),
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
        h5('here I made my tool make 10k elements. if you click one it will increment the number (you may notice a problem)'),
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
        h5('the problem is that the whole page re-renders when you click an element, here it is again using a "RenderProp" for each element'),
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
    var state = new renderProp('This is a demo of how a single render prop can update many elements at once');
    trace(this);
    return div([
        state.display(x=>h1(x)),
        h4('The H1 above and the and the two text areas below use the same render prop'),
        h5('to display a render prop use the "display" function'),
        h5('the display function takes a function that returns a render object'),
        h5('ex:[ return h1("i return a render object") or return div({class:"I do too"}[ h1("so do I")]), h1("I as well") ]) ]'),
        h5('there is a small hangup with RenderProp.display(), it recreates the element when its prop changes, this can be problematic:'),
        br(),
        label({class:'red-text'},'this text just uses the default display but it causes issues when editing (try and see)'),
        br(),
        state.display(x=>textArea({onkeyup:(e)=>{state.set(e.target.value)}},x)),        
        br(),
        label({class:'blue-text'},'this text area uses ufDisplay() or un-focused display, it wont update when the element has focus, or contains the element with focus.'),
        br(),
        state.ufDisplay(x=>textArea({onkeyup:(e)=>{state.set(e.target.value)}},x)),
        
    ])
}

function intro(){
    trace(this);
    return div([
        h1({class:'blue-text'},'this a tool i made called trace'),
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
        h2('You can press [Enter] cycle through the demos')
    ])
}

function types(){
    trace(this)
    return div([
        h1('things').render(blank())
    ])
}

