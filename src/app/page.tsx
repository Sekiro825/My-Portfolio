import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import PageContent from "@/components/PageContent";
import SiteAvatar from "@/components/SiteAvatar";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <PageContent />
      <SiteAvatar />
    </>
  );
}