function componentsDemoComp(){
    return div({},[
        div({},[
            button({onclick:()=>{alert('hey')}},'hey')
        ]),
        div({},[
            h1('h1'),
            h2('h2'),
            h3('h3'),
        ]),
        table({},[
            tr([
                td('thing'),
                td('stuff'),
                td([testComponent()])
            ]),
            tr([
                td('thing'),
                td('stuff'),
                td([testComponent()])
            ])
        ]),
        div({},[
           img({src:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Adriana_Salvatierra_Arriaza_%28Official_Photo%2C_2019%29_Chamber_of_Senators_of_Bolivia.jpg/248px-Adriana_Salvatierra_Arriaza_%28Official_Photo%2C_2019%29_Chamber_of_Senators_of_Bolivia.jpg'},[])
        ])

    ])

    function testComponent(){
        return div('test comp')
    }
}