/* ═══════════════════════════════════════════════
   PAULINA & YALFRED — WEDDING INVITATION JS
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  const overlay = document.getElementById('envelope-overlay');
  const envelope = document.getElementById('envelope');
  const mainContent = document.getElementById('main-content');
  const videos = document.querySelectorAll('video');

  let isOpen = false;

  /* ─── Open Envelope ─── */
  function openEnvelope () {
    if (isOpen) return;
    isOpen = true;

    envelope.classList.add('open');

    // Wait for flap animation, then hide overlay
    setTimeout(function () {
      overlay.classList.add('hidden');

      // After overlay is hidden, show main content properly
      setTimeout(function () {
        document.body.style.overflow = '';
      }, 500);
    }, 1000);
  }

  /* ─── Click Handler ─── */
  overlay.addEventListener('click', openEnvelope);

  /* ─── Touch / Mobile ─── */
  overlay.addEventListener('touchstart', function (e) {
    // Prevent double-firing on mobile
    if (!isOpen) {
      e.preventDefault();
      openEnvelope();
    }
  }, { passive: false });

  /* ─── Videos: pause others when one plays ─── */
  videos.forEach(function (video) {
    video.addEventListener('play', function () {
      videos.forEach(function (other) {
        if (other !== video && !other.paused) {
          other.pause();
        }
      });
    });
  });

  /* ─── Click on video to play/pause ─── */
  videos.forEach(function (video) {
    video.addEventListener('click', function () {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });

  /* ─── Reveal Animation on Scroll (Intersection Observer) ─── */
  if (window.IntersectionObserver) {
    var revealElements = document.querySelectorAll(
      '.section-header, .video-wrapper, .invitacion-names, .timeline-item, .rsvp'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ─── Prevent scroll while envelope is closed ─── */
  // Only lock scroll if overlay is visible
  if (!overlay.classList.contains('hidden')) {
    document.body.style.overflow = 'hidden';
  }

  // Listen for overlay hidden to allow scroll
  var observerBody = new MutationObserver(function () {
    if (overlay.classList.contains('hidden')) {
      document.body.style.overflow = '';
      observerBody.disconnect();
    }
  });

  if (!overlay.classList.contains('hidden')) {
    observerBody.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }

})();
