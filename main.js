let expandedBox = null;

const sizeMap = {
  small: 100,
  medium: 150,
  large: 200,
  xl: 250,
};

function initBoxes() {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("click", (e) => handleBoxClick(e, box));

    const colorBtns = box.querySelectorAll(".color-btn");
    colorBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const color = btn.dataset.color;
        box.style.backgroundColor = color;
      });
    });

    const sizeSelect = box.querySelector(".size-select");

    sizeSelect.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    sizeSelect.addEventListener("change", (e) => {
      e.stopPropagation();
      const selectedSize = e.target.value;
      const size = sizeMap[selectedSize];
      const boxContent = box.querySelector(".box-content");

      box.style.height = `${size}px`;
      boxContent.style.height = `${size - 40}px`;

      boxContent.style.overflow = "auto";
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".box")) {
      closeExpandedBox();
    }
  });
}

function handleBoxClick(e, box) {
  e.stopPropagation();

  if (expandedBox === box) {
    closeExpandedBox();
    return;
  }

  if (expandedBox) {
    closeExpandedBox();
  }

  expandBox(box);
}

function expandBox(box) {
  expandedBox = box;
  box.classList.add("expanded");
  const options = box.querySelector(".options");
  options.classList.remove("hidden");

  const boxContent = box.querySelector(".box-content");
  boxContent.style.height = "";

  setTimeout(() => {
    options.classList.add("visible");
  }, 10);
}

function closeExpandedBox() {
  if (!expandedBox) return;

  const options = expandedBox.querySelector(".options");
  options.classList.remove("visible");

  expandedBox.style.height = "";
  const boxContent = expandedBox.querySelector(".box-content");
  boxContent.style.height = "";
  boxContent.style.overflow = "";

  const sizeSelect = expandedBox.querySelector(".size-select");
  sizeSelect.value = "medium";

  setTimeout(() => {
    options.classList.add("hidden");
    expandedBox.classList.remove("expanded");
    expandedBox = null;
  }, 300);
}

document.addEventListener("DOMContentLoaded", initBoxes);
