trace(window)


let t = new RenderList([1,2,3,4,5])


// div(
// {},
// [
//     t.display((x,y)=>div([
//         textarea({onchange:x=>y.set(x)},x),
//         h5(x)
//     ]))
// ]
var val = 'asdf';
div(
    textarea(val),
    h3(val)
).insertInto(document.getElementById('root'))

// var prop = new RenderProp({a:0})
// var attr = prop.atr(classTest)
// var num = 5;
// var list =  new RenderList([{a:1},{a:2},{a:3},{a:4}])
// div([
//     prop.display(x=>h1({class:'red-text'},x.a)),
//     list.display(x=>h6(x.a)),
//     list.display(x=>h3(x.a)),
//     button({onclick:()=>list.push({a:num++})},'push'),
//     button({onclick:()=>list.prepend({a:num++})},'prepend'),
//     button({onclick:()=>prop.set(list.shift())},'shift'),
//     button({onclick:()=>prop.set(list.shift())},'pop'),
//     button({onclick:()=>list.delete()},'delete'),
// ]).insertInto(document.getElementById('root'))

// function classTest(x){
//     return ['red-text','green-text','blue-text'][x%3]
// }
// function classTest2(x){
//     return ['red','green','blue'][x%3]
// }
