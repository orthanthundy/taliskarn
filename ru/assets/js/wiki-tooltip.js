const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-content';
  tooltip.style.position = 'fixed';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  let lastTapped = null;

  function bindTooltips() {
    document.querySelectorAll('.has-tooltip').forEach(el => {
      const original = el.querySelector('.tooltip-content');
      if (!original) return;

      const showTooltip = (e) => {
        tooltip.innerHTML = original.innerHTML;
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';

        const margin = 12;
        const tipRect = tooltip.getBoundingClientRect();

        let left = e.clientX + margin;
        let top = e.clientY + margin;

        if (left + tipRect.width > window.innerWidth) {
          left = e.clientX - tipRect.width - margin;
        }

        if (top + tipRect.height > window.innerHeight) {
          top = e.clientY - tipRect.height - margin;
        }

        if (left < 0) left = 0;
        if (top < 0) top = 0;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      };

      const hideTooltip = () => {
        tooltip.style.display = 'none';
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        lastTapped = null;
      };

      if (isTouchDevice) {
        el.addEventListener('click', (e) => {
          if (lastTapped !== el) {
            e.preventDefault();
            e.stopPropagation();
            lastTapped = el;
            showTooltip(e);

            setTimeout(() => {
              if (lastTapped === el) hideTooltip();
            }, 3000);
          } else {
            hideTooltip();
            const anchor = el.closest('a');
            if (anchor && anchor.href) {
              window.location.href = anchor.href;
            }
          }
        });
        document.addEventListener('click', hideTooltip);
        tooltip.addEventListener('click', e => e.stopPropagation());
      } else {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mousemove', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
      }
    });
  }

  setTimeout(bindTooltips, 100);
});
