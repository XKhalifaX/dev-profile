document.addEventListener("DOMContentLoaded", () => {
    const bentoCards = document.querySelectorAll(".bento-card");
    bentoCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((mouseX - centerX) / centerX) * 1.0;
            const rotateX = -((mouseY - centerY) / centerY) * 1.0;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        });
    });

    const carouselImage = document.getElementById("carousel-image");
    const carouselPrev = document.getElementById("carousel-prev");
    const carouselNext = document.getElementById("carousel-next");
    const maskCard = document.querySelector(".mask-card");
    const heroCard = document.querySelector(".hero-card");
    const liveProjectCard = document.querySelector(".live-project-card");
    const stackCard = document.querySelector(".stack-card");
    const maskInner = document.querySelector(".mask-inner");
    const maskFront = document.querySelector(".mask-front");
    const maskBack = document.querySelector(".mask-back");
    const heroTagline = document.querySelector("#hero .tagline");
    const copyLinks = document.querySelectorAll("[data-copy-text]");

    const copyTextToClipboard = async (value) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
            return;
        }

        const tempInput = document.createElement("textarea");
        tempInput.value = value;
        tempInput.setAttribute("readonly", "");
        tempInput.style.position = "fixed";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    };

    copyLinks.forEach((link) => {
        link.addEventListener("click", async (event) => {
            const textToCopy = link.getAttribute("data-copy-text");
            const copyOnly = link.getAttribute("data-copy-only") === "true";

            if (copyOnly) {
                event.preventDefault();
            }

            if (!textToCopy) {
                return;
            }

            try {
                await copyTextToClipboard(textToCopy);
                const label = link.querySelector("span:last-child");
                if (label) {
                    const originalText = label.textContent;
                    label.textContent = "Copied";
                    setTimeout(() => {
                        label.textContent = originalText;
                    }, 1200);
                }
            } catch (_error) {
            }
        });
    });

    const syncMaskHeight = () => {
        if (!maskInner || !maskFront || !maskBack) {
            return;
        }

        const frontHeight = maskFront.scrollHeight;
        const backHeight = maskBack.scrollHeight;
        maskInner.style.height = `${Math.max(frontHeight, backHeight)}px`;
    };

    const syncHeroMaskHeights = () => {
        if (!heroCard || !maskCard) {
            return;
        }

        heroCard.style.minHeight = "auto";
        maskCard.style.minHeight = "auto";

        const maxHeight = Math.max(heroCard.offsetHeight, maskCard.offsetHeight);
        heroCard.style.minHeight = `${maxHeight}px`;
        maskCard.style.minHeight = `${maxHeight}px`;
    };

    const syncLiveAboutHeights = () => {
        if (!liveProjectCard || !stackCard) {
            return;
        }

        liveProjectCard.style.minHeight = "auto";
        stackCard.style.minHeight = "auto";

        const maxHeight = Math.max(liveProjectCard.offsetHeight, stackCard.offsetHeight);
        liveProjectCard.style.minHeight = `${maxHeight}px`;
        stackCard.style.minHeight = `${maxHeight}px`;
    };

    syncMaskHeight();
    syncHeroMaskHeights();
    syncLiveAboutHeights();
    window.addEventListener("resize", () => {
        syncMaskHeight();
        syncHeroMaskHeights();
        syncLiveAboutHeights();
    });

    if (carouselImage && carouselPrev && carouselNext) {
        const carouselSlides = [
            {
                src: "images/project-website-1.jpg",
                alt: "Website UI snapshot"
            },
            {
                src: "images/project-website-2.jpg",
                alt: "Website feature screen"
            }
        ];

        let carouselIndex = 0;

        const updateCarousel = () => {
            const currentSlide = carouselSlides[carouselIndex];
            carouselImage.src = currentSlide.src;
            carouselImage.alt = currentSlide.alt;
        };

        carouselPrev.addEventListener("click", () => {
            carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
            updateCarousel();
        });

        carouselNext.addEventListener("click", () => {
            carouselIndex = (carouselIndex + 1) % carouselSlides.length;
            updateCarousel();
        });
    }

    if (maskCard) {
        setInterval(() => {
            maskCard.classList.toggle("flipped");
            syncHeroMaskHeights();
            syncLiveAboutHeights();
        }, 5000);
    }

    if (heroTagline) {
        const roles = ["Software Dev", "Hello Moath Samman", "Game Development Hobbyist"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let pauseTicks = 0;

        heroTagline.textContent = "";

        setInterval(() => {
            const currentRole = roles[roleIndex];

            if (pauseTicks > 0) {
                pauseTicks -= 1;
                return;
            }

            if (!isDeleting) {
                charIndex += 1;
                heroTagline.textContent = currentRole.slice(0, charIndex);

                if (charIndex === currentRole.length) {
                    pauseTicks = 10;
                    isDeleting = true;
                }
            } else {
                charIndex -= 1;
                heroTagline.textContent = currentRole.slice(0, Math.max(charIndex, 0));

                if (charIndex <= 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    pauseTicks = 3;
                }
            }
        }, 80);
    }
});
