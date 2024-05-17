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

const bg = 'api/imgs/FloorPaper.jpg';
const api = 'api/v1';
const debug = true;

const background = newEle('div', document.body, {
    id: 'bg'
});
const main = newEle('div', document.body, {
    id: 'main'
});
const messagesHolder = newEle('div', main, {
    id: 'messagesHolder'
});

const chatfunc = (name,content) => {
    newEle('span', messagesHolder, {
        class: 'message',
        innerText: `[${name}]: ${content}`
    });
}
const chatRequest = (content) => {
}

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
    zIndex: '-1'
});
modifyStyle(main, {
    width: '95%',
    height: '95%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,.5)',
    backdropFilter: 'blur(5px)',
    borderRadius: '15px',
    margin: 'auto',
    color: '#fff',
});
modifyStyle(messagesHolder, {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: '1rem',
    textAlign: 'left',
    fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
    fontFamily: 'Consolas',
    fontWeight: 'bold',
    scrollbarColor: '#aa2500 #000',
    scrollbarWidth: 'auto',
});
// let Username = null;
// let promptMsg = 'Enter username:';
// const AcceptedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
// while (Username == null || Username == '' || !Username.split('').every(char => AcceptedChars.includes(char))) {
//     Username = prompt(promptMsg).trim();
//     promptMsg = 'Usernames can only contain A-Z,a-z,1-9 and underscores.\nEnter username:';
// }
let Username = 'Placeholder'

async function getMessages() {
    // return await fetch(`${api}/Messages.json`).then(response => {
    //     if (response.ok) {
    //         return response.json();
    //     } else {
    //         alert(`Failed to load messages. Server responded with HTTP ${response.status};\n${response.statusText}`);
    //         location.reload();
    //     }
    // });
    const response = await fetch(`${api}/Messages.json`);
    if (!response.ok) {
        alert(`Failed to load messages. Server responded with HTTP ${response.status};\n${response.statusText}`);
        location.reload();
    }
    return response.json();
}
(async () => {
    const messages = await getMessages();
    print(messages); /* prints arr */
    messages.forEach(message => { /* typerror, I'm going insane */
        chatfunc(message.Author, message.Content);
    });
    chatfunc('System', `Welcome, ${Username}!`);
})();