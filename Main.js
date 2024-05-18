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

let isBusy = false;
async function alert(title,content) {
    isBusy = true;
    const alertHolder = newEle('div', document.body, {
        id: 'alertHolder'
    });
    const title_ele = newEle('h1', alertHolder, {
        id: 'alertTitle',
        innerText: title
    });
    const content_ele = newEle('p', alertHolder, {
        id: 'alertContent',
        innerText: content
    });
    const close = newEle('button', alertHolder, {
        id: 'alertClose',
        innerText: 'Close'
    });
    modifyStyle(alertHolder, {
        width: '85%',
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '100',
        backgroundColor: 'rgba(0,0,0,0)',
        backdropFilter: 'blur(5px)',
        borderRadius: '15px',
        color: '#fff',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: '.5s'
    });
    modifyStyle(title_ele, {
        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        userSelect: 'none',
        color: 'rgba(255,255,255,0)',
        transition: '.5s'
    });
    modifyStyle(content_ele, {
        fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        position: 'absolute',
        top: '10%',
        color: 'rgba(255,255,255,0)',
        transition: '.5s'
    });
    modifyStyle(close, {
        position: 'absolute',
        top: '100%',
        fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        transform: 'translateY(-100%)',
        width: '100%',
        height: '5%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: 'rgba(255,255,255,0)',
        transition: '.5s'
    });
    close.addEventListener('mouseover', () => {
        modifyStyle(close, {
            color: '#fff'
        });
    });
    close.addEventListener('mouseout', () => {
        modifyStyle(close, {
            color: '#ffaa00'
        });
    });
    close.focus();
    setTimeout(() => { /* ensure that it has loaded in before animating */
        modifyStyle(alertHolder, {
            backgroundColor: 'rgba(0,0,0,.25)'
        });
        modifyStyle(title_ele, {
            color: '#fff'
        });
        modifyStyle(content_ele, {
            color: '#fff'
        });
        modifyStyle(close, {
            color: '#ffaa00',
            backgroundColor: 'rgba(0, 0, 0, .5)'
        });
    }, 1);
    close.addEventListener('click', () => {
        modifyStyle(alertHolder, {
            transform: 'translate(-50%, -50%) scale(0)'
        });
        isBusy = false;
        setTimeout(() => {
            alertHolder.remove();
        }, 500);
    });
    while (isBusy) {
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    return true;
}
async function prompt(title,content,placeholder='Text..') {
    isBusy = true;
    const promptHolder = newEle('div', document.body, {
        id: 'promptHolder'
    });
    const title_ele = newEle('h1', promptHolder, {
        id: 'promptTitle',
        innerText: title
    });
    const content_ele = newEle('p', promptHolder, {
        id: 'promptContent',
        innerText: content
    });
    const input = newEle('input', promptHolder, {
        id: 'promptInput'
    });
    const submit = newEle('button', promptHolder, {
        id: 'promptSubmit',
        innerText: 'Submit'
    });
    modifyStyle(promptHolder, {
        width: '85%',
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '100',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(5px)',
        borderRadius: '15px',
        color: '#fff',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: '.5s'
    });
    modifyStyle(title_ele, {
        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        userSelect: 'none',
        color: 'rgba(255, 255, 255, 0)',
        transition: '.5s'
    });
    modifyStyle(content_ele, {
        fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        position: 'absolute',
        top: '10%',
        color: 'rgba(255, 255, 255, 0)',
        transition: '.5s'
    });
    modifyStyle(input, {
        position: 'absolute',
        top: '100%',
        left: '0%',
        fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        width: '75%',
        height: '5%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        borderRadius: '12px',
        transform: 'translateY(-100%)',
        color: 'rgba(255, 255, 255, 0)',
        transition: '.5s'
    });
    modifyStyle(submit, {
        position: 'absolute',
        top: '100%',
        left: '100%',
        fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
        fontFamily: 'Consolas',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        transform: 'translateY(-100%)',
        width: '25%',
        height: '5%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        borderRadius: '12px',
        transform: 'translate(-100%,-100%)',
        color: 'rgba(255, 255, 255, 0)',
        transition: '.5s'
    });
    submit.addEventListener('mouseover', () => {
        modifyStyle(submit, {
            color: '#fff'
        });
    });
    submit.addEventListener('mouseout', () => {
        modifyStyle(submit, {
            color: '#ffaa00'
        });
    });
    input.autocomplete = 'off';
    let val;
    const finish = () => {
        modifyStyle(promptHolder, {
            transform: 'translate(-50%, -50%) scale(0)'
        });
        isBusy = false;
        setTimeout(() => {
            promptHolder.remove();
        }, 500);
        val = input.value;
    }
    input.addEventListener('keyup', e => {
        if (e.key == 'Enter') {
            finish();
        }
    });
    submit.addEventListener('click', () => {
        finish();
    });
    submit.addEventListener('keydown', e => { /* this is just so you can navigate via only keyboard */
        if (e.key == 'Enter') {
            finish();
        }
    });
    input.focus();
    input.placeholder = placeholder;
    setTimeout(() => { /* ensure that it has loaded in before animating */
        modifyStyle(promptHolder, {
            backgroundColor: 'rgba(0, 0, 0, .5)'
        });
        modifyStyle(title_ele, {
            color: '#fff'
        });
        modifyStyle(content_ele, {
            color: '#fff'
        });
        modifyStyle(input, {
            color: '#ffaa00',
            backgroundColor: 'rgba(0, 0, 0, .5)'
        });
        modifyStyle(submit, {
            color: '#ffaa00',
            backgroundColor: 'rgba(0, 0, 0, .5)'
        });
    }, 1);
    while (isBusy) {
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    return val || null;
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
let Username = null;
let ready = false;
const AcceptedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
setTimeout(() => {
    (async () => {
        Username = await prompt('Username', 'Enter your preferred username.');
        let didWork = true;
        if (Username == null || Username == '') {await alert('Invalid username','Your username cannot be empty.'); location.reload(); didWork=false;}
        if (Username.length > 20) {await alert('Invalid username', 'Your username cannot be longer than 20 characters.'); location.reload(); didWork=false;}
        for (let i = 0; i < Username.length; i++) {
            if (!AcceptedChars.includes(Username[i])) {
                await alert('Invalid username', 'Your username can only contain letters, numbers, and underscores.');
                location.reload();
                didWork = false;
            }
        }
        ready = didWork;
    })();
}, 1000);
// const Username = 'placeholder';
(async () => { /* horrible implementation 💀👍 */
    while (!ready) {
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    fetch(`${api}/Messages.json`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            (async () => {
                await alert('Failed to load messages.',`Server responded with HTTP ${response.status} ${response.statusText}`);
                location.reload();
            })
        }
    }).then(data => {
        data.Messages.forEach(message => {
            chatfunc(message.Author, message.Content);
        });
        chatfunc('System', `Welcome, ${Username}!`);
        document.body.addEventListener('keyup', e => {
            if (e.key == '/' && !isBusy) {
                (async () => {
                    const msg = await prompt('Message','Enter message');
                    if (msg == null || msg == '') {
                        console.warn('Message was null or empty.');
                        return
                    }
                    chatfunc(Username, msg);
                    chatRequest(msg);
                })();
            }
        });
    });
})();