import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ArrowUp,
  Plus,
  ArrowUpDown,
  LayoutGrid,
  Ellipsis,
  Search,
  Clock,
  Star,
  Monitor,
  Music,
  Video,
  Images,
  FileText,
  Wifi,
} from "lucide-react";
import { HTMLAttributes, FC, memo } from "react";
import Image from "next/image";

type FileManagerApplicationProps = HTMLAttributes<HTMLDivElement> & {};
const FileManagerApplication: FC<FileManagerApplicationProps> = memo(() => {
  return (
    <div className="backdrop-blur-md bg-background/80 size-full overflow-auto scrollbar-thin">
      <div className="flex flex-col size-full">
        <div className="h-12 inline-flex gap-1">
          <div className="inline-flex rounded-lg text-muted-foreground my-2 mx-2">
            <span className="border py-[6px] px-3 rounded-l-lg text-muted-foreground/40">
              <ArrowLeft className="size-4" />
            </span>
            <span className="border border-l-0 py-[6px] px-3 rounded-r-lg bg-background">
              <ArrowRight className="size-4" />
            </span>
          </div>
          <span className="my-3 mx-2">
            <ChevronDown className="size-4" />
          </span>
          <span className="my-3 mx-2">
            <ArrowUp className="size-4" />
          </span>
          <div className="relative my-2 mx-1">
            <div className="h-full rounded border text-sm px-4 min-w-72 bg-background/60 py-1 font-medium">
              Downloads
            </div>
            <span className="absolute top-2 border-l right-0 px-2">
              <ChevronDown className="size-4 text-foreground/40" />
            </span>
          </div>
          <span className="inline-flex my-2 mx-1 bg-background/30 rounded-lg">
            <span className="px-2 py-[6px] border border-r-0 rounded-l-lg">
              <Plus className="size-4" />
            </span>
            <span className="inline-flex px-4 py-[6px] border border-x-0 text-xs gap-2 font-medium">
              <ArrowUpDown className="size-4" />
              Sort
            </span>
            <span className="inline-flex text-xs gap-2 py-[6px] px-4 border rounded-r-lg font-medium">
              <LayoutGrid className="size-4" />
              View
            </span>
          </span>
          <span className="my-2 mx-1 p-2 bg-background/40 border rounded-lg">
            <Ellipsis className="size-4" />
          </span>
          <span className="inline-flex items-center gap-2 bg-background my-2 w-full mr-2 rounded border text-sm p-1 px-2 text-muted-foreground">
            <Search className="size-4" />
            Search
          </span>
        </div>
        <div className="flex-1 flex">
          <div className="w-52">
            <div className="space-y-4 mt-2">
              <div className="text-sm font-medium w-full pl-4 pr-2">
                <span className="text-xs text-muted-foreground">
                  Explore Files
                </span>
                <ul className="[&_li]:py-2 [&_li]:px-4 [&_li]:rounded-lg mt-2 text-foreground/50 [&_li]:w-full">
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground group">
                    <Clock className="size-4" />
                    Recent
                  </li>
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground">
                    <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
                    Starred
                  </li>
                </ul>
              </div>
              <div className="text-sm font-medium w-full pl-4 pr-2">
                <span className="text-xs text-muted-foreground">Favorites</span>
                <ul className="[&_li]:py-2 [&_li]:px-4 [&_li]:rounded-lg mt-2 text-foreground/50 [&_li]:w-full">
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground group">
                    <Monitor className="size-4" />
                    Computer
                  </li>
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground">
                    <Music className="size-4 " />
                    Music
                  </li>
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground group">
                    <Video className="size-4" />
                    Video
                  </li>
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground group">
                    <Images className="size-4" />
                    Pictures
                  </li>
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground group">
                    <FileText className="size-4" />
                    Documents
                  </li>
                  <li className="inline-flex items-center gap-2 hover:bg-background hover:text-foreground group">
                    <Wifi className="size-4" />
                    Shared file
                  </li>
                </ul>
              </div>
              <div className="text-sm font-medium w-full pl-4 pr-2">
                <span className="text-xs text-muted-foreground">Storage</span>
                <ul className="mt-2 text-muted-foreground">
                  <li className="inline-flex px-2 py-3 rounded-lg w-full gap-2 items-center">
                    <Image
                      src="/assets/images/img-macbook.png"
                      alt="device-computer"
                      width={40}
                      height={40}
                    />
                    <div className="w-full flex flex-col gap-1">
                      Computer
                      <div className="h-1 w-full bg-muted rounded-full">
                        <div className="h-full w-1/3 bg-green-500"></div>
                      </div>
                    </div>
                  </li>
                  <li className="inline-flex px-2 py-3 rounded-lg w-full gap-2 items-center">
                    <Image
                      src="/assets/images/img-dropbox.png"
                      alt="device-dropbox"
                      width={40}
                      height={40}
                    />
                    <div className="w-full flex flex-col gap-1">
                      Dropbox
                      <div className="h-1 w-full bg-muted rounded-full">
                        <div className="h-full w-1/2 bg-yellow-500"></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background/40 backdrop-blur-md rounded-tl-lg p-2">
            <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-2">
              <div className="text-center text-sm text-muted-foreground">
                <Image
                  src="/assets/images/img-macos-directory.png"
                  alt="directory"
                  width={400}
                  height={400}
                />
                <span>Favorites</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
FileManagerApplication.displayName = "FileManagerApplication";
export default FileManagerApplication;
