const staticParallaxBackground = (imgUrl,blur,comp)=>{
    var style = new CssBlock('#background-img',{
        'background-image' : `url('${imgUrl}')`,
        'filter' : `blur(${blur || '0px'})`,
        'background-attachment':'fixed',
        'background-repeat':'no-repeat',
        'background-size':'cover',
        'height':'100vh',
    });
    return [
        div({id:'background-img'},[comp]),
        style.toElementWrapper(),
    ]
}