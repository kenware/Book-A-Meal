import React from 'react';
import { Player, BigPlayButton } from 'video-react';

const video = () => (
  <div className="video">
    <h3 className="p-color text-center">While waiting for today menu, you might want to watch this video </h3>
    <h5 className="text-center"> French Recipe</h5>
    <div className="video-container">
      <div className="video-wrapper">
        <Player poster="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/13b12570812444f1bc86415b6e4c5284/BFV39875_VeganLunchMealPrep_FB_FINAL_FINAL_FINAL.jpg">
          <source src="https://vid.buzzfeed.com/output/83972/landscape_720/1520642061" />
          <BigPlayButton position="center" />
        </Player>
      </div>
    </div>
  </div>
);
export default video;
