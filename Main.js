const print = console.log;
const newEle = (typ,par,props) => {
    par = par || document.body;
    let ele = document.createElement(typ);
    par.appendChild(ele);
    for (let prop in props) {
        ele[prop] = props[prop];
    }
    return ele;
}
const modifyStyle = (ele, style) => {
    for (let prop in style) {
        ele.style[prop] = style[prop];
    }
}

const bg = 'api/imgs/FloorPaper.jpg'

const background = newEle('div', document.body, {
    id: 'bg'
})
const main = newEle('div', document.body, {
    id: 'main'
})

modifyStyle(document.body, {
    backgroundColor: '#000',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column'
});
modifyStyle(background, {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    // filter: 'blur(1px)'
});
modifyStyle(main, {
    width: '95%',
    height: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,.5)',
    filter: 'blur(5px)',
    margin: 'auto',
    backdropFilter: 'blur(2.5px)'
});