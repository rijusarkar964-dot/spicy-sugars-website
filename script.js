document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      document.querySelectorAll('.artist-card').forEach(card => {
        card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
      });
    });
  });
  const form = document.getElementById('enquiry-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Website enquiry — ' + (data.get('eventType') || 'Event'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\\nContact: ' + data.get('reply') +
      '\\nEvent type: ' + data.get('eventType') + '\\nEvent date: ' + (data.get('eventDate') || 'Not specified') +
      '\\n\\nDetails:\\n' + (data.get('details') || 'Not provided')
    );
    window.location.href = 'mailto:spicysugersinfo@gmail.com?subject=' + subject + '&body=' + body;
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
