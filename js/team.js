const TEAM_IMAGE_BASE = 'images/team/';
const MAIL_ICON = 'images/home/mail-logo.png';
const LINKEDIN_ICON = 'images/home/linkedin-logo.png';

const SUPABASE_URL = 'https://ltkyxgsgkwqowxikatub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_JRIwBltGZdjZZod9qnNPzw_p3RiR4B3';

const teamStatusEl = document.getElementById('team-status');
const execGrid = document.getElementById('exec-grid');
const pmGrid = document.getElementById('pm-grid');
const boardGrid = document.getElementById('board-grid');
const execEmptyEl = document.getElementById('exec-empty');
const pmEmptyEl = document.getElementById('pm-empty');
const boardEmptyEl = document.getElementById('board-empty');

function getSupabaseClient() {
    const lib = window.supabase;
    if (!lib || typeof lib.createClient !== 'function') {
        throw new Error('Supabase library did not load');
    }
    return lib.createClient(SUPABASE_URL, SUPABASE_KEY);
}

function slugFromName(name) {
    return String(name || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function localPortraitPath(member) {
    return `${TEAM_IMAGE_BASE}${slugFromName(member.name)}.webp`;
}

function resolvePortraitSrc(member) {
    const url = (member.image_url || '').trim();
    const local = localPortraitPath(member);

    if (!url) return local;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
        return url;
    }
    return url;
}

function setTeamStatus(message, isError) {
    if (!teamStatusEl) return;
    teamStatusEl.textContent = message;
    teamStatusEl.hidden = !message;
    teamStatusEl.classList.toggle('team-status--error', Boolean(isError));
}

function setSectionEmpty(emptyEl, isEmpty) {
    if (!emptyEl) return;
    emptyEl.hidden = !isEmpty;
}

function isProjectManager(member) {
    return (
        member.group === 'pm' ||
        /\bproject\s*manager\b/i.test(member.title || '')
    );
}

function observeTeamReveals() {
    const revealObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    document.querySelectorAll('.team-page .home-reveal:not(.is-visible)').forEach((el) => {
        revealObserver.observe(el);
    });
}

function initLeadershipPhotos(container) {
    if (!container) return;

    container.querySelectorAll('.team-leader-photo').forEach((photo) => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('is-active');
        });

        photo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                photo.classList.toggle('is-active');
            }
        });
    });
}

function createPortraitImg(member) {
    const img = document.createElement('img');
    img.className = 'team-portrait-img';
    img.alt = member.name;
    img.loading = 'lazy';
    img.decoding = 'async';

    const local = localPortraitPath(member);
    const primary = resolvePortraitSrc(member);
    let triedLocal = primary === local;

    img.src = primary;

    img.addEventListener('error', () => {
        if (!triedLocal) {
            triedLocal = true;
            img.src = local;
            return;
        }
        img.classList.add('team-portrait-img--missing');
        img.alt = `${member.name} (photo unavailable)`;
    });

    return img;
}

function createSocialLink(href, iconSrc, label) {
    if (!href) return null;

    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('aria-label', label);

    if (href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }

    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.alt = '';
    icon.className = 'team-leader-photo__icon';
    icon.loading = 'lazy';
    icon.width = 24;
    icon.height = 24;
    link.appendChild(icon);

    return link;
}

function createLeadershipCard(member) {
    const card = document.createElement('article');
    card.className = 'team-card team-card--leadership';

    const photo = document.createElement('div');
    photo.className = 'team-leader-photo';
    photo.setAttribute('role', 'button');
    photo.setAttribute('tabindex', '0');
    photo.setAttribute('aria-label', `View details for ${member.name}`);

    const overlay = document.createElement('div');
    overlay.className = 'team-leader-photo__overlay';

    const yearMajor = document.createElement('p');
    yearMajor.className = 'team-leader-photo__detail';
    yearMajor.append(
        `Year: ${member.year || '—'}`,
        document.createElement('br'),
        `Major: ${member.major || '—'}`
    );

    const hobbies = document.createElement('p');
    hobbies.className = 'team-leader-photo__detail';
    hobbies.textContent = `Hobbies: ${member.hobbies || '—'}`;

    const socials = document.createElement('div');
    socials.className = 'team-leader-photo__socials';

    const emailLink = createSocialLink(
        member.email ? `mailto:${member.email}` : '',
        MAIL_ICON,
        `Email ${member.name}`
    );
    const linkedinLink = createSocialLink(
        member.linkedin,
        LINKEDIN_ICON,
        `${member.name} on LinkedIn`
    );

    if (emailLink) socials.appendChild(emailLink);
    if (linkedinLink) socials.appendChild(linkedinLink);

    overlay.appendChild(yearMajor);
    overlay.appendChild(hobbies);
    overlay.appendChild(socials);

    photo.appendChild(createPortraitImg(member));
    photo.appendChild(overlay);

    const name = document.createElement('h3');
    name.className = 'team-card__name';
    name.textContent = member.name;

    const title = document.createElement('p');
    title.className = 'team-card__title';
    title.textContent = member.title;

    card.appendChild(photo);
    card.appendChild(name);
    card.appendChild(title);

    return card;
}

function renderGroup(members, grid, emptyEl, createCard) {
    if (!grid) return;

    grid.replaceChildren();

    if (!members.length) {
        setSectionEmpty(emptyEl, true);
        return;
    }

    setSectionEmpty(emptyEl, false);
    members.forEach((member) => {
        grid.appendChild(createCard(member));
    });
}

async function loadTeam() {
    setTeamStatus('Loading team…', false);

    try {
        if (!execGrid || !pmGrid || !boardGrid) {
            throw new Error('Team page grids not found');
        }

        const teamClient = getSupabaseClient();

        const { data, error } = await teamClient
            .from('members')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('name', { ascending: true });

        if (error) {
            throw error;
        }

        const rows = data || [];
        const execMembers = [];
        const pmMembers = [];
        const boardMembers = [];

        rows.forEach((member) => {
            if (member.group === 'exec') {
                execMembers.push(member);
            } else if (isProjectManager(member)) {
                pmMembers.push(member);
            } else if (member.group === 'board') {
                boardMembers.push(member);
            }
        });

        renderGroup(execMembers, execGrid, execEmptyEl, createLeadershipCard);
        renderGroup(pmMembers, pmGrid, pmEmptyEl, createLeadershipCard);
        renderGroup(boardMembers, boardGrid, boardEmptyEl, createLeadershipCard);

        initLeadershipPhotos(execGrid);
        initLeadershipPhotos(pmGrid);
        initLeadershipPhotos(boardGrid);
        observeTeamReveals();

        setTeamStatus('', false);
    } catch (err) {
        console.error('Team load failed:', err);
        setTeamStatus('Unable to load team roster. Please try again later.', true);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTeam);
} else {
    loadTeam();
}
