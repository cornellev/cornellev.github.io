async function Page(page) {
    page.title = 'CEV Autonomy';
    await include(page.content, 'home.html');
}
