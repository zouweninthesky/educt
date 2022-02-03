const calculateTopLeft = (
  firstPoint = { x: 0, y: 0 },
  secondPoint = { x: 0, y: 0 },
  shrinkRatio = 1
) => {
  const topLeft = { ...firstPoint };
  if (firstPoint.x >= secondPoint.x) topLeft.x = secondPoint.x;
  if (firstPoint.y >= secondPoint.y) topLeft.y = secondPoint.y;
  topLeft.x *= shrinkRatio;
  topLeft.y *= shrinkRatio;
  return topLeft;
};

const calculateBottomRight = (
  firstPoint = { x: 0, y: 0 },
  secondPoint = { x: 0, y: 0 },
  shrinkRatio = 1
) => {
  const bottomRight = { ...secondPoint };
  if (secondPoint.x <= firstPoint.x) bottomRight.x = firstPoint.x;
  if (secondPoint.y <= firstPoint.y) bottomRight.y = firstPoint.y;
  bottomRight.x *= shrinkRatio;
  bottomRight.y *= shrinkRatio;
  return bottomRight;
};

const calculateWidth = (
  firstPoint = { x: 0, y: 0 },
  secondPoint = { x: 0, y: 0 },
  shrinkRatio = 1
) => {
  return Math.abs(firstPoint.x - secondPoint.x) * shrinkRatio;
};

const calculateHeight = (
  firstPoint = { x: 0, y: 0 },
  secondPoint = { x: 0, y: 0 },
  shrinkRatio = 1
) => {
  return Math.abs(firstPoint.y - secondPoint.y) * shrinkRatio;
};

export {
  calculateTopLeft,
  calculateBottomRight,
  calculateWidth,
  calculateHeight,
};
