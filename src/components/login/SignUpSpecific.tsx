import styled from 'styled-components';
import { Container } from './StartPage';
import { GreetingText } from './SignUpIDPW';
import { useState } from 'react';

const regions = [
  { value: '강원', label: '강원' },
  { value: '경기', label: '경기' },
  { value: '광주', label: '광주' },
  { value: '대구', label: '대구' },
  { value: '대전', label: '대전' },
  { value: '부산', label: '부산' },
  { value: '서울', label: '서울' },
  { value: '세종', label: '세종' },
  { value: '울산', label: '울산' },
  { value: '인천', label: '인천' },
  { value: '전남', label: '전남' },
  { value: '전북', label: '전북' },
  { value: '제주', label: '제주' },
  { value: '충남', label: '충남' },
  { value: '충북', label: '충북' },
  { value: '해외', label: '해외' },
];

interface ButtonProps {
  profileImage: string | null;
  name: string;
  birthday: string;
  selectedGender: string;
  selectedRegion: string;
}

function SignUpSpecific() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setProfileImage(imageUrl);
    }
  };

  console.log(selectedRegion);

  return (
    <Container style={{ gap: '18px' }}>
      <GreetingText>환영합니다🎉</GreetingText>
      <ProfileWrapper>
        <p>프로필</p>
        <label htmlFor="profile">
          <ProfileUploadButton
            style={{ backgroundImage: `url(${profileImage})` }}
          />
        </label>
        <ProfileInput type="file" id="profile" onChange={handleImageUpload} />
      </ProfileWrapper>
      <div>
        <p>이름</p>
        <NameInput
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <BirthGenderWrapper>
        <div>
          <p>생년월일</p>
          <BirthdayInput
            placeholder="YYYY-MM-DD"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div>
          <p>성별</p>
          <GenderButton
            onClick={() => setSelectedGender('남성')}
            style={{
              background: selectedGender === '남성' ? '#d94e28' : '#efefef',
              marginRight: '18px',
            }}
          >
            남성
          </GenderButton>
          <GenderButton
            onClick={() => setSelectedGender('여성')}
            style={{
              background: selectedGender === '여성' ? '#d94e28' : '#efefef',
            }}
          >
            여성
          </GenderButton>
        </div>
      </BirthGenderWrapper>
      <div>
        <p>지역</p>
        <RegionSelect
          defaultValue=""
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: '#BFBFBF' }}
          >
            거주지역을 선택해주세요
          </option>
          {regions.map((region) => (
            <RegionOption key={region.value} value={region.value}>
              {region.label}
            </RegionOption>
          ))}
        </RegionSelect>
      </div>
      <SignUpButton
        profileImage={profileImage}
        name={name}
        birthday={birthday}
        selectedGender={selectedGender}
        selectedRegion={selectedRegion}
      >
        회원가입
      </SignUpButton>
    </Container>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileUploadButton = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: #efefef;
  cursor: pointer;
  background-size: cover;
  background-position: center;
`;
const ProfileInput = styled.input`
  display: none;
`;

const NameInput = styled.input`
  width: 340px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #949494;
  background: #fff;
  padding-left: 16px;
`;

const BirthGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 340px;
`;

const BirthdayInput = styled.input`
  width: 140px;
  height: 50px;
  padding: 0 23px;
  border: 1px solid #949494;
  border-radius: 12px;
  background: #fff;
`;

const GenderButton = styled.button`
  width: 60px;
  height: 50px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: #efefef;
`;

const RegionSelect = styled.select`
  width: 340px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #949494;
  background: #fff;
  padding-left: 16px;
`;

const RegionOption = styled.option`
  width: 340px;
  height: 150px;
  border-radius: 12px;
  border: 1px solid #949494;
  background: #fff;
`;

const SignUpButton = styled.button<ButtonProps>`
  width: 340px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 12px;
  background: ${({
    profileImage,
    name,
    birthday,
    selectedGender,
    selectedRegion,
  }) =>
    profileImage && name && birthday && selectedGender && selectedRegion
      ? '#d94e28'
      : '#dfdfdf'};
  cursor: ${({
    profileImage,
    name,
    birthday,
    selectedGender,
    selectedRegion,
  }) =>
    profileImage && name && birthday && selectedGender && selectedRegion
      ? 'pointer'
      : 'default'};
`;

export default SignUpSpecific;
