document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const createBtn = document.querySelector(".create-button");
    const previewBlock = document.getElementById("mockupPreview");
    const imgElement = document.getElementById("mockupImage");
    const dropArea = document.getElementById("dropArea");
    const manualUploadBtn = document.getElementById("manualUploadBtn");
    const fileStatus = document.getElementById("fileStatus");
  
    // Все доступные мокапы
    const mockups = {
      iphone: {
        image: new Image(),
        src: "assets/iphone-frame.png",
        width: 942,
        height: 1878,
        mask: { x: 64, y: 53, width: 817, height: 1798 },
      },
      macbook: {
        image: new Image(),
        src: "assets/macbook.png",
        width: 1990,
        height: 1343,
        mask: { x: 250, y: 70, width: 1503, height: 1020 },
      },
      imac: {
        image: new Image(),
        src: "assets/imac.png",
        width: 2000,
        height: 1568,
        mask: { x: 147, y: 94, width: 1745, height: 977 },
      }

    };
  
    for (const key in mockups) {
      mockups[key].image.src = mockups[key].src;
    }
  
    let currentMockup = "iphone";
    let userImage = null;
  
    // Переключение мокапов
    document.querySelectorAll(".device-toggle .toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".device-toggle .toggle").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMockup = btn.dataset.device;
      });
    });
  
    // Кнопка загрузки файла
    manualUploadBtn.addEventListener("click", () => {
      fileInput.click();
    });
  
    // Drag’n’drop
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.classList.add("dragover");
    });
  
    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("dragover");
    });
  
    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      dropArea.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      if (file) {
        fileInput.files = e.dataTransfer.files;
        const event = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    });
  
    // Загрузка изображения
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          userImage = img;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
  
      // Обновить статус UI
      fileStatus.textContent = `Файл загружен: ${file.name}`;
      fileStatus.style.color = "#9ef09e";
    });
  
    // Создание мокапа
    createBtn.addEventListener("click", () => {
      if (!userImage) {
        alert("Сначала загрузите изображение.");
        return;
      }
  
      const mockup = mockups[currentMockup];
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      canvas.width = mockup.width;
      canvas.height = mockup.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const { x, y, width, height } = mockup.mask;
      drawScreenshotStrictWidth(ctx, userImage, x, y, width, height);
      ctx.drawImage(mockup.image, 0, 0);
  
      imgElement.src = canvas.toDataURL("image/png");
      imgElement.style.display = "block";
      previewBlock.style.display = "block";
    });
  
    // Маска + масштаб по ширине, обрезка по высоте
    function drawScreenshotStrictWidth(ctx, img, x, y, targetWidth, maxHeight) {
      const scale = img.width / targetWidth;
      const scaledHeight = img.height / scale;
  
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, targetWidth, maxHeight);
      ctx.clip();
  
      ctx.drawImage(img, x, y, targetWidth, scaledHeight);
      ctx.restore();
    }
  });

