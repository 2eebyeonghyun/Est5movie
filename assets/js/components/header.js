export function header() {
    
    let lastScrollTop = 0;
    const menuWrapper = get('.header');
    
    window.addEventListener("scroll", function () {
        let e = window.pageYOffset || document.documentElement.scrollTop;
        e > lastScrollTop && e > 100 ? (menuWrapper.style.transform = "translateY(-100%)") : (menuWrapper.style.transform = "translateY(0)"), (lastScrollTop = e <= 0 ? 0 : e);
    }, { passive: !0 }),
    
    window.addEventListener("mousemove", function (e) {
        e.clientY <= 100 && (menuWrapper.style.transform = "translateY(0)");
    }, { passive: !0 });
}
