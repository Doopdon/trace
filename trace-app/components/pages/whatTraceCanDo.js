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
        let {array,monitorProp} = makeArray();
        let cont;

        return displayBox([
            h2('Here are 10k numbers changing'),
            p('When you click "Go" every 1000th of a second 100 random decimals are changed to another random decimal (0-9). You can see the total of each row'),
            buttonComp('reset',resetArray),
            buttonComp('Go',goCray),
            p('Total of each rows as bar graph:'),
            monitor(),
            p('Output:'),
            changingGrid(),
        ]);

        function goCray(){
            cont = true;
            loop();

            function loop(){
                setTimeout(() => {
                    if(!cont) return;
                    updateNums();
                    sumAll();
                    loop()
                }, 1);
            }

            function updateNums(){
                for(let i = 0; i < 100; i++){
                    let x = randomBetween(0,99);
                    let y = randomBetween(0,99);
                    let r = randomBetween(0,9);
                    array.renderProps[x].val.renderProps[y].val = r;
                }
            }

            function sumAll(){
                var newArray = []
                array.renderProps.forEach((rp,i)=>{
                    newArray.push(rp.val.val.reduce((a, b) => a + b))
                })
                monitorProp.val =  newArray;
                console.log(monitorProp.val.length)
            }
        }

        function monitor(){
            return displayBox({class:'monitor'},[
                p('0-900'),
                monitorProp.display(x=>div({class:'line',style:`width:${x}px;`},[]))
            ]);
        }

        function changingGrid(){
            return div({class:'the-grid'},[
                array.display(x=>div(x.display(x=>a(x))))
            ])
        }

        function resetArray(){
            cont = false;
            array.renderProps.forEach(rp => {
                rp.val.renderProps.forEach(rp2=>{
                    rp2.val = 0;
                })
            });
            monitorProp.val = monitorProp.val.map(()=>0)
        }

        function makeArray(){
            let dimension =  100;
            let array = new RenderList(genLoop(
                dimension,()=>new RenderList(genLoop(dimension,()=>0))
            ));
            let monitorProp = new RenderList(genLoop(dimension,x=>0))
            return {array,monitorProp}
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