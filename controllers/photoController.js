const { Photo, User, Comment } = require('../models');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:photoController');
const { SECRET_KEY } = require('../config');

// Create a new photo
exports.createPhoto = async (req, res) => {
  try {
    const { title, caption, poster_image_url } = req.body;
    const token = req.headers.token;

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Create photo for the authenticated user
    const photo = await Photo.create({
      title,
      caption,
      poster_image_url,
      UserId: decoded.userId,
    });

    debug('Photo created successfully');
    return res.status(201).json({
      id: photo.id,
      poster_image_url: photo.poster_image_url,
      title: photo.title,
      caption: photo.caption,
      UserId: photo.UserId,
    });
  } catch (error) {
    debug('Error creating photo:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all photos for the authenticated user
exports.getAllPhotos = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // Fetch photos for the authenticated user
    const photos = await Photo.findAll({
      where: { UserId: decoded.userId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'profile_image_url'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    debug('Fetched all photos successfully');
    return res.status(200).json({ photos });
  } catch (error) {
    debug('Error fetching photos:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a photo (user can only update their own photos)
exports.updatePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { title, caption, poster_image_url } = req.body;
    const token = req.headers.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // Find the photo by ID
    const photo = await Photo.findByPk(photoId);

    // Check if the user owns the photo
    if (photo.UserId !== decoded.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the photo
    await photo.update({
      title,
      caption,
      poster_image_url,
    });

    debug('Photo updated successfully');
    return res.status(200).json({
      photo: {
        id: photo.id,
        title: photo.title,
        caption: photo.caption,
        poster_image_url: photo.poster_image_url,
        UserId: photo.UserId,
        createdAt: photo.createdAt,
      },
      updatedAt: photo.updatedAt,
    });
  } catch (error) {
    debug('Error updating photo:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a photo (user can only delete their own photos)
exports.deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const token = req.headers.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // Find the photo by ID
    const photo = await Photo.findByPk(photoId);

    // Check if the user owns the photo
    if (photo.UserId !== decoded.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the photo
    await photo.destroy();

    debug('Photo deleted successfully');
    return res.status(200).json({ message: 'Your photo has been successfully deleted' });
  } catch (error) {
    debug('Error deleting photo:', error);
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
