// ========================================
// Scroll Animation Observer
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animateElements = document.querySelectorAll(`
        .empathy-card,
        .feature-item,
        .benefit-card,
        .lifestyle-card,
        .message-content,
        .testimonial-card
    `);

    // Add scroll-fade-in class and observe
    animateElements.forEach(element => {
        element.classList.add('scroll-fade-in');
        observer.observe(element);
    });

    // ========================================
    // Smooth Scroll for CTA buttons
    // ========================================

    const ctaButtons = document.querySelectorAll('a[href^="#"]');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Parallax Effect for Hero Section
    // ========================================

    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // Add stagger animation to cards
    // ========================================

    const cardGroups = [
        document.querySelectorAll('.empathy-card'),
        document.querySelectorAll('.benefit-card'),
        document.querySelectorAll('.lifestyle-card')
    ];

    cardGroups.forEach(cards => {
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // ========================================
    // Feature number animation
    // ========================================

    const featureNumbers = document.querySelectorAll('.feature-number');

    featureNumbers.forEach(number => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });

        observer.observe(number);
    });

    // ========================================
    // Add CSS animation keyframes dynamically
    // ========================================

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Scroll progress indicator (optional)
    // ========================================

    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;

            if (scrolled > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // ========================================
    // Image lazy loading enhancement
    // ========================================

    const images = document.querySelectorAll('img[src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // 画像が既に読み込まれている場合は即座に表示
                if (img.complete && img.naturalWidth > 0) {
                    img.style.opacity = '1';
                    observer.unobserve(img);
                } else {
                    // 読み込み中の場合のみフェードイン効果を適用
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';

                    img.onload = function () {
                        img.style.opacity = '1';
                    };

                    observer.unobserve(img);
                }
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ========================================
    // CTA button hover effect enhancement
    // ========================================

    const ctaButtonsAll = document.querySelectorAll('.cta-button, .cta-button-large');

    ctaButtonsAll.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // Video Player Control
    // ========================================

    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('video');

        if (video) {
            // コンテナクリックで再生/一時停止を切り替え
            container.addEventListener('click', function () {
                if (video.paused) {
                    // 他の動画が再生中なら停止する（オプション）
                    document.querySelectorAll('video').forEach(v => {
                        if (v !== video && !v.paused) {
                            v.pause();
                        }
                    });
                    video.play();
                } else {
                    video.pause();
                }
            });

            // 再生開始時
            video.addEventListener('play', function () {
                container.classList.add('playing');
            });

            // 一時停止時
            video.addEventListener('pause', function () {
                container.classList.remove('playing');
            });

            // 再生終了時
            video.addEventListener('ended', function () {
                container.classList.remove('playing');
            });
        }
    });

    // ========================================
    // Picture Book Page Flipper
    // ========================================

    const bookContainer = document.getElementById('book-flipper');
    if (bookContainer) {
        const pages = bookContainer.querySelectorAll('.book-page');
        const dots = document.querySelectorAll('.book-pagination .dot');
        let currentPage = 0;

        bookContainer.addEventListener('click', (e) => {
            e.preventDefault();
            if (pages.length === 0) return;

            // 現在のページを非アクティブにする
            pages[currentPage].classList.remove('active');
            if (dots[currentPage]) dots[currentPage].classList.remove('active');

            // 次のページへ
            currentPage = (currentPage + 1) % pages.length;

            // 次のページをアクティブにする
            pages[currentPage].classList.add('active');
            if (dots[currentPage]) dots[currentPage].classList.add('active');

            // めくり効果の演出（少し揺らす）
            bookContainer.style.transform = 'scale(0.98)';
            setTimeout(() => {
                bookContainer.style.transform = 'scale(1)';
            }, 100);
        });
    }

    // ========================================
    // Floating CTA Visibility
    // ========================================

    const floatingCta = document.querySelector('.floating-cta');
    const heroSectionForCta = document.querySelector('.hero-section');
    const ctaSection = document.getElementById('cta');

    if (floatingCta && heroSectionForCta) {
        window.addEventListener('scroll', () => {
            const heroHeight = heroSectionForCta.offsetHeight;
            const scrollPos = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const bodyHeight = document.body.offsetHeight;

            // ヒーローセクションを過ぎたら表示、フッター前のCTAセクションに到達したら非表示
            const isPastHero = scrollPos > heroHeight - 100;
            let isNearBottomCta = false;

            if (ctaSection) {
                const ctaTop = ctaSection.offsetTop;
                isNearBottomCta = scrollPos + windowHeight > ctaTop + 100;
            }

            if (isPastHero && !isNearBottomCta) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

    console.log('🎉 Landing page initialized successfully!');
});


