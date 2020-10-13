var page = new RenderProp('home')
var pages = {
    home:homePageComp,
    info:infoPageComp
}
div(
    page.display(x=>pages[x])
).render(document.getElementById('root'))