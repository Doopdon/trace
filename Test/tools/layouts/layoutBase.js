const layoutBase = (params,)=>{
    var style = new CssBlock('#background-img');
    style.content = {
        'background-image' : `url('${params.imgUrl}')`,
        'filter' : `blur(${params.blur})`,
        'background-attachment':'fixed',
        'background-repeat':'no-repeat',
        'background-size':'cover',
        'height':'500px',
    }
    return [
        div({id:'background-img'},layoutComp),
        style.toElementWrapper(),
    ]
}