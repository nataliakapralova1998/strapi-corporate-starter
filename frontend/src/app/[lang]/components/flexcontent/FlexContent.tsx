import Hero from "./Hero";
import AvatarHero from "./AvatarHero";
import TestimonialsGroup from "./TestimonialsGroup";
import LargeVideo from "./LargeVideo";
import Pricing from "./Pricing";
import LeadForm from "./LeadForm";
import Features from "./Features";
import TextImage from "./TextImage";
import RichText from "./RichText";
import Slider from "./Slider";
import Image from "./Image";

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface ButtonValues {
  id: string;
  text: string;
  type: string;
  url: string;
  newTab: boolean;
}

interface Section {
  __component: string;
  id: string;
  title: string;
  description: string;
  picture?: Picture;
  avatar?: Picture;
  buttons?: ButtonValues[];
  [key: string]: any;
}

interface FlexContentProps {
  sections: Section[];
}

const componentMap = {
  "sections.hero": Hero,
  "sections.avatar-hero": AvatarHero,
  "sections.testimonials-group": TestimonialsGroup,
  "sections.large-video": LargeVideo,
  "sections.pricing": Pricing,
  "sections.lead-form": LeadForm,
  "sections.features": Features,
  "sections.text-image": TextImage,
  "shared.rich-text": RichText,
  "shared.slider": Slider,
  "shared.image": Image,
} as const;

type ComponentKey = keyof typeof componentMap;

export default function FlexContent({ sections }: FlexContentProps) {
  console.log(sections, 'hoiiii');
  return (
    <>
      {sections.map((section, index) => {
        const Component = componentMap[section.__component as ComponentKey];
        
        if (!Component) {
          return null;
        }

        return <Component key={index} data={section as any} />;
      })}
    </>
  );
} 