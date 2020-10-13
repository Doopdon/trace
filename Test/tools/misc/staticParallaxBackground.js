const staticParallaxBackground = (imgUrl,blur,comp)=>{
    var style = new CssSheet([
        new CssBlock('#background-img',{
            'background-image' : `url('${imgUrl}')`,
            'filter' : `blur(${blur || '0px'})`,
            'background-attachment':'fixed',
            'background-repeat':'no-repeat',
            'background-size':'cover',
            'height':'100vh',
        }),
        new CssBlock('#content',{
            'filter':'blur(0px)'
        })
    ])
    return [
        div({id:'background-img'},comp),
        style.toElementWrapper(),
    ]
}