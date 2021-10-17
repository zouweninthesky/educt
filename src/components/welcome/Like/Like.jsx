import React, { useEffect, useState } from "react";
import "./Like.scss";

import Icon from "../../common/Icon/Icon";

import LikeService from "../../../api/LikeService";
import AdditionalLike from "./AdditionalLike";

const Like = () => {
  const [likesCount, setLikesCount] = useState(0);
  const [additionalLikes, setAdditionalLikes] = useState(0);

  useEffect(() => {
    async function fetchLikes() {
      const data = await LikeService.getLikes();
      setLikesCount(data.likes);
    }
    fetchLikes();
  }, []);

  const onLikePress = async (e) => {
    const data = await LikeService.addLike();
    setLikesCount(data.likes);
    if (!e.target.classList.contains("like__button--liked")) {
      e.target.classList.add("like__button--liked");
      return;
    }
    setAdditionalLikes((prev) => {
      return prev + 1;
    });
  };

  const additionalLikesElements = () => {
    let content = [];
    if (additionalLikes !== 0) {
      for (let i = 0; i < additionalLikes; i++) {
        content.push(<AdditionalLike />);
      }
    }

    return <>{content}</>;
  };

  return (
    <div className="like">
      <button
        className="like__button button button--icon-only"
        type="button"
        onClick={(e) => {
          onLikePress(e);
        }}
      >
        <Icon id="like" width="22" />
      </button>
      {additionalLikesElements()}
      <p className="like__counter">{likesCount}</p>
    </div>
  );
};

export default Like;
