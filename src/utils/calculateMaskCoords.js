const calculateTopLeft = (firstPoint = { x: 0, y: 0 }, secondPoint = { x: 0, y: 0 }) => {
  const topLeft = { ...firstPoint };
  if (firstPoint.x >= secondPoint.x) topLeft.x = secondPoint.x;
  if (firstPoint.y >= secondPoint.y) topLeft.y = secondPoint.y;
  return topLeft;
};

const calculateBottomRight = (firstPoint = { x: 0, y: 0 }, secondPoint = { x: 0, y: 0 }) => {
  const bottomRight = { ...secondPoint };
  if (secondPoint.x <= firstPoint.x) bottomRight.x = firstPoint.x;
  if (secondPoint.y <= firstPoint.y) bottomRight.y = firstPoint.y;
  return bottomRight;
};

const calculateWidth = (firstPoint = { x: 0, y: 0 }, secondPoint = { x: 0, y: 0 }) => {
  return Math.abs(firstPoint.x - secondPoint.x);
};

const calculateHeight = (firstPoint = { x: 0, y: 0 }, secondPoint = { x: 0, y: 0 }) => {
  return Math.abs(firstPoint.y - secondPoint.y);
};

export { calculateTopLeft, calculateBottomRight, calculateWidth, calculateHeight };
