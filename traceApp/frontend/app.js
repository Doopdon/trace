var state = new RenderProp({data:null})//this is the global state. it has a "state" inside it that can be changed independently

function app(root){
    trace(this);//this attaches all the div/h1/table methods to this function (I do this to avoid polluting the global scope) with 800 3 letter functions
    div([//the div function returns a "renderObject" //TODO capitalize that
        h1('here is a crud..y app'),
        h5('lol'),
        state.display(x=>{//the state has a display function. display takes a function. it adds it to a list, it calls all those functions when its value is "set"
            if(!x.data) 
                return h1('Loading...')//showing how it will update when events are fired without much work
            return tableComp(x.data);//here I am using a "table component" I could write out the whole table but this is a custom table
        }),
        coolButton('add new',()=>addRecord(//make a crud call
            x=>state.get().data.append(new DataForRendering(x))//simply get the state, get is "RenderList" property called "data", and call its append method to add the new item.
        )),
    ]).render(root)//all RenderObjects have a "render" function that takes a parent and returns an element
}
app(document.getElementById('root'))//get the root div and the app will attach its self to it

//this just calls the server to ask for the stuff
getCurrentData(data=>{
    var processedData = data.map(x=>new DataForRendering(x))//turn all the items into "DataForRendering" objects
    state.set({data:new RenderList(processedData)})//set the states value. its value has a data prop.
})

//here is what the data in the state's data array looks like
class DataForRendering{
    constructor(data){//takes a simple object and turns one of its props into a RenderProp
        this.id = data.id;
        this.name = new RenderProp(data.name);//using a RenderProp for the name so you can see how it helps.
        this.quantity = data.quantity;//intentionally not making this a RenderProp so you can see its still possible to work with.
        this.numUpdates = data.numUpdates;
    }
}

//bunch of crud methods I hacked together not really relevant
function updateRecord(newItem,callback){
    fetch('/api/update',{method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newItem)
    }).then(r => r.json()).then(callback)
}

function addRecord(callback){
    fetch('/api/add',{method: 'GET'})
    .then(r => r.json()).then(callback)
}

function getCurrentData(callback){
    fetch('/api/getall',{method:'GET'})
    .then(r => r.json()).then(callback)
}

function deleteRecord(id,callback){
    fetch('/api/delete',{method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:id
    }).then(callback)
}
