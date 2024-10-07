// 위치 정보 가져오기
const getLocation = (): Promise<GeolocationPosition | null> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        console.error('Error fetching location:', error);
        reject(null);
      }
    );
  });
};

export default getLocation;