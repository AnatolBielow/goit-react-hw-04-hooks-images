import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ src, alt, onClick }) => (
  <GalleryItem>
    <GalleryItemImage src={src} alt={alt} onClick={onClick} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
