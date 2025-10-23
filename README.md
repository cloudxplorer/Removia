# Removia
Removia is a web-based application that allows users to remove the background from images effortlessly and replace it with custom colors or images. Designed with a clean and responsive interface, it works on both desktop and mobile devices.

## Full Description
Background Remover is a modern, user-friendly web application that enables anyone to remove image backgrounds without advanced photo editing skills. Users can upload an image, instantly remove its background using the Remove.bg API, and optionally replace it with solid colors or custom background images.  

The application is built with a responsive layout, ensuring seamless usability across devices. It also includes features like color palette selection, custom image backgrounds, and easy download of the processed images.

This project is ideal for graphic designers, social media enthusiasts, marketers, or anyone who frequently needs images with transparent or customized backgrounds.

## All Features
- Upload and process images to remove the background.
- Automatic background removal using the Remove.bg API.
- Replace removed backgrounds with:
  - Solid colors from a pre-defined palette.
  - Custom images uploaded by the user.
- Download processed images in PNG format.
- Responsive design for desktop and mobile devices.
- Loading indicator during image processing.
- Notification system for errors or processing updates.
- Supports transparent background export.
- Maximum image size: 5 MB.

## How it Works?
1. **Image Upload**: Users select an image from their device.  
2. **Background Removal**: The image is sent to the Remove.bg API, which returns a transparent background version.  
3. **Customization**:
   - Apply a solid color background from the palette.
   - Upload a custom background image.  
4. **Preview & Download**: Users can preview the processed image and download it directly in PNG format.  
5. **Notifications & Loading**: The application provides real-time notifications and displays a spinner while processing images.

## Functions
### Core JavaScript Functions
- **init()**: Initializes the app, attaches event listeners, renders the color palette, and sets the current year in the footer.  
- **handleImageSelect(e)**: Handles image file selection, validates file size, and triggers processing.  
- **processImage()**: Sends the selected image to Remove.bg API, receives the processed image, and applies the selected background or color.  
- **applyColorBackground(imageSrc, color)**: Applies a solid color background to the processed image using a canvas.  
- **applyBackground(imageSrc, backgroundSrc)**: Applies a custom image background to the processed image using a canvas.  
- **renderColorPalette()**: Renders color options and handles selection for background replacement.  
- **handleCustomBackground(e)**: Handles uploading of a custom background image.  
- **downloadImage()**: Downloads the final processed image.  
- **showNotification(message)**: Displays notifications for success or error messages.  
- **showLoading(show)**: Toggles the loading spinner visibility.

## Usage & Installation
- git clone https://github.com/cloudxplorer/Removia
- cd Removia
- python -m http.server 4444

Now open your Browser and Visit
- http://localhost:4444

DEMO:- [Removia](https://cloudxplorer.github.io/Removia/)

## Steps to use:

- Click on the upload section to select an image.
- Wait for the background to be removed automatically.
- Choose a background color from the palette or upload a custom background.
- Click the download button to save the processed image.

Note: You need a valid Remove.bg API key in the JavaScript code for background removal to work. Replace the existing API key with your own:

- headers: { 'X-Api-Key': 'YOUR_API_KEY_HERE' }

## Tech Stack
- **HTML5** — Structure and layout.
- **CSS3** — Styling, gradients, animations, and responsive design.
- **JavaScript (ES6)** — Client-side scripting for image processing, API calls, and dynamic UI.
- **Remove.bg API:** Third-party service for background removal.
- **Canvas API:** For applying custom backgrounds and colors.

## License
This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this project for personal or commercial purposes. Attribution is appreciated.
