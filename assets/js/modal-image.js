document.addEventListener("DOMContentLoaded", function () {
    let images = Array.from(document.querySelectorAll("img.phb-image"));
    let modal = document.getElementById("imageModal");
    let modalImage = document.getElementById("modalImage");
    let modalCaption = document.getElementById("modalCaption");
    let navButtons = document.querySelector(".nav-buttons");
    let currentIndex = 0;
  
    function openModal(index) {
      if (index < 0 || index >= images.length) return;
      currentIndex = index;
      const image = images[currentIndex];
  
      modalImage.src = image.src;
      modalCaption.innerHTML = `${image.alt || "Image " + (index + 1)} (<a id="fullSizeLink" style="color: #4dabf7;" target="_blank" href="${image.dataset.fullsize || image.src}">${window.modalOpenText || "Open full size"}</a>)`;
      modal.style.display = "flex";
      navButtons.style.display = images.length > 1 ? "flex" : "none";
    }
  
    function closeModal() {
      modal.style.display = "none";
    }
  
    function changeImage(step) {
      let newIndex = currentIndex + step;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      openModal(newIndex);
    }
  
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target === modalImage) {
        closeModal();
      }
    });
  
    images.forEach((img, index) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => openModal(index));
    });
  
    document.querySelector(".close").addEventListener("click", closeModal);
    document.addEventListener("keydown", (event) => {
      if (modal.style.display === "flex") {
        if (event.key === "Escape") closeModal();
        if (event.key === "ArrowLeft") changeImage(-1);
        if (event.key === "ArrowRight") changeImage(1);
      }
    });
  
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.changeImage = changeImage;
  });
  