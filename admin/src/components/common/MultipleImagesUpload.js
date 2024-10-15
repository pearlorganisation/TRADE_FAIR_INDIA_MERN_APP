import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import "../../App.css";
import { Button } from "react-bootstrap";
// -----------------------------------------------------------------------------------------------------

const MultipleImagesUpload = ({ sendImagesToShop, ind, uniqueKeyValue }) => {
  const [images, setImages] = useState([]);
  const maxNumber = 100;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  console.log("sendImagesToShop, ind, uniqueKeyValue ", ind, uniqueKeyValue);

  useEffect(() => {
    sendImagesToShop({ images, ind, uniqueKeyValue });
  }, [images]);

  useEffect(() => {
    console.log(images, "images");
  }, [images]);

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <section className="d-flex">
              <Button
                type="button"
                variant="warning"
                size="md"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop Gallery Images here
              </Button>
              &nbsp;
              {images.length > 0 && (
                <Button
                  type="button"
                  variant="danger"
                  size="md"
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </Button>
              )}
            </section>
            <section className="shops_gallery_container">
              {imageList.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.data_url}
                    alt="gallery"
                    width={200}
                    height={200}
                  />
                  <div className="shop_gallery_btns_container">
                    <Button
                      variant="warning"
                      size="sm"
                      type="button"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      type="button"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default MultipleImagesUpload;

// -----------------------------------------------------------------------------------------------------
