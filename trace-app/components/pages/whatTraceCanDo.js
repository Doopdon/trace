function whatTraceCanDo(){

    return div([
        spacer(),
        hidShow('Make a bunch of elements',makeManyElements),
        hidShow('Giant Moving table',giganticMovingTable),
    ])

    function giganticMovingTable(hideFunct){
        let {array,monitorProp} = makeArray();
        let cont = new RenderProp(false)

        return displayBox([
            h2('Here are 10k numbers changing'),
            p('When you click "Go" every 1000th of a second 100 random decimals are changed to another random decimal (0-9). You can see the total of each row. (Yes it is useless)'),
            cont.display(x=>x ? 
                buttonComp('Reset',resetArray):
                buttonComp('Go',goCray)),
            p('Total of each rows as bar graph:'),
            monitor(),
            p('Output:'),
            changingGrid(),
            buttonComp('Close',()=>{cont.val=false,hideFunct()},'accent-alt-color'),
        ]);

        function goCray(){
            cont.val = true;
            loop();

            function loop(){
                setTimeout(() => {
                    if(!cont.val) return;
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
            }
        }

        function monitor(){
            return displayBox({class:'monitor'},[
                monitorProp.display(x=>div({class:'line',style:`width:${x}px;`},[]))
            ]);
        }

        function changingGrid(){
            return div({class:'the-grid'},[
                array.display(x=>div(x.display(x=>a(x))))
            ])
        }

        function resetArray(){
            cont.val = false;
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


    function makeManyElements(hideFunct){

        let elementNum = new RenderProp(0);
        let elementInput = new RenderProp(50000);
        let time = new RenderProp(0)

        return displayBox([
            h2('Stress Test'),
            p('Here you can make N number of 1x1 px divs by entering N into the text box and clicking "Go". (be warned 1000000+ tends to freeze the browser up)'),
            input({type:'number',onkeyup:e=>{elementInput.val=e.target.value}, value:elementInput.val},[]),
            elementInput.display(x=>div([`make ${numberWithCommas(x)} elements`])),
            buttonComp('Go',()=>{
                let t1 = new Date().getTime();
                elementNum.val = elementInput.val;
                let t2 = new Date().getTime();
                time.val = t2-t1;
            }),
            time.display(x=>x && p(`It took ${x/100} seconds`)),
            elementNum.display(x=>div({class:'stress-test'},genLoop(x,()=>div()))),
            buttonComp('Close',hideFunct,'accent-alt-color')
        ])
    }
}