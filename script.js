const imageInput = document.getElementById('imageInput');
const uploadSection = document.getElementById('uploadSection');
const customBgBtn = document.getElementById('customBgBtn');
const customBgInput = document.createElement('input');
const resultPreview = document.getElementById('resultPreview');
const downloadBtn = document.getElementById('downloadBtn');
const colorPalette = document.getElementById('colorPalette');
const notification = document.getElementById('notification');
const loading = document.getElementById('loading');

let currentImage = null;
let processedImage = null;
let currentBackground = null;
let backgroundColor = 'transparent';
const colors = [
    { name: 'Transparent', value: 'transparent', isTransparent: true },
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#4361ee' },
    { name: 'Purple', value: '#7209b7' },
    { name: 'Aqua', value: '#4cc9f0' },
    { name: 'Pink', value: '#f72585' },
    { name: 'Green', value: '#4ade80' }
];

function init() {
    uploadSection.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleImageSelect);
    customBgBtn.addEventListener('click', () => customBgInput.click());
    customBgInput.addEventListener('change', handleCustomBackground);
    downloadBtn.addEventListener('click', downloadImage);
    
    customBgInput.type = 'file';
    customBgInput.accept = 'image/*';
    customBgInput.style.display = 'none';
    document.body.appendChild(customBgInput);
    
    renderColorPalette();
    document.querySelector('.color-option').classList.add('selected');

    document.getElementById('year').textContent = new Date().getFullYear();
}

function handleImageSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File too large! Please select an image under 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            currentImage = event.target.result;
            uploadSection.innerHTML = `<img src="${currentImage}" alt="Selected" class="upload-image">`;
            downloadBtn.disabled = true;
            processImage();
        };
        reader.readAsDataURL(file);
    }
}

async function processImage() {
    if (!currentImage) return;
    
    showLoading(true);
    
    try {
        const response = await fetch(currentImage);
        const blob = await response.blob();
        
        const formData = new FormData();
        formData.append('image_file', blob, 'image.jpg');
        formData.append('size', 'auto');
        
        const apiResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'Ss5PAFHZwsGqS3ytQdSXT3vy'
            },
            body: formData
        });
        
        if (!apiResponse.ok) {
            throw new Error(`API Error: ${apiResponse.status} ${apiResponse.statusText}`);
        }
        
        const resultBlob = await apiResponse.blob();
        processedImage = URL.createObjectURL(resultBlob);
        
        if (currentBackground) {
            applyBackground(processedImage, currentBackground);
        } else if (backgroundColor !== 'transparent') {
            applyColorBackground(processedImage, backgroundColor);
        } else {
            resultPreview.innerHTML = `<img src="${processedImage}" alt="Processed">`;
        }
        
        downloadBtn.disabled = false;
        showNotification('Background removed!');
    } catch (error) {
        console.error('Error processing image:', error);
        if (error.message.includes('402')) {
            showNotification('Free quota exceeded. Try again later.');
        } else {
            showNotification('Error processing image. Please try again.');
        }
    } finally {
        showLoading(false);
    }
}

function applyColorBackground(imageSrc, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resultPreview.innerHTML = `<img src="${canvas.toDataURL()}" alt="With Background">`;
    };
    img.src = imageSrc;
}

function applyBackground(imageSrc, backgroundSrc) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        const bg = new Image();
        bg.crossOrigin = 'Anonymous';
        bg.onload = function() {
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            resultPreview.innerHTML = `<img src="${canvas.toDataURL()}" alt="With Background">`;
        };
        bg.src = backgroundSrc;
    };
    img.src = imageSrc;
}

function renderColorPalette() {
    colorPalette.innerHTML = '';
    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        if (color.isTransparent) {
            colorOption.classList.add('transparent');
        } else {
            colorOption.style.backgroundColor = color.value;
        }
        colorOption.title = color.name;
        colorOption.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
            colorOption.classList.add('selected');
            backgroundColor = color.value;
            currentBackground = null;
            
            if (processedImage) {
                if (backgroundColor === 'transparent') {
                    resultPreview.innerHTML = `<img src="${processedImage}" alt="Processed">`;
                } else {
                    applyColorBackground(processedImage, backgroundColor);
                }
            }
        });
        colorPalette.appendChild(colorOption);
    });
}

function handleCustomBackground(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentBackground = event.target.result;
            backgroundColor = null;
            document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
            if (processedImage) {
                applyBackground(processedImage, currentBackground);
            }
        };
        reader.readAsDataURL(file);
    }
}

function downloadImage() {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = 'background-removed.png';
    link.href = resultPreview.querySelector('img').src;
    link.click();
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2500);
}

function showLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
}

window.addEventListener('DOMContentLoaded', init);
