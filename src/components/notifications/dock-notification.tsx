"use client";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type DockNotificationProps = HTMLAttributes<HTMLDivElement> & {};
const DockNotification: FC<DockNotificationProps> = (props) => {
  const { className, ...rest } = props;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div
      className={cn("flex items-center gap-1 select-none", className)}
      {...rest}
    >
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          loop: true,
          align: "start",
        }}
        orientation="vertical"
        className="bg-background/20 backdrop-blur-lg border border-border/20 rounded-xl"
      >
        <CarouselContent className="h-16 w-full max-w-xs">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="flex gap-2 items-center p-2">
                <Image
                  src="/assets/icons/icon-dribbble.png"
                  width={35}
                  height={35}
                  alt="icon-app-store"
                />
                <div className="flex flex-col text-xs font-semibold pr-2">
                  <h5>Reza Moradi</h5>
                  <p className="font-medium text-foreground/70">
                    Nicely done, keep designing
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <span
            key={index}
            className={cn("w-1 h-1 bg-background/30 shrink-0 rounded-full", {
              "bg-background": index === current,
            })}
          />
        ))}
      </div>
    </div>
  );
};
export default DockNotification;
