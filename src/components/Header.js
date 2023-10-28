import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import koLocale from 'date-fns/locale/ko';
import { useState, useEffect } from 'react';

const Header = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    // 한국의 타임존은 'Asia/Seoul' 입니다.
    let koreaTimeZone = 'Asia/Seoul';

    const onChangeTime = () => {
      // 현재 UTC 시간을 가져옵니다.
      let nowUtc = new Date();

      // UTC 시간을 한국 로컬 시간으로 변환합니다.
      let nowKoreaTime = utcToZonedTime(nowUtc, koreaTimeZone);

      // 변환된 한국 로컬 시간을 원하는 형식으로 포맷팅합니다.
      let formattedKoreaTime = format(nowKoreaTime, 'yyyy년 M월 d일 (E) a hh시 mm분 ss초', { locale: koLocale });

      setTime(formattedKoreaTime);
    };

    onChangeTime(); // 컴포넌트가 마운트 될 때 현재시각으로 초기화

    // 1000ms(=1s)마다 onChangeTime 함수가 실행됩니다.
    const intervalId = setInterval(onChangeTime, 1000);

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트 될 때 인터벌 제거
  }, []);

  return (
    <div>
      <h4>Today is 📆</h4>
      <h2 style={{ color: 'brown' }}>{time}</h2>
    </div>
  );
};

export default Header;

