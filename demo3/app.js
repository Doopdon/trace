traceInit(window);
let idItr = 0;
class Person{
    constructor(info){
        info = info ?? {};
        let {firstName,lastName,catchPhrase,dob,dod,yearsXp,height} = info;
        this.firstName = firstName ?? 'John'
        this.lastName = lastName ?? 'Doe'
        this.dob = dob ?? 1900;
        this.dod = dod ?? 'N/A';
        this.height = height ?? 5.5
        this.catchPhrase = catchPhrase ?? 'TBD'
        this.yearsXp = yearsXp ?? 0
        this.id = idItr++;
    }
}
let people = [
    new Person({firstName:'Gannon', lastName: 'Huiting', age: 28, dob:1991, height: 6.2}),
    new Person({firstName:'Dave', lastName: 'Johnson', age: 43, dob:1977, height:6.0}),
    new Person({firstName:'Chris', lastName: 'Jordan', age: 29, dob:1990, height:6.1}),
]
let list = new RenderList(people)
div([
    quickTable(list,[
        ['FirstName','firstName','!string'],
        ['Last Name','lastName','!string'],
        ['Catch Phase','catchPhrase','string'],
        ['Dob','dob','!date'],
        ['Dod','dod','date'],
        ['yearsXp','yearsXp','number'],
        ['Height','height','!number'], 
    ]),
    mirrorComp(list),
]).render(document.getElementById('root'))


function quickTable(inputList,template,events){
    validateTemple(template)
    let doNothing = (input,key,callback)=>{callback(input,key)}
    let doNothingB = (callback)=>{callback()}
    let {onAdd,onDelete,onEdit,onSaveChanges} = events ?? {};
    onAdd = onAdd ?? doNothingB;
    onDelete = onDelete ?? doNothing;
    onEdit = onEdit ?? doNothing;
    onSaveChanges = onSaveChanges ?? doNothing
    inputList = (inputList instanceof RenderList) ? inputList: new RenderList(inputList);
    return div([
        table([
            tr([
                template.map(headerInfo=>tableHeaderComp(headerInfo,inputList)),
                th('Delete'),

            ]),
            list.display((x,r)=>tr([
                template.map(info=>tableCellComp(info,r)),
                td(buttonComp('delete',()=>r.delete(),'warning'))
            ]))
        ]),
        buttonComp('Add New',()=>add())
    ])
    function add(){
        onAdd((v)=>{list.push(v ?? {})})
    }
    function validateTemple(){
        
    }
    function tableCellComp(info,listItem){
        if(info[2] === '!string') return roString(info,listItem);
        if(info[2] === '!number') return roString(info,listItem);
        if(info[2] === 'string') return string(info,listItem);
        if(info[2] === 'number') return string(info,listItem);
        if(info[2] === 'date') return string(info,listItem);
        if(info[2] === '!date') return roString(info,listItem);
        return td('not implemented')

        function roString(info,listItem){
            return td(listItem.get()[info[1]])
        }
        function string(info,listItem){
            return td(textarea({onchange:(e)=>{
                onEdit(e.target.value,[info[1]],(v,k)=>listItem.update(x=>{x[k] = v; return x}))}},
                listItem.get()[info[1]])
            )
        }
    }
    function tableHeaderComp(info,listRef){
        let reverse = new RenderProp({reverse:false,arrow:'⇑'})
        return th([
            reverse.display(x=>a({onclick:sort},info[0]+' '+x.arrow))
        ])
        function sort(){
            listRef.sortOn(info[1],reverse.get().reverse)
            reverse.get().reverse ?
            reverse.set({reverse:false,arrow:'⇑'}) :
            reverse.set({reverse:true, arrow:'⇓'}) 
            
        }
    }

}

function buttonComp(text,onclick,style){
    style = style || 'neutral';
    return button({onclick,class:'btn-'+style},text);
}

function mirrorComp(list){
    return div([
        list.display(x=>h6(propLister(x)))
    ])
    function propLister(obj){
        return Object.keys(obj).map(k=>`{${k}:${obj[k]}}`).join(' ');
    }
}