import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SimpleLandingPage } from "./pages/SimpleLandingPage";
import { MobileEntryPage } from "./pages/MobileEntryPage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { TroubleshootPage } from "./pages/TroubleshootPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { OTPVerificationPage } from "./pages/OTPVerificationPage";
import { VerificationPage } from "./pages/VerificationPage";
import { ProfileCreationPage } from "./pages/ProfileCreationPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { CallPage } from "./pages/CallPage";
import { CallSummaryPage } from "./pages/CallSummaryPage";
import { ChatPage } from "./pages/ChatPage";
import { RewardsPage } from "./pages/RewardsPage";
import { CoinsPage } from "./pages/CoinsPage";
import { QRCodePage } from "./pages/QRCodePage";
import { SharePage } from "./pages/SharePage";
import { BrowsePage } from "./pages/BrowsePage";
import { BrowsePageEnhanced } from "./pages/BrowsePageEnhanced";
import { MobileTestPage } from "./pages/MobileTestPage";
import { DiagnosticPage } from "./pages/DiagnosticPage";
import { ProfileCardsPage } from "./pages/ProfileCardsPage";
import { GamesPage } from "./pages/GamesPage";
import { GameRoomPage } from "./pages/GameRoomPage";
import { EventsPage } from "./pages/EventsPage";
import { CallHistoryPage } from "./pages/CallHistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: EmergencyPage,
  },
  {
    path: "/mobile",
    Component: MobileEntryPage,
  },
  {
    path: "/simple",
    Component: SimpleLandingPage,
  },
  {
    path: "/full",
    Component: LandingPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/verify-otp",
    Component: OTPVerificationPage,
  },
  {
    path: "/verify",
    Component: VerificationPage,
  },
  {
    path: "/complete-profile",
    Component: ProfileCreationPage,
  },
  {
    path: "/create-profile",
    Component: ProfileCreationPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/leaderboard",
    Component: LeaderboardPage,
  },
  {
    path: "/browse",
    Component: BrowsePageEnhanced,
  },
  {
    path: "/browse-grid",
    Component: BrowsePage,
  },
  {
    path: "/swipe",
    Component: ProfileCardsPage,
  },
  {
    path: "/games",
    Component: GamesPage,
  },
  {
    path: "/game-room",
    Component: GameRoomPage,
  },
  {
    path: "/events",
    Component: EventsPage,
  },
  {
    path: "/call-history",
    Component: CallHistoryPage,
  },
  {
    path: "/call",
    Component: CallPage,
  },
  {
    path: "/call-summary",
    Component: CallSummaryPage,
  },
  {
    path: "/chat",
    Component: ChatPage,
  },
  {
    path: "/rewards",
    Component: RewardsPage,
  },
  {
    path: "/coins",
    Component: CoinsPage,
  },
  {
    path: "/qr",
    Component: QRCodePage,
  },
  {
    path: "/share",
    Component: SharePage,
  },
  {
    path: "/test",
    Component: MobileTestPage,
  },
  {
    path: "/diagnostic",
    Component: DiagnosticPage,
  },
  {
    path: "/troubleshoot",
    Component: TroubleshootPage,
  },
]);
