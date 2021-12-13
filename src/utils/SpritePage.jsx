import React from "react";
import Icon from "../components/common/Icon/Icon";
import "./SpritePage.scss";

import Store from "../store";

const SpritePage = () => {
  Store.loadingFinished();

  return (
    <main>
      <div className="container sprite">
        <div>
          <p>accept</p>
          <Icon id="accept" width="40" />
        </div>
        <div>
          <p>action</p>
          <Icon id="action" width="40" />
        </div>
        <div>
          <p>angle-down</p>
          <Icon id="angle-down" width="40" />
        </div>
        <div>
          <p>angle-left</p>
          <Icon id="angle-left" width="40" />
        </div>
        <div>
          <p>angle-right</p>
          <Icon id="angle-right" width="40" />
        </div>
        <div>
          <p>angle-up</p>
          <Icon id="angle-up" width="40" />
        </div>
        <div>
          <p>apps</p>
          <Icon id="apps" width="40" />
        </div>
        <div>
          <p>arrow-left</p>
          <Icon id="arrow-left" width="40" />
        </div>
        <div>
          <p>arrow-down</p>
          <Icon id="arrow-down" width="40" />
        </div>
        <div>
          <p>cancel</p>
          <Icon id="cancel" width="40" />
        </div>
        <div>
          <p>comment-new</p>
          <Icon id="comment-new" width="40" />
        </div>
        <div>
          <p>device</p>
          <Icon id="device" width="40" />
        </div>
        <div>
          <p>focus</p>
          <Icon id="focus" width="40" />
        </div>
        <div>
          <p>focus-finish</p>
          <Icon id="focus-finish" width="40" />
        </div>
        <div>
          <p>graduation</p>
          <Icon id="graduation" width="40" />
        </div>
        <div>
          <p>graph-bar</p>
          <Icon id="graph-bar" width="40" />
        </div>
        <div>
          <p>image</p>
          <Icon id="image" width="40" />
        </div>
        <div>
          <p>info</p>
          <Icon id="info" width="40" />
        </div>
        <div>
          <p>like</p>
          <Icon id="like" width="40" />
        </div>
        <div>
          <p>like-clicked</p>
          <Icon id="like-clicked" width="40" />
        </div>
        <div>
          <p>layer-group</p>
          <Icon id="layer-group" width="40" />
        </div>
        <div>
          <p>microphone</p>
          <Icon id="microphone" width="40" />
        </div>
        <div>
          <p>mouse</p>
          <Icon id="mouse" width="40" />
        </div>
        <div>
          <p>mouse-left</p>
          <Icon id="mouse-left" width="40" />
        </div>
        <div>
          <p>mouse-right</p>
          <Icon id="mouse-right" width="40" />
        </div>
        <div>
          <p>play</p>
          <Icon id="play" width="40" />
        </div>
        <div>
          <p>puzzle-piece</p>
          <Icon id="puzzle-piece" width="40" />
        </div>
        <div>
          <p>save</p>
          <Icon id="save" width="40" />
        </div>
        <div>
          <p>smile</p>
          <Icon id="smile" width="40" />
        </div>
        <div>
          <p>sort-amount-down</p>
          <Icon id="sort-amount-down" width="40" />
        </div>
        <div>
          <p>sort-amount-up</p>
          <Icon id="sort-amount-up" width="40" />
        </div>
        <div>
          <p>text</p>
          <Icon id="text" width="40" />
        </div>
        <div>
          <p>trash</p>
          <Icon id="trash" width="40" />
        </div>
        <div>
          <p>volume</p>
          <Icon id="volume" width="40" />
        </div>
        <div>
          <p>volume-off</p>
          <Icon id="volume-off" width="40" />
        </div>
        <div>
          <p>volume-up</p>
          <Icon id="volume-up" width="40" />
        </div>
        <div>
          <p>warning</p>
          <Icon id="warning" width="40" />
        </div>
        <div>
          <p>undo</p>
          <Icon id="undo" width="40" />
        </div>
        <div>
          <p>zoom</p>
          <Icon id="zoom" width="40" />
        </div>
        <div>
          <p>main-logo</p>
          <Icon id="main-logo" width="322" height="74" />
        </div>
      </div>
    </main>
  );
};

export default SpritePage;
