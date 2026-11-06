import {
  ArrowLeft,
  ArrowRight as ArrowRightBase,
  ArrowUp as ArrowUpBase,
  Bell as BellIcon,
  Brain,
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  ChatBubble,
  CheckCircle as CheckCircleIcon,
  Check as CheckIcon,
  Code as CodeIcon,
  Compass as CompassIcon,
  Copy as CopyIcon,
  Discord as DiscordIcon,
  Dollar,
  Download as DownloadIcon,
  Cloud,
  FilterAlt,
  Flash,
  Github as GithubIcon,
  GitFork as GitForkIcon,
  Globe as GlobeIcon,
  Group,
  Heart as HeartIcon,
  HelpCircle as HelpCircleIcon,
  Home as HomeIcon,
  InfoCircle,
  Instagram,
  Laptop,
  Linkedin as LinkedinIcon,
  List as ListIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
  Medal,
  Menu as MenuIcon,
  Message,
  HalfMoon,
  NavArrowDown,
  NavArrowRight,
  JournalPage,
  OpenBook,
  Pause as PauseIcon,
  Page,
  Pin,
  Phone as PhoneIcon,
  Play as PlayIcon,
  Plus as PlusIcon,
  Refresh,
  Rocket as RocketIcon,
  Search as SearchIcon,
  Send as SendIcon,
  Settings as SettingsIcon,
  ShareAndroid,
  ShieldAlert,
  Shield,
  Star as StarIcon,
  SunLight,
  Terminal as TerminalIcon,
  Timer,
  Trash,
  Twitter as TwitterIcon,
  User as UserIcon,
  ViewGrid,
  Whatsapp as WhatsappIcon,
  Link as LinkIcon,
  Xmark,
  Youtube as YoutubeIcon,
} from "iconoir-react";
import type { ComponentProps, ComponentType } from "react";

type IconProps = ComponentProps<"svg"> & { size?: number | string };

function withSize(Icon: ComponentType<ComponentProps<"svg">>) {
  return function SizedIcon({ size, width, height, ...props }: IconProps) {
    return <Icon width={width ?? size} height={height ?? size} {...props} />;
  };
}

export const ArrowUpIcon = withSize(ArrowUpBase);
export const ArrowRightIcon = withSize(ArrowRightBase);
export const ArrowLeftIcon = withSize(ArrowLeft);
export const Bell = withSize(BellIcon);
export const BrainIcon = withSize(Brain);
export const ShieldIcon = withSize(Shield);
export const LaptopIcon = withSize(Laptop);
export const CloudIcon = withSize(Cloud);
export const Bookmark = withSize(BookmarkIcon);
export const Calendar = withSize(CalendarIcon);
export const MessageSquare = withSize(ChatBubble);
export const CheckCircle = withSize(CheckCircleIcon);
export const Check = withSize(CheckIcon);
export const Code = withSize(CodeIcon);
export const Compass = withSize(CompassIcon);
export const Copy = withSize(CopyIcon);
export const Discord = withSize(DiscordIcon);
export const DollarSign = withSize(Dollar);
export const Download = withSize(DownloadIcon);
export const ExternalLink = withSize(LinkIcon);
export const FileText = withSize(Page);
export const Github = withSize(GithubIcon);
export const GitFork = withSize(GitForkIcon);
export const Globe = withSize(GlobeIcon);
export const Heart = withSize(HeartIcon);
export const HelpCircle = withSize(HelpCircleIcon);
export const Home = withSize(HomeIcon);
export const Info = withSize(InfoCircle);
export const Linkedin = withSize(LinkedinIcon);
export const List = withSize(ListIcon);
export const Mail = withSize(MailIcon);
export const Phone = withSize(PhoneIcon);
export const MapPin = withSize(MapPinIcon);
export const Menu = withSize(MenuIcon);
export const Moon = withSize(HalfMoon);
export const Play = withSize(PlayIcon);
export const Pause = withSize(PauseIcon);
export const Plus = withSize(PlusIcon);
export const Rocket = withSize(RocketIcon);
export const Search = withSize(SearchIcon);
export const Send = withSize(SendIcon);
export const Settings = withSize(SettingsIcon);
export const Share2 = withSize(ShareAndroid);
export const AlertCircle = withSize(ShieldAlert);
export const Star = withSize(StarIcon);
export const Sun = withSize(SunLight);
export const Terminal = withSize(TerminalIcon);
export const Trash2 = withSize(Trash);
export const Twitter = withSize(TwitterIcon);
export const User = withSize(UserIcon);
export const Grid = withSize(ViewGrid);
export const ChevronDown = withSize(NavArrowDown);
export const ChevronRight = withSize(NavArrowRight);
export const X = withSize(Xmark);
export const Youtube = withSize(YoutubeIcon);
export const Whatsapp = withSize(WhatsappIcon);
export const InstagramIcon = withSize(Instagram);
export const MessageIcon = withSize(Message);
export const ArrowUp = ArrowUpIcon;
export const ArrowRight = ArrowRightIcon;
export const Loader = withSize(Refresh);
export const RotateCcw = withSize(Refresh);
export const Sliders = withSize(FilterAlt);
export const Award = withSize(Medal);
export const Target = withSize(Pin);
export const Users = withSize(Group);
export const Newspaper = withSize(JournalPage);
export const BookOpen = withSize(OpenBook);
export const Zap = withSize(Flash);
export const Clock = withSize(Timer);
export const Share = Share2;

export type ResourceIconName = "map" | "tools" | "palette" | "clipboard" | "target" | "box";

const resourceIcons = {
  map: MapPinIcon,
  tools: SettingsIcon,
  palette: StarIcon,
  clipboard: Page,
  target: Pin,
  box: ViewGrid,
} satisfies Record<ResourceIconName, ComponentType<ComponentProps<"svg">>>;

export function ResourceIcon({ name, size, width, height, ...props }: IconProps & { name: ResourceIconName }) {
  const Icon = resourceIcons[name];
  return <Icon width={width ?? size} height={height ?? size} {...props} />;
}
