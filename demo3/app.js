//var t = new ElementWrapperList();
//t.childWrappers = [h1('working'),h1('omg')];
var d = new RenderProp('red')
var fn = ()=>alert('asdf')
d.onChange(fn)
d.onChange(()=>alert('dddd'))
d.removeOnChange(fn);
var list = new RenderList([2,4,3,1])
div([
    h1({}).onRender(()=>{}),
    h1({innerHTML:d.atr()},[]),
    h1({class:d.atr(),onclick:()=>d.set('blue')},'colorTest'),
    list.display((x,r)=>h4({onclick:()=>r.delete()},x)),
    list.display(x=>h3(x)),
]).render(document.getElementById('root'))
list.insertAt(0,1);
list.insertAt(0,2);
list.deleteAt(1)
list.move(1,3)
list.sort()

// div([
//     // d.display(x=>h1(x)),
//     // d.display(x=>h2(x)),
    
// ]).render(document.getElementById('root'))
// d.set('ddd')

// div([
//     h1('asdf'),
//     h1('adsf'),
//     [
//         h3('ugh'),
//         div([
//             h4('asdf'),
//             h4('asdfdfdf'),
//         ]),
//         d.display(x=>h1(x)),
//         d.display(x=>h2(x)),
//         //(new ElementWrapperList()).childWrappers = [h1('working'),h1('omg')]

//     ],
//     h1('sdfasf'),
// ]).render(document.getElementById('root'))
// d.set('ddd')