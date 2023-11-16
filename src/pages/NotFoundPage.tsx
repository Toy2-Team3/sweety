import NotValidPage from "../components/common/NotValidPage";

export default function NotFoundPage() {
  return (
    <NotValidPage 
      content="페이지를 찾을 수 없습니다 🥲"
      navigaton="메인 페이지로 돌아가기"
    />
  );
}
