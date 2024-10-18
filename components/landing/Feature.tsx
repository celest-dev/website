import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export type FeatureProps = {
  features: Feature[];
};

export type Feature = {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
};

export function Feature(feature: Feature) {
  return (
    <Card className="feature">
      <CardHeader className="text-center">
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="p-4">{feature.children}</div>
      </CardContent>
    </Card>
  );
}

export function FeatureSet({
  children,
  ...props
}: React.ComponentProps<typeof Carousel>) {
  const [api, setApi] = useState<CarouselApi>();

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  const features = Array.from(children as Iterable<React.ReactNode>);
  return (
    <>
      <div className="sm:hidden block">
        {features.map((feature, index) => (
          <div key={index}>
            {feature}
            {index < features.length - 1 && <hr className="my-6" />}
          </div>
        ))}
      </div>
      <Carousel
        {...props}
        className="sm:block hidden -mt-6"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem
              className="flex flex-col items-center justify-center"
              key={index}
            >
              {feature}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex flex-row items-center justify-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-4 h-4 rounded-full mx-2 ${
                index === selectedIndex
                  ? "dark:bg-white bg-black"
                  : "bg-gray-300/60"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </>
  );
}

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: CarouselApi | undefined,
  onButtonClick?: (emblaApi: CarouselApi) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: CarouselApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
