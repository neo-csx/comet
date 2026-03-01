const SUNC_URL = 'https://example.com/';
const SUNC_LOCKED = false;

const CREDITS = [
  {
    avatar: 'https://cdn.discordapp.com/avatars/1455019416529014848/ace1ebd50c903759a90993e3264963ae.webp?size=256',
    name: 'ace',
    role: 'Founder & Web Development',
    tag: '@acegef'
  },
  {
    avatar: 'https://cdn.discordapp.com/avatars/937552416138756126/96393129319b7f024de844dee32bc27b.webp?size=256',
    name: 'cupid',
    role: 'Co-Founder',
    tag: '@node.sh'
  },
  {
    avatar: 'https://cdn.discordapp.com/avatars/1422540888424579132/0fec39d0ba14e8e0ea4924975df00a7a.webp?size=256',
    name: 'sixteen',
    role: 'Co-Founder & Web Development',
    tag: '@plsprotectme'
  },
    {
    avatar: 'https://cdn.discordapp.com/avatars/1375156686670528695/b7c76b9831cdc4863d3e0dd30cb4f82f.webp?size=256',
    name: 'wschod__',
    role: 'Web Development',
    tag: '@unban_y8zb'
  },
];

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 2000);
});

function showToast(msg, duration) {
  duration = duration || 3200;
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

function openSUNC() {
  if (SUNC_LOCKED) {
    showToast('sUNC results are not available yet. Check back soon.');
    return;
  }
  document.getElementById('suncFrame').src = SUNC_URL;
  document.getElementById('suncOverlay').classList.add('open');
}

function closeSUNCBtn() {
  document.getElementById('suncOverlay').classList.remove('open');
  document.getElementById('suncFrame').src = '';
}

function closeSUNC(e) {
  if (e.target === document.getElementById('suncOverlay')) closeSUNCBtn();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSUNCBtn();
});

(function initParticles() {
  const container = document.getElementById('particles');
  const style = document.createElement('style');
  style.textContent = '@keyframes floatParticle{0%{transform:translateY(0) scale(1);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-130px) scale(0.4);opacity:0}}';
  document.head.appendChild(style);
  for (let i = 0; i < 36; i++) {
    const p = document.createElement('div');
    const size = (Math.random() * 1.8 + 0.4).toFixed(1);
    const alpha = (Math.random() * 0.2 + 0.04).toFixed(2);
    const left = (Math.random() * 100).toFixed(1);
    const top = (Math.random() * 100).toFixed(1);
    const dur = (Math.random() * 12 + 8).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    p.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:rgba(255,255,255,' + alpha + ');left:' + left + '%;top:' + top + '%;animation:floatParticle ' + dur + 's ' + delay + 's linear infinite;';
    container.appendChild(p);
  }
})();

(function initGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;

  const SIZE = Math.min(window.innerWidth < 960 ? 300 : 420, 420);
  canvas.width = SIZE;
  canvas.height = SIZE;

  const ctx = canvas.getContext('2d');
  const R = SIZE * 0.42;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  let rot = 0;

  const UK = { lat: 54.5, lon: -2 };

  const CITIES = [
    { lat: 40.7, lon: -74 },
    { lat: 34.05, lon: -118.25 },
    { lat: -23.5, lon: -46.6 },
    { lat: 48.85, lon: 2.35 },
    { lat: 55.75, lon: 37.6 },
    { lat: 28.6, lon: 77.2 },
    { lat: 35.68, lon: 139.69 },
    { lat: -33.86, lon: 151.2 },
    { lat: -26, lon: 28 },
    { lat: 37.56, lon: 126.97 },
    { lat: 19.43, lon: -99.13 },
    { lat: 1.35, lon: 103.82 },
    { lat: 43.65, lon: -79.38 },
    { lat: -34.6, lon: -58.38 },
    { lat: 60.19, lon: 24.94 },
    { lat: 41.01, lon: 28.95 },
    { lat: 25.2, lon: 55.27 },
    { lat: 52.37, lon: 4.9 },
    { lat: 59.91, lon: 10.75 },
    { lat: 45.42, lon: -75.69 },
  ];

  function project(lat, lon, r, rotY) {
    const la = lat * Math.PI / 180;
    const lo = (lon + rotY) * Math.PI / 180;
    const x = r * Math.cos(la) * Math.cos(lo);
    const y = -r * Math.sin(la);
    const z = r * Math.cos(la) * Math.sin(lo);
    return { sx: cx + x, sy: cy + y, z: z };
  }

  function drawArc(latA, lonA, latB, lonB, rotY, alpha) {
    const STEPS = 80;
    const points = [];
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      const lat = latA + (latB - latA) * t;
      const lon = lonA + (lonB - lonA) * t;
      const lift = Math.sin(t * Math.PI) * 0.28;
      const p = project(lat, lon, R * (1 + lift), rotY);
      points.push(p);
    }

    ctx.beginPath();
    let started = false;
    for (let i = 0; i < points.length; i++) {
      if (points[i].z < -R * 0.1) { started = false; continue; }
      if (!started) { ctx.moveTo(points[i].sx, points[i].sy); started = true; }
      else ctx.lineTo(points[i].sx, points[i].sy);
    }
    ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 2) {
        const p = project(lat, lon, R, rot);
        if (p.z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(p.sx, p.sy); first = false; }
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    for (let lon = -150; lon <= 180; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat2 = -85; lat2 <= 85; lat2 += 2) {
        const p = project(lat2, lon, R, rot);
        if (p.z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(p.sx, p.sy); first = false; }
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    const dots = [];
    for (let lat = -80; lat <= 80; lat += 10) {
      for (let lon = -180; lon < 180; lon += 10) {
        const p = project(lat, lon, R, rot);
        if (p.z > 0) dots.push(p);
      }
    }
    dots.forEach(function(p) {
      const d = (p.z + R) / (2 * R);
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 0.9 + d * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + (0.07 + d * 0.2).toFixed(2) + ')';
      ctx.fill();
    });

    CITIES.forEach(function(city) {
      const cp = project(city.lat, city.lon, R, rot);
      if (cp.z > 0) {
        drawArc(UK.lat, UK.lon, city.lat, city.lon, rot, 0.15);
        ctx.beginPath();
        ctx.arc(cp.sx, cp.sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fill();
      }
    });

    const ukP = project(UK.lat, UK.lon, R, rot);
    if (ukP.z > 0) {
      ctx.beginPath();
      ctx.arc(ukP.sx, ukP.sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fill();

      const pulse = (Math.sin(Date.now() * 0.003) * 0.5 + 0.5);
      ctx.beginPath();
      ctx.arc(ukP.sx, ukP.sy, 9 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.15 - pulse * 0.1).toFixed(2) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    rot += 0.15;
    requestAnimationFrame(draw);
  }

  draw();
})();

(function initCredits() {
  const grid = document.getElementById('creditsGrid');
  if (!grid) return;

  CREDITS.forEach(function(member) {
    const card = document.createElement('div');
    card.className = 'credit-card reveal';

    const avatar = document.createElement('img');
    avatar.className = 'credit-avatar';
    avatar.alt = member.name;
    avatar.src = member.avatar;
    avatar.onerror = function() {
      avatar.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.className = 'credit-avatar-fallback';
      fallback.textContent = member.name.charAt(0).toUpperCase();
      card.insertBefore(fallback, card.firstChild);
    };

    const info = document.createElement('div');
    info.className = 'credit-info';

    const name = document.createElement('span');
    name.className = 'credit-name';
    name.textContent = member.name;

    const role = document.createElement('span');
    role.className = 'credit-role';
    role.textContent = member.role;

    const tag = document.createElement('span');
    tag.className = 'credit-tag';
    tag.textContent = member.tag;

    info.appendChild(name);
    info.appendChild(role);
    info.appendChild(tag);
    card.appendChild(avatar);
    card.appendChild(info);
    grid.appendChild(card);
  });
})();

(function initReveal() {
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  function observeAll() {
    document.querySelectorAll('.reveal:not([data-observed])').forEach(function(el, i) {
      el.setAttribute('data-observed', '1');
      el.style.transitionDelay = (i % 5 * 0.07) + 's';
      obs.observe(el);
    });
  }

  observeAll();

  new MutationObserver(observeAll).observe(document.body, { childList: true, subtree: true });
})();