async function Page(page) {
    page.title = 'CEV Autonomy';
    await include(page.content, '404.html');
}
