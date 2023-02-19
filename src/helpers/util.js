export const friendlyDate = (dateStr) => {
  let dateObj = typeof dateStr === "object" ? dateStr : new Date(dateStr);
  let space = Date.now() - dateObj.getTime();
  let str = "";

  const map = {
    min: 60 * 1000,
    hours: 60 * 60 * 1000,
    day: 24 * 3600 * 1000,
  };

  switch (true) {
    case space < map["min"]:
      str = "刚刚";
      break;
    case space < map["hours"]:
      str = Math.floor(space / map["min"]) + "分钟前";
      break;
    case space < map["day"]:
      str = Math.floor(space / map["hours"]) + "小时前";
      break;
    default:
      str = Math.floor(space / map["day"]) + "天前";
  }
  return str;
};
