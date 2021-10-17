import React, { useState, useEffect } from "react";

import Icon from "../../common/Icon/Icon";

const AdditionalLike = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 600);
  }, []);

  return visible ? (
    <div className="like__additional" id={`#el-22`}>
      <Icon id="like-clicked" width="22" />
    </div>
  ) : (
    <></>
  );
};

export default AdditionalLike;
