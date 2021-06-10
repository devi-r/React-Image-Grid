import React from "react";
import ImageGrid from "../imageGrid/ImageGrid";
const imagesSrc = [
  "https://st2.depositphotos.com/1064024/10769/i/600/depositphotos_107694484-stock-photo-little-boy.jpg",
  "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=6&m=1057506940&s=612x612&w=0&h=C11yA-ESqeuCX63QkRpPyWmAMXJJvZw0niQluGnATlI=",
  "https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg",
  "https://p0.pikist.com/photos/263/999/flowers-nature-blossom-butterfly-natural-spring.jpg",
  "https://i2.wp.com/www.oakridge.in/wp-content/uploads/2020/02/Sample-jpg-image-500kb.jpg",
  "https://www.thesun.co.uk/wp-content/uploads/2020/08/NINTCHDBPICT000600110174.jpg",
  "https://blog.hubspot.com/hubfs/image-file-extensions.jpg",
  "https://i.redd.it/574k4p2vojw51.png",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
  "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?",
  "https://live.staticflickr.com/273/31369387370_89fbc7ca11_b.jpg",
  "https://i.pinimg.com/originals/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://promo.com/tools/image-resizer/static/Pattern_image-8c050053eab884e51b8599607865d112.jpg",
  "https://www.thebraudisgroup.com/wp-content/uploads/2019/12/dawid-zawila-unsplash-scaled.jpg",
  "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
  "https://www.nature.com/immersive/d41586-021-00095-y/assets/3TP4N718ac/2021-01-xx_jan-iom_tree-of-life_sh-1080x1440.jpeg",
  "https://newevolutiondesigns.com/images/freebies/city-wallpaper-37.jpg",
  "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg",
];

const settings = {
  spaceBetweenImages: 2,
  transitionSpeed: 500,
};

const App = () => {
  return (
    <div className="app-wrapper">
      <ImageGrid imagesSrc={imagesSrc} {...settings} />
    </div>
  );
};

export default App;
