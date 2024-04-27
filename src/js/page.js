function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

function include(element, source, substitutions) {
    fetch(`/src/html/${source}`)
        .then(response => response.text())
        .then(data => {
            let temp = data;
            if (substitutions) {
                for (const key in substitutions) {
                    temp = temp.replace(`{{${key}}}`, substitutions[key]);
                }
            }
            element.innerHTML = temp;
        })
        .catch(error => console.error(error));
}

let html = document.getElementsByTagName('html')[0];
html.lang = 'en';
html.dir = 'ltr';
include(html, 'template.html');
let script = document.createElement('script');
script.src = `/src/js/page/${html.id}`;
script.defer = true;
document.head.appendChild(script);

window.addEventListener('load', function () {
    let body = document.body;

    let container = document.createElement('div');
    container.id = 'container';
    body.appendChild(container);

    let header = document.getElementsByTagName('header')[0] || (() => {
        let header = document.createElement('header');
        container.appendChild(header);
        return header;
    })()
    include(header, 'nav.html');

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

    let page = {
        content: content
    };
    Page(page);
    document.title = page.title || "cornellev.github.io";

}, false)