import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled";

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <GalleryList>
      {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL, tags)}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
