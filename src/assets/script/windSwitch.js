function windSwitch (windd) {
  const typeArr=['北风','东北风','东风','东南风','南风','西南风','西风','西北风','北风'];
  return typeArr[Math.round(windd/45)];
};

export default windSwitch;