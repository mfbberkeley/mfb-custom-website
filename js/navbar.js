/**
 * MFB Navbar component — loads navbar.html and handles mobile menu.
 */
(function () {
    const NAVBAR_URL = new URL('navbar.html', window.location.href).href;

    function toggleMobileMenu(toggle) {
        const isOpen = toggle.classList.toggle('open');
        const panel = document.getElementById('mobile-nav-panel');
        const backdrop = document.querySelector('.mobile-nav-backdrop');

        document.body.classList.toggle('nav-open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

        if (panel) {
            panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        }
        if (backdrop) {
            backdrop.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        }
    }

    function closeMobileMenu() {
        const toggle = document.getElementById('hamburger-icon');
        if (!toggle || !toggle.classList.contains('open')) return;

        toggle.classList.remove('open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');

        const panel = document.getElementById('mobile-nav-panel');
        const backdrop = document.querySelector('.mobile-nav-backdrop');
        if (panel) panel.setAttribute('aria-hidden', 'true');
        if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
    }

    function setActiveNavLink() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('[data-nav]').forEach((link) => {
            const isActive = link.getAttribute('data-nav') === page;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function initMobileNav() {
        const toggle = document.getElementById('hamburger-icon');
        const panel = document.getElementById('mobile-nav-panel');
        const backdrop = document.querySelector('.mobile-nav-backdrop');

        if (!toggle || toggle.dataset.navInit === 'true') return;
        toggle.dataset.navInit = 'true';

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMobileMenu(toggle);
        });

        if (backdrop) {
            backdrop.addEventListener('click', closeMobileMenu);
        }

        if (panel) {
            panel.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', closeMobileMenu);
            });
        }

        document.addEventListener('click', (event) => {
            if (!document.body.classList.contains('nav-open')) return;
            const mobileWrap = document.querySelector('.navbar__mobile');
            if (mobileWrap && !mobileWrap.contains(event.target)) {
                closeMobileMenu();
            }
        });

        toggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMobileMenu(toggle);
            }
        });
    }

    async function loadNavbar() {
        const container = document.getElementById('navbar');
        if (!container || container.dataset.navbarLoaded === 'true') return;

        try {
            const response = await fetch(NAVBAR_URL);
            if (!response.ok) throw new Error(`Navbar fetch failed: ${response.status}`);
            container.innerHTML = await response.text();
            container.dataset.navbarLoaded = 'true';
            setActiveNavLink();
            initMobileNav();
        } catch (error) {
            console.error('Failed to load navbar:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadNavbar();

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMobileMenu();
        });
    });

    window.toggleMobileMenu = toggleMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
    window.initMobileNav = initMobileNav;
    window.loadNavbar = loadNavbar;
})();
