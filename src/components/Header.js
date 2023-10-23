import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import koLocale from 'date-fns/locale/ko';

// 현재 UTC 시간을 가져옵니다.
let nowUtc = new Date();

// 한국의 타임존은 'Asia/Seoul' 입니다.
let koreaTimeZone = 'Asia/Seoul';

// UTC 시간을 한국 로컬 시간으로 변환합니다.
let nowKoreaTime = utcToZonedTime(nowUtc, koreaTimeZone);

// 변환된 한국 로컬 시간을 원하는 형식으로 포맷팅합니다.
let formattedKoreaTime = format(nowKoreaTime, "yyyy년 M월 d일 (E)", {locale: koLocale});

console.log(formattedKoreaTime);

const Header = () => {
  return (
    <div>
      <h4>Today is 📆</h4>
      <h2 style={{color: 'brown'}}>{formattedKoreaTime}</h2>
    </div>
  );
};

export default Header;
