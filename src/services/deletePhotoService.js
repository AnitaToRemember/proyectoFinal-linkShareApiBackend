// Import dependencies.
const fs = require('fs/promises'); // Module for file system operations.
const path = require('path'); // Module for working with file and directory paths.

// Import errors.
const { deleteFileError } = require('./errorService'); // Import error handling function.

const deletePhotoService = async (imgName) => {
    try {
        // Absolute path to the file we want to delete.
        const imgPath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR,
            imgName
        );

        // Check if the image exists using the "access" method.
        try {
            await fs.access(imgPath);
        } catch {
            // If the previous method throws an error, it means the image doesn't exist.
            // In that case, we finish the function.
            return;
        }

        // Delete the file from the file upload directory.
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError(); // Call error handling function.
    }
};

module.exports = deletePhotoService;
