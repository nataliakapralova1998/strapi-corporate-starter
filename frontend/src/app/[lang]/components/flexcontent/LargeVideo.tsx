import PageHeader from "../PageHeader";
import Container from "../atoms/Container";
import Stack from "../atoms/Stack";

interface LargeVideoProps {
  title: string;
  description: string;
  videoUrl: string;
}

const getEmbedUrl = (videoUrl: string): string | null => {
  const youtubeRegex =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?v%3D)([\w-]{11}).*/;
  const youtubeMatch = videoUrl.match(youtubeRegex);

  if (youtubeMatch && youtubeMatch[2].length === 11) {
    return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
  }

  return null;
};

export default function LargeVideo({ data }: { data: LargeVideoProps }) {
  const embedUrl = getEmbedUrl(data.videoUrl);

  if (!embedUrl) return <div>Invalid video URL</div>;

  return (
    <section className="py-12 lg:py-24">
      <Container>
        <Stack gap="gap-12"> 
        <PageHeader heading={data.title}text={data.description} />
        <div className="video-embed h-72 lg:h-[650px] overflow-hidden ">
          <iframe
            title="video"
            src={embedUrl || ""}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        </Stack>
      </Container>
    </section>
  );
}
