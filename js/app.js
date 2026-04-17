// Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const navMobile = document.getElementById('navMobile');

    menuBtn?.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      navMobile.setAttribute('aria-hidden', String(!isOpen));
    });

    // Filters
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    const cards = Array.from(document.querySelectorAll('.card[data-categoria]'));

    function applyFilter(category){
      cards.forEach(card => {
        const match = (category === 'todos') || (card.dataset.categoria === category);
        card.style.display = match ? '' : 'none';
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });

    // Modal logic
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');

    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');
    const modalBullets = document.getElementById('modalBullets');

    function openModal({ title, desc, img, bullets }){
      modalTitle.textContent = title || 'Rutina';
      modalDesc.textContent = desc || '';
      modalImg.src = img || '';
      modalImg.alt = title || 'Imagen de rutina';
      modalBullets.innerHTML = '';
      (bullets || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalBullets.appendChild(li);
      });

      modalBackdrop.style.display = 'flex';
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(){
      modalBackdrop.style.display = 'none';
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.rutina-btn').forEach(button => {
      button.addEventListener('click', () => {
        openModal({
          title: button.dataset.title,
          desc: button.dataset.desc,
          img: button.dataset.img,
          bullets: JSON.parse(button.dataset.bullets || '[]')
        });
      });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // CTA: scroll to routines
    document.getElementById('btnVerRutinas')?.addEventListener('click', () => {
      document.getElementById('rutinas').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // CTA: suggestion quick (simple random)
    const sugerenciaBtn = document.getElementById('btnSugerencia');
    sugerenciaBtn?.addEventListener('click', () => {
      const visibleCards = cards.filter(c => c.style.display !== 'none');
      const pool = visibleCards.length ? visibleCards : cards;
      const pick = pool[Math.floor(Math.random() * pool.length)];

      const btn = pick.querySelector('.rutina-btn');
      btn?.click();
    });

    // Contact form (demo)
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      toast.style.display = 'block';

      // reset form after a moment (demo)
      setTimeout(() => {
        toast.style.display = 'none';
        contactForm.reset();
      }, 2500);
    });
