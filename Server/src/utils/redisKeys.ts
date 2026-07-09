export const redisKey = {
  eventKey : "EVENT:ALL",
  almanacKey : "ALMANAC:ALL",
  homepageElementKey : "HOMEPAGE:ALL",
  blogKey : "BLOG:ALL",
  volleyballKey : "VOLLEYBALL:ALL",
  basketballKey : "BASKETBALL:ALL",
  cricketKey : "CRICKET:ALL",
  footballKey : "FOOTBALL:ALL",
  userInfoKey : (email : string) => `USER:${email}`,
  blogByIdKey : (id : string) => `BLOG:${id}`,
}