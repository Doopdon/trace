function tableComp(listToRender){//here is a table comp, it takes a render list. it can take whatever the hell you want
    trace(this);//attach trace functions
    return table([
        tr([
            th('name'),
            th('quantity'),
            th('num-updates'),
            th(),
            th(),
        ]),
        listToRender.display((x,u)=>rowComp(x,u))
    ])
}