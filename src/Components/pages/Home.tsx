import Slider from "../organisms/Slider";
import MainPage from "../organisms/MainPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainPage />
      <Slider index={1} />
      <Slider index={2} />
      <Slider index={3} />
    </>
  );
}
