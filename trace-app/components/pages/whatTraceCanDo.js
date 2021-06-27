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
        //make a double array with 10k elements
        let array = makeArray();



        setInterval(() => {
            for(let i = 0; i < 100; i++){
                let x = randomBetween(0,99);
                let y = randomBetween(0,99);
                let r = randomBetween(0,9);
                array.renderProps[x].val.renderProps[y].val = r;
            }
        }, 1);

        return displayBox([
            h2('Here are 10k numbers (0-9) changing'),
            p('Every 1000th of a second 100 random indexes are selected and changed to a random number (0-9)'),
            buttonComp('reset',resetArray),
            div({class:'the-grid'},[
                array.display(x=>div(x.display(x=>a(x))))
            ]),
        ]);

        function resetArray(){
            array.renderProps.forEach(rp => {
                rp.val.renderProps.forEach(rp2=>{
                    rp2.val = 0;
                })
            });
        }

        function makeArray(){
            return new RenderList(genLoop(
                100,()=>new RenderList(genLoop(100,()=>0))
            ));
        }
    }


    function makeManyElements(){
        return displayBox([
            h2('Stress Test'),
            p('Here you can make N number of 1x1 px divs by entering N into the text box and clicking "Go". (be warned 1000000+ tends to freeze the browser up)'),
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
}