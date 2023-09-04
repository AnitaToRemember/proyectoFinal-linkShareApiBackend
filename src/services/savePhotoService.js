// Import dependencies.
const fs = require('fs/promises'); // Module for file system operations.
const path = require('path'); // Module for working with file and directory paths.
const sharp = require('sharp'); // Module for image processing.
const uuid = require('uuid'); // Module for generating unique identifiers.

// Import errors.
const { saveFileError } = require('./errorService'); // Import error handling function.

const savePhotoService = async (img, width) => {
    try {
        // Absolute path to the file upload directory.
        const uploadsDir = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR
        );

        // Create the "uploads" folder if it doesn't exist using the "access" method.
        try {
            await fs.access(uploadsDir);
        } catch {
            // If the previous method throws an error, it means the directory doesn't exist.
            // In that case, we would enter the catch block and create it.
            await fs.mkdir(uploadsDir);
        }

        // Create a Sharp object with the received image.
        const sharpImg = sharp(img.data);

        // Resize the image. The "width" parameter represents the width in pixels.
        sharpImg.resize(width);

        // Generate a unique name for the image to prevent having two images with the same name.
        const imgName = `${uuid.v4()}.jpg`;

        // Absolute path to the image.
        const imgPath = path.join(uploadsDir, imgName);

        // Save the image to the file upload directory.
        await sharpImg.toFile(imgPath);

        // Return the name under which we have saved the image.
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError(); // Call error handling function.
    }
};

module.exports = savePhotoService; // Export the savePhotoService function.
