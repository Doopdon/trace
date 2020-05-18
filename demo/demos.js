var demos = [
    test,
    
    intro,
    intoContinued,
    bindingDemo,
    makeBigInEfficientGraph,
    makeBigEfficientGraph,
    listDemo,
   
]

function app(root){
    var state = new RenderProp(0);
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
    var list = new RenderList([1,2,3])
    trace(this);
    return div([
        h3('Here is the most complicated part... lists'),
        h5('Lists need to add, delete and update items without re-rendering. this was hard to do. But the code is simple (I think)'),
        h5('Here are some buttons to changes the list. new items will just be 1+ the last highest number'),

        button({onclick:()=>list.append(index++)},'append'),
        button({onclick:()=>list.prepend(index++)},'prepend'),
        button({onclick:()=>list.pop()},'pop'),
        button({onclick:()=>list.shift()},'shift'),

        h3('Here is a RenderList, it is "displayed" 3 times in 3 different ways'),
        h5('This one displays each number in a different color depending on its remainder when dived by 3 (just so you can see class updates)'),
        div([
            list.display(x=>h1({class:['red-text','green-text','blue-text'][x%3]},x)),
        ]),

        div([
            h5('something to mention about lists is they do not replace or remove elements before them. this is so table headers are not affected'),
            h5('so it may cause confusion, lists are tricky. best to wrap them in a div if you don\'t want trouble (room for improvement!)'),
            list.display(x=>h5(x)),
        ]),

        h5('Here you can see that every list item is given "utilities", these include delete, insert-before, insert-after, get-current-index, and edit. the edit just increments the number'),
        div([
            list.display((x,li)=>div({class:['red','green','blue'][x%3]},[
                label(x),
                button({onclick:()=>li.insertAt(li.getIndex(),(index++))},'insert before'),
                button({onclick:()=>li.insertAt(li.getIndex()+1,(index++))},'insert after'),
                button({onclick:li.delete},'delete'),
                button({onclick:()=>alert(li.getIndex())},'getIndex'),
                button({onclick:()=>li.update(x=>x+1)},'edit'),
            ]))
        ]),
        
    ]) 
}

function makeBigInEfficientGraph(){
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

    var gr = new RenderProp(graph)
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

function makeBigEfficientGraph(root){
    var graphSize = 100;
    var graph = []
    for(var i = 0; i < graphSize; i++){
        var t = [];
        for(var j = 0; j < graphSize; j++){
            t.push(new RenderProp(i*100+j))
        }
        graph.push(t);
    }

    trace(this);
    return div({class:'red'},[
        h5('the problem is that the whole page re-renders when you click an element, here it is again using a "RenderProp" for each element. click an element again, it is now practically instantaneous'),
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
    var state = new RenderProp('This is a demo of how a single render prop can update many elements at once');
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
        state.display(x=>textarea({onkeyup:(e)=>{state.set(e.target.value)}},x)),        
        br(),
        label({class:'blue-text'},'this text area uses ufDisplay() or un-focused display, it wont update when the element has focus, or contains the element with focus.'),
        br(),
        state.ufDisplay(x=>textarea({onkeyup:(e)=>{state.set(e.target.value)}},x)),
        
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

function intoContinued(){
    trace(this);
    return div([
        h3('to get started you need to add the code <trace(this)> to the top of your function'),
        br(),
        h3('this adds a whole slue of 3 letter functions to your function without polluting the global scope'),
        h5({class:'blue-text'},'you can also use trace(window), if you don\'t care about the global scope, or you can use --var traceFunctions = trace()-- and use --traceFunctions.div()-- if you want'),
        br(),
        h3('now take a look at a simple trace-"element"'),
        h1('div({},[])'),
        h3('it is simply a function that takes 2 parameters. an object, and an array'),
        h3('the object holds all the attributes for the element ex:{class:"red"}, this will set the class of the element to "red". This also works for "id", "custom-attribute", and even things like "onclick" events, you can simply use --{onclick:function(){alert("hey")}}--'),
        h3('the second param holds a list of all the other trace-elements. so a div might have 2 h1\'s in it ex: div({},[h1("1"),h1("2")])'),
        h3('the elements in the array are added to the element as children in the order given'),
        br(),
        h3('now lets take a look at the --h1("1")-- trace-element. notice how it didn\'t have 2 params and instead of an array it just has a string?'),
        h3('This is because if an array is not given, instead a string is given (or boolean or number), trace will set the innerHTML to the given value.'),
        h3('trace will also infer if you are handing it attributes or not. so if you just call div like so: <div([h1("1"),h1("2")])> it will infer that it does not have any attributes and will just set the children'),
        h3('this also works for attributes: --div({class:"red"})--, this example has no children but a class of "red"'),
        br(),
        h3('Also trace will iterate through arrays recursively. ex --div([[h1("1"),[h1("2"),h1("3")],h1("4")],[h1("5"),h1("6")]])--. This will show up as a div with "1,2,3,4,5,6" in it'),
        h3('this is done so you can add arrays together easily, just put them both in a parent array. it also stops annoying issues like this --div([arr.map(x=>h1(x))])-- the div is given an array, and inside is the "map" function which returns another array.'),
        h3('if it didn\'t recursively iterate through the arrays you would get an error.'),
        br(),
        h3('lastly you we need to call the "render" function it takes an element that will be the parent, and it will return the created element ex:'),
        h1('div([h1("this is a trace app")]).render(document.getElementById("some-id"))'),
        h3('this will actually attach the element to the page. it will insert a div with and h1 into the element with "some-id"'),
        h3('it does this by creating an element, then recursively calling each trace-element\'s render function, passing its element in as the parameter. This will recursively append each element to the one above it'),
    ])
}

// function test(){
//     var p = new RenderProp({})
//     var s = new RenderList([1,2,3,4]);
//     setTimeout(()=>{
//         p.set({data:s});
//         console.log(p)
//     },1000);
//     return div([
//         p.display(x=>{
//             if(!x.data) return h1('loading');
//             return x.data.display(x=>h1(x))
//         })
//     ])
    
// }

// function testComp(word){
//     return h1(word)
// }

//this should run through every type trace can handle eventually.
function test(){
    trace(this)
    var list  = new RenderList([1,2,3,4])
    return div([
        div([
            list.ufDisplay((x,li)=>textarea({onkeyup:e=>li.set(e.target.value)},x))
        ]),
        div([
            list.ufDisplay(x=>h1(x))
        ])
    ])
}

