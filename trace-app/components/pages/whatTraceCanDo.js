function whatTraceCanDo(){

    let oneK;
    let elementNum = new RenderProp(1000)

    return div([
        elementNum.display(x=>{
            return textarea({onchange:e=>{elementNum.val=e.target.value}},x)
        }),
        elementNum.display(x=>div([`make ${x} elements`])),
        buttonComp('go',x=>{
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