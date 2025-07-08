// Loader hide
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);
const heroTL = gsap.timeline();
heroTL
  .from('.hero__title', { y:100, opacity:0, duration:1.2, ease:'power3.out' })
  .from('.hero__subtitle', { y:60, opacity:0, duration:0.8 }, '-=0.8')
  .from('.hero__actions .btn', { y:40, opacity:0, stagger:0.2, duration:0.7 }, '-=0.5')
  .to('#heroTaxi', {
    scale:1.05,
    rotation:3,
    repeat:-1,
    yoyo:true,
    duration:2,
    ease:'sine.inOut'
  }, '-=0.5');

gsap.utils.toArray('.card, .feature, .price-card, .testimonial').forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger:el,
      start:'top 85%',
      toggleActions:'play none none reverse'
    },
    y:60,
    opacity:0,
    duration:0.9,
    ease:'power3.out'
  });
});

// Navbar scroll
const nav = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggling
const burger = document.getElementById('burger'),
      navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const exp = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!exp));
  navLinks.classList.toggle('open');
});

// Modal logic
const modal = document.getElementById('bookingModal'),
      openers = ['btnBookNav','btnBookHero','btnBookFooter'].map(id => document.getElementById(id)),
      closeBtn = document.getElementById('closeModal');
openers.forEach(btn => btn?.addEventListener('click', () => {
  modal.style.display = 'flex';
  modal.querySelector('input').focus();
}));
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', e => { if(e.target === modal) modal.style.display = 'none'; });
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
  }
});

// WhatsApp booking
document.getElementById('sendWhatsApp').addEventListener('click', () => {
  const pickup = document.getElementById('pickup').value.trim(),
        dest = document.getElementById('destination').value.trim();
  if (!pickup || !dest) return alert('Please fill both fields');
  const msg = `Hi Rajmandir Cab, please book a ride from ${pickup} to ${dest}.`,
        phone = '911234567890';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
});
