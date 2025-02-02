export function SwiperGroup() {

    const swiper1 = new Swiper(".mainSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".main-page .swiper-option .swiper-navigation .swiper-button-next",
            prevEl: ".main-page .swiper-option .swiper-navigation .swiper-button-prev",
        },
    });

    const swiper2 = new Swiper(".mainBotSwiper", {
        slidesPerView: 7,
        spaceBetween: 30,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 5,
            },
            1300: {
                slidesPerView: 7,
            }
        }
    });

    const swiper3 = new Swiper(".anotherSwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".another-series .swiper-option .swiper-navigation .swiper-button-next",
            prevEl: ".another-series .swiper-option .swiper-navigation .swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1500: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1920: {
                slidesPerView: 5,
            },
        },
    });

    const swiper4 = new Swiper('.trending-swiper', {
        slidesPerView: 2.5,
        spaceBetween: 30,
        breakpoints: {
            320: {
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
            1500: {
                slidesPerView: 2.5,
                spaceBetween: 30,
            },
        },
    });

    const swiper5 = new Swiper('.seriesSwiper', {
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        navigation: {
            nextEl: ".another-series .swiper-option .swiper-navigation .swiper-button-next",
            prevEl: ".another-series .swiper-option .swiper-navigation .swiper-button-prev",
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1500: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            2040: {
                slidesPerView: 7,
            },
        },
    });
}