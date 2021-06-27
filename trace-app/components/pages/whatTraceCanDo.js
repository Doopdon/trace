function whatTraceCanDo(){

    let oneK;
    let elementNum = new RenderProp(1000)

    return div([
        elementNum.display(x=>{
            return input({onchange:e=>{elementNum.val=e.target.value}, value:x},[])
        }),
        elementNum.display(x=>div([`make ${x} elements`])),
        buttonComp('Go',x=>{
            oneK.append(stress(elementNum.val))
        }),
        (oneK = div()),



    ])





    function stress(length){
        var arr = [];
        for(let i =0; i < (length || 1000); i++){
            arr.push(div());
        }
        return div({class:'stress-test'},arr)
    }


}