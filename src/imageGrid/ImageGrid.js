import React, { useRef, useState, useEffect } from "react";
import "./ImageGrid.scss";

const ImageGrid = ({ imagesSrc, spaceBetweenImages, transitionSpeed }) => {
  const wrapperRef = useRef();
  const [imagesList, setImages] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentMinAspectRatio, setMinAspectRatio] = useState(null);

  useEffect(() => {
    getAspectRatios();
  }, []);

  let running = false;
  useEffect(() => {
    const runCallbacks = () => {
      computeLayout();
      running = false;
    };
    //screen resize listener
    const listener = () => {
      if (!running) {
        running = true;
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(runCallbacks);
        } else {
          setTimeout(runCallbacks, 66);
        }
      }
    };

    if (imagesList?.length) {
      window.addEventListener("resize", listener);
    }

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [imagesList]);

  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = image;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const getAspectRatios = () => {
    let promises = imagesSrc.map((image) => loadImage(image));
    Promise.all(promises).then((res) => {
      const imagesData = [];
      res?.forEach((image) => {
        imagesData.push({
          src: image.src,
          aspectRatio: image.width / image.height,
        });
      });
      computeLayout(imagesData);
    });
  };

  const getTransitionTimeout = () => {
    let transitionTimeoutScaleFactor = 1.5;
    return transitionSpeed * transitionTimeoutScaleFactor;
  };

  const getTransitionString = () => {
    if (isTransitioning) {
      return transitionSpeed / 1000 + "s transform ease";
    }

    return "none";
  };

  let getMinAspectRatio = () => {
    let lastWindowWidth = window.innerWidth;
    if (lastWindowWidth <= 640) return 2;
    else if (lastWindowWidth <= 1280) return 4;
    else if (lastWindowWidth <= 1920) return 5;
    return 6;
  };

  const computeLayout = (imagesInfo) => {
    let images = imagesInfo ? imagesInfo : imagesList;
    let { clientWidth } = wrapperRef?.current;
    let wrapperWidth = parseInt(clientWidth);

    // Variables
    let row = []; // The list of images in the current row.
    let translateX = 0; // The current translateX value that we are at
    let translateY = 0; // The current translateY value that we are at
    let rowAspectRatio = 0; // The aspect ratio of the row we are building

    // Compute the minimum aspect ratio that should be applied to the rows.
    let oldMinAspectRatio = currentMinAspectRatio;
    let newMinAspectRatio = getMinAspectRatio();

    let minAspectRatio = newMinAspectRatio;
    setMinAspectRatio(newMinAspectRatio);
    let minAspectRatioRequiresTransition =
      oldMinAspectRatio !== null && oldMinAspectRatio !== newMinAspectRatio;

    if (!isTransitioning && minAspectRatioRequiresTransition) {
      setIsTransitioning(true);
      setTimeout(function () {
        setIsTransitioning(false);
      }, getTransitionTimeout());
    }

    // Get the valid-CSS transition string.
    let transition = getTransitionString();

    // Loop through all our images, building them up into rows and computing
    // the working rowAspectRatio.
    images?.forEach((image, index) => {
      rowAspectRatio += parseFloat(image?.aspectRatio);
      row.push(image);

      // When the rowAspectRatio exceeeds the minimum acceptable aspect ratio,
      // or when we're out of images, we say that we have all the images we
      // need for this row, and compute the style values for each of these
      // images.
      if (rowAspectRatio >= minAspectRatio || index + 1 === images.length) {
        // Make sure that the last row also has a reasonable height
        rowAspectRatio = Math.max(rowAspectRatio, minAspectRatio);

        // Compute this row's height.
        let totalDesiredWidthOfImages =
          wrapperWidth - spaceBetweenImages * (row.length - 1);
        let rowHeight = totalDesiredWidthOfImages / rowAspectRatio;

        // For each image in the row, compute the width, height, translateX,
        // and translateY values, and set them (and the transition value we
        // found above) on each image.

        row.forEach((img) => {
          let imageWidth = rowHeight * img.aspectRatio;
          img.style = {
            width: parseInt(imageWidth),
            height: parseInt(rowHeight),
            transition: transition,
            transform: `translate3d(${translateX}px,${translateY}px,0)`,
          };

          // The next image is spaceBetweenImages pixels to the
          // right of this image.
          translateX += imageWidth + spaceBetweenImages;
        });

        // Reset our variables for next row.
        row = [];
        rowAspectRatio = 0;
        translateY += parseInt(rowHeight) + spaceBetweenImages;
        translateX = 0;
      }
    });

    // No space below the last image
    let totalHeight = translateY - spaceBetweenImages;
    wrapperRef.current.style.height = totalHeight + "px";
    setImages(images);
  };

  return (
    <div className="images-wrapper" ref={wrapperRef}>
      {imagesList?.map((image, imageIndex) => {
        return (
          <div className="image-wrapper" style={image.style} key={imageIndex}>
            <img src={image.src} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
