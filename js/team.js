const TEAM_IMAGE_BASE = 'images/team/';
const MAIL_ICON = 'images/home/mail-logo.png';
const LINKEDIN_ICON = 'images/home/linkedin-logo.png';
const CALENDLY_ICON = 'images/home/calendly-logo.svg';

/*
 * Roster data — edit this list manually to update the team page.
 * Fields: name, title, year, major, hobbies, linkedin, calendly, email (optional), image (optional override).
 * Photos load automatically from images/team/<name-slug>.webp; new members without a
 * photo show a blank placeholder until one is added. Use `image` to point at a
 * specific file when the slug does not match.
 */
const TEAM_MEMBERS = {
    exec: [
        {
            name: 'Alizeh Ali',
            title: 'President',
            year: 'Junior',
            major: 'Business Admin',
            hobbies: 'Dance Moms, Coffee, Crime Shows, Fantasy/Dystopian Books, Musicals',
            linkedin: 'www.linkedin.com/in/alizeha',
            calendly: 'https://calendly.com/alizehali-berkeley/30min',
        },
        {
            name: 'Micah Shin',
            title: 'President',
            year: 'Junior',
            major: 'Business Administration (GMP)',
            hobbies: 'Lacrosse, Flute, Piccolo, Egyptology, Squash',
            linkedin: 'https://www.linkedin.com/in/micahshin',
            calendly: 'https://calendly.com/micahshin-berkeley/30min',
        },
        {
            name: 'Nathan Nyaung',
            title: 'VP Internal',
            year: 'Junior',
            major: 'Economics & Data Science',
            hobbies: 'Photography, Cooking, Hiking, Poker, Sports Betting, Running',
            linkedin: 'https://www.linkedin.com/in/nathan-nyaung-91161327b/',
            calendly: 'https://calendly.com/nathannyaung-berkeley/30min',
        },
        {
            name: 'Elliot Jang',
            title: 'VP Marketing',
            year: 'Junior',
            major: 'Business Admin, Econ',
            hobbies: 'Basketball, UFC, Taekwondo, Piano, Clash Royale',
            linkedin: 'www.linkedin.com/in/elliotjang',
            calendly: 'https://calendly.com/elliotjang-berkeley/30min',
        },
        {
            name: 'Nidhish Tekkam',
            title: 'VP Finance & Operations',
            year: 'Sophomore',
            major: 'Business Administration & Data Science',
            hobbies: 'Backpacking, Hosting, Non-Fiction Reading, Late-Night Workouts, Billiards, Options Trading, Sports Betting',
            linkedin: 'www.linkedin.com/in/nidhish-tekkam',
            calendly: 'https://calendly.com/nidhish-tekkam-berkeley/mfb-coffee-chat',
        },
        {
            name: 'Willie Kang',
            title: 'VP Microfinance',
            year: 'Senior',
            major: 'Analytics',
            hobbies: 'Dance, Reading, Poker, NBA, Skiing',
            linkedin: 'https://www.linkedin.com/in/williekang',
            calendly: 'https://calendly.com/williek-berkeley/30min',
        },
    ],
    pm: [
        {
            name: 'Kellen Chang',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Econ',
            hobbies: 'Brawl Stars, Anime, Basketball, Singles Inferno, Poker',
            linkedin: 'www.linkedin.com/in/kellen-chang',
            calendly: 'https://calendly.com/kellen76-berkeley',
        },
        {
            name: 'Nicole Wang',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Data Science, Economics',
            hobbies: 'Video Editing, Dancing, Hiking, Matcha/Coffee/Boba, Crochet, Painting, Photography, Nails',
            linkedin: 'https://www.linkedin.com/in/nicoleswang/',
            calendly: 'https://calendly.com/nicoleswang-berkeley/30min',
        },
        {
            name: 'Susie Gu',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Business Administration, Data Science',
            hobbies: 'Reading, Writing, Kpop, Dance, Cooking Shows, Baking, Accounting, Finance',
            linkedin: 'https://www.linkedin.com/in/susiegu/',
            calendly: 'calendly.com/susie_gu-berkeley',
        },
        {
            name: 'Palak Prabhakar',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Business, Cog Sci',
            hobbies: 'Dance, Gym, Dystopian Media, Photography, Beaded Crafts',
            linkedin: 'linkedin.com/in/palakprabhakar',
            calendly: 'calendly.com/palakprabhakar',
        },
        {
            name: 'Mihiro Okubo',
            title: 'Project Manager',
            year: 'Junior',
            major: 'Environmental Economics & Policy, Minor in Data Science',
            hobbies: 'Baking, Side Hustles, Guitar, Ceramics, Lacrosse',
            linkedin: 'www.linkedin.com/in/mihiro-okubo',
            calendly: 'https://calendly.com/mihiro_okubo-berkeley/30min',
        },
        {
            name: 'Arthur Renard',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Applied Mathematics & Data Science',
            hobbies: 'Guitar, Food, Math',
            linkedin: 'https://www.linkedin.com/in/arthur-m-renard/',
            calendly: 'https://calendly.com/arthur-r-berkeley/30min',
        },
        {
            name: 'Harpreet Kaur',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Aerospace Engineering',
            hobbies: 'Swimming, Running, Baking, Traveling, Photography, F1, Cosmology',
            linkedin: 'www.linkedin.com/in/harpreetkauraero',
            calendly: 'https://calendly.com/harpreetkc-berkeley/mfb-coffe-chat',
        },
        {
            name: 'Yingyi Zhen',
            title: 'Project Manager',
            year: 'Sophomore',
            major: 'Economics & Data Science',
            hobbies: 'Golf, K-Dramas, C-Dramas',
            linkedin: 'https://www.linkedin.com/in/yingyi-zhen/',
            calendly: 'https://calendly.com/yingyizhen03-berkeley/new-meeting',
        },
    ],
    chair: [
        {
            name: 'Alex Black',
            title: 'Microfinance Chair',
            year: 'Sophomore',
            major: 'Economics',
            hobbies: 'Running, Pokémon Cards, Traveling, Eating, Watching Shows',
            linkedin: 'www.linkedin.com/in/alexblack29/',
            calendly: 'calendly.com/alexander_black-berkeley',
        },
        {
            name: 'Nicole Wang',
            title: 'Marketing Chair',
            year: 'Sophomore',
            major: 'Data Science, Economics',
            hobbies: 'Video Editing, Dancing, Hiking, Matcha/Coffee/Boba, Crochet, Painting, Photography, Nails',
            linkedin: 'https://www.linkedin.com/in/nicoleswang/',
            calendly: 'https://calendly.com/nicoleswang-berkeley/30min',
        },
        {
            name: 'Susie Gu',
            title: 'Finance Chair',
            year: 'Sophomore',
            major: 'Business Administration, Data Science',
            hobbies: 'Reading, Writing, Kpop, Dance, Cooking Shows, Baking, Accounting, Finance',
            linkedin: 'https://www.linkedin.com/in/susiegu/',
            calendly: 'calendly.com/susie_gu-berkeley',
        },
        {
            name: 'Arthur Renard',
            title: 'Finance Chair',
            year: 'Sophomore',
            major: 'Applied Mathematics & Data Science',
            hobbies: 'Guitar, Food, Math',
            linkedin: 'https://www.linkedin.com/in/arthur-m-renard/',
            calendly: 'https://calendly.com/arthur-r-berkeley/30min',
        },
    ],
    advisor: [
        {
            name: 'Christian Reyes',
            title: 'Senior Advisor',
            year: 'Senior',
            major: 'Civil Engineering',
            hobbies: 'Gym, Football, Eating',
            linkedin: '',
            calendly: '',
        },
        {
            name: 'Jolene Seng',
            title: 'Senior Advisor',
            year: 'Senior',
            major: 'Statistics & Economics',
            hobbies: 'Volleyball, Swimming, Hiking, Cooking, Cafe Hopping',
            linkedin: '',
            calendly: '',
        },
        {
            name: 'Alex Kwan',
            title: 'Senior Advisor',
            year: 'Senior',
            major: 'Econ',
            hobbies: 'Basketball, Camping, Eating, Trying New Things',
            linkedin: '',
            calendly: '',
            image: 'images/team/alexander-kwan.webp',
        },
        {
            name: 'Matthew Chan',
            title: 'Senior Advisor',
            year: 'Junior',
            major: 'Business Administration, Cognitive Science',
            hobbies: 'Guitar, Movies/TV, Cars, Skiing',
            linkedin: '',
            calendly: '',
        },
        {
            name: 'Lauren Davis',
            title: 'Senior Advisor',
            year: 'Junior',
            major: 'Economics',
            hobbies: 'Traveling, Yoga, Trying New Coffee Shops',
            linkedin: '',
            calendly: '',
        },
        {
            name: 'Maeve Klement',
            title: 'Senior Advisor',
            year: 'Junior',
            major: 'Economics',
            hobbies: 'Running, Hiking, Tennis, Cooking/Baking, Podcasts',
            linkedin: '',
            calendly: '',
        },
        {
            name: 'Nithya Prabhu',
            title: 'Senior Advisor',
            year: 'Senior',
            major: 'Cognitive Science & Data Science',
            hobbies: 'F1, Figure Skating, Art',
            linkedin: '',
            calendly: '',
            image: 'images/team/nithyashree-prabhu.webp',
        },
    ],
    member: [
        {
            name: 'Hean Ng',
            title: 'Senior Associate',
            year: 'Sophomore',
            major: 'Econ & Data Science',
            hobbies: 'Skateboarding, Skiing, Scuba Diving, Travel',
            linkedin: 'www.linkedin.com/in/hean-ng',
            calendly: '',
        },
        {
            name: 'Rayhan Jain',
            title: 'Senior Associate',
            year: 'Sophomore',
            major: 'Applied Math & Data Science',
            hobbies: 'Basketball, Traveling, Trying New Food Spots',
            linkedin: 'https://www.linkedin.com/in/rayhan-j/',
            calendly: '',
        },
        {
            name: 'Orin Dhruvan',
            title: 'Senior Associate',
            year: 'Sophomore',
            major: 'Political Economy',
            hobbies: 'Music, Anime, Parties',
            linkedin: 'linkedin.com/in/otron',
            calendly: '',
        },
        {
            name: 'Yoshan Murugesh',
            title: 'Senior Associate',
            year: 'Sophomore',
            major: 'Economics, Data Science',
            hobbies: 'Basketball, Backpacking, Travel, Gym, Poker',
            linkedin: 'https://www.linkedin.com/in/yoshanmurugesh',
            calendly: 'https://calendly.com/yoshanmurugesh-berkeley/30min',
        },
        {
            name: 'Katherine Rivas',
            title: 'Senior Associate',
            year: 'Sophomore',
            major: 'Business Administration',
            hobbies: 'Drawing, Gym, Hiking, Trying New Food Spots',
            linkedin: 'https://www.linkedin.com/in/katherinecrivas',
            calendly: 'calendly.com/katherine_rivas-berkeley',
        },
        {
            name: 'Andy Cai',
            title: 'Senior Associate',
            year: 'Sophomore',
            major: 'Genetics & Plant Biology',
            hobbies: 'Basketball, Gym, Cycling, Exploring, Video Games',
            linkedin: 'https://www.linkedin.com/in/andycai2007',
            calendly: 'https://calendly.com/cal_andycai2007-berkeley',
        },
        {
            name: 'Akhila Lankalapalli',
            title: 'Associate',
            year: 'Sophomore',
            major: 'Business Admin & Data Science',
            hobbies: 'Badminton, Gym, Hanging With Friends, Exploring The City',
            linkedin: 'https://www.linkedin.com/in/akhila-l-08298226b/',
            calendly: 'https://calendly.com/slankalapalli-berkeley',
        },
        {
            name: 'Athena Sia',
            title: 'Associate',
            year: 'Sophomore',
            major: 'Economics, Data Science',
            hobbies: 'Climbing',
            linkedin: 'https://www.linkedin.com/in/yitingsia06/',
            calendly: 'https://calendly.com/athena06-berkeley/30min',
        },
        {
            name: 'Rubin Jain',
            title: 'Associate',
            year: 'Junior',
            major: 'Business Administration & Integrative Biology',
            hobbies: 'Basketball, Golf, DJing, Concerts, Camping/Hiking',
            linkedin: 'www.linkedin.com/in/rubinjain',
            calendly: 'calendly.com/rubinjain-berkeley',
        },
    ],
};

const teamStatusEl = document.getElementById('team-status');
const GROUP_CONFIG = [
    { key: 'exec', grid: 'exec-grid', empty: 'exec-empty' },
    { key: 'pm', grid: 'pm-grid', empty: 'pm-empty' },
    { key: 'chair', grid: 'chair-grid', empty: 'chair-empty' },
    { key: 'advisor', grid: 'advisor-grid', empty: 'advisor-empty' },
    { key: 'member', grid: 'member-grid', empty: 'member-empty' },
];

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
    const url = (member.image || '').trim();
    return url || localPortraitPath(member);
}

function normalizeUrl(value) {
    const raw = (value || '').trim();
    if (!raw || /^n\/?a$/i.test(raw)) return '';
    if (/^https?:\/\//i.test(raw) || raw.startsWith('/')) return raw;
    return `https://${raw}`;
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
    img.oncontextmenu = () => false;
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
    icon.oncontextmenu = () => false;
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
        normalizeUrl(member.linkedin),
        LINKEDIN_ICON,
        `${member.name} on LinkedIn`
    );
    const calendlyLink = createSocialLink(
        normalizeUrl(member.calendly),
        CALENDLY_ICON,
        `Schedule a chat with ${member.name} on Calendly`
    );

    if (emailLink) socials.appendChild(emailLink);
    if (linkedinLink) socials.appendChild(linkedinLink);
    if (calendlyLink) socials.appendChild(calendlyLink);

    overlay.appendChild(yearMajor);
    overlay.appendChild(hobbies);
    if (socials.childElementCount) overlay.appendChild(socials);

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

function renderGroup(members, grid, emptyEl) {
    if (!grid) return;

    grid.replaceChildren();

    if (!members.length) {
        setSectionEmpty(emptyEl, true);
        return;
    }

    setSectionEmpty(emptyEl, false);
    members.forEach((member) => {
        grid.appendChild(createLeadershipCard(member));
    });
}

function loadTeam() {
    setTeamStatus('', false);

    GROUP_CONFIG.forEach(({ key, grid, empty }) => {
        const gridEl = document.getElementById(grid);
        const emptyEl = document.getElementById(empty);
        renderGroup(TEAM_MEMBERS[key] || [], gridEl, emptyEl);
        initLeadershipPhotos(gridEl);
    });

    observeTeamReveals();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTeam);
} else {
    loadTeam();
}
