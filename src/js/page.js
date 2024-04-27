function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

async function include(element, source, substitutions) {
    try {
        let response = await fetch(`/src/html/${source}`);
        let data = await response.text();
        let temp = data;
        if (substitutions) {
            for (const key in substitutions) {
                temp = temp.replace(`{{${key}}}`, substitutions[key]);
            }
        }
        element.innerHTML = temp;
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('load', async function () {
    let html = document.getElementsByTagName('html')[0];
    html.lang = 'en';
    html.dir = 'ltr';
    await include(html, 'template.html');

    let body = document.getElementsByTagName('body')[0];

    let container = document.createElement('div');
    container.id = 'container';
    body.appendChild(container);

    let header = document.getElementsByTagName('header')[0] || (() => {
        let header = document.createElement('header');
        container.appendChild(header);
        return header;
    })()
    await include(header, 'nav.html');

    let content = document.createElement('div');
    content.id = 'content';
    container.appendChild(content);

    let footer = document.getElementsByTagName('footer')[0] || (() => {
        let footer = document.createElement('footer');
        container.appendChild(footer);
        return footer;
    })();

    let currentYear = (new Date()).getFullYear();
    let copyright = document.createElement('p');
    copyright.id = 'copyright';
    copyright.textContent = `Copyright (C) ${currentYear} CEV Autonomy. All rights reserved.`;
    footer.appendChild(copyright);

    let script = document.createElement('script');
    script.src = `/src/js/page/${html.id}.min.js`;
    script.onload = async function () {
        let page = {
            content: content
        };
        await Page(page);
        document.title = page.title || "cornellev.github.io";
    };
    document.head.appendChild(script);
}, false)
