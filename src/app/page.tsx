import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import PageContent from "@/components/PageContent";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <PageContent />
    </>
  );
}