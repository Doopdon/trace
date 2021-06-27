function whatTraceCanDo(){

    let g = {};
    let elementNum = new RenderProp(1000);
    let elementInput = new RenderProp(1000);

    return div([
        makeManyElements(),
        spacer(),
        giganticMovingTable(),
    ])

    function giganticMovingTable(){
        return displayBox('hello world')
    }


    function makeManyElements(){
        return displayBox([
            h2('Stress Test'),
            p('Here you can make N number of 1x1 px divs by entering N into the text box and hitting "Go". (be warned 1000000+ tends to freeze the browser up)'),
            input({onkeyup:e=>{elementInput.val=e.target.value}, value:elementNum.val},[]),
            elementInput.display(x=>div([`make ${x} elements`])),
            buttonComp('Go',()=>{
                elementNum.val =  elementInput.val;
                //g.oneK.append(stress(elementNum.val))
            }),
            elementNum.display(x=>div({class:'stress-test'},genLoop(x,()=>div())))
                //elementNum.display(x=>div(x))
        ])
    }





    function stress(length){
        var arr = [];
        for(let i =0; i < (length || 1000); i++){
            arr.push(div());
        }
        return div({class:'stress-test'},arr)
    }


}