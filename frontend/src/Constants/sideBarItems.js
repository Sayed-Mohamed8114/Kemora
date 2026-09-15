import {
  RiDashboard3Fill,
  RiTeamFill,
  RiMapPin2Fill,
  RiMessage3Fill,
  RiBriefcase4Fill,
  RiTicket2Fill,
} from "react-icons/ri";

export const adminSidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard/admin",
    icon: RiDashboard3Fill,
  },
  {
    label: "Staff Management",
    path: "/dashboard/staff",
    icon: RiTeamFill,
  },
  {
    label: "Tours Management",
    path: "dashboard/tours",
    icon: RiMapPin2Fill,
  },
  {
    label: "Customer Inquiries",
    path: "dashboard/inquiries",
    icon: RiMessage3Fill,
  },
];

export const staffSidebarItems = [
  {
    label: "Tours",
    path: "/staff/tours",
    icon: RiMapPin2Fill,
  },
  {
    label: "Tours by Me",
    path: "/staff/my-tours",
    icon: RiBriefcase4Fill,
  },
  {
    label: "Customer Inquiries",
    path: "/staff/inquiries",
    icon: RiMessage3Fill,
  },
];

export const userSidebarItems = [
  {
    label: "Tours",
    path: "/tours",
    icon: RiMapPin2Fill,
  },
  {
    label: "My Tours",
    path: "/my-tours",
    icon: RiTicket2Fill,
  },
  {
    label: "Make Inquiry",
    path: "/inquiry",
    icon: RiMessage3Fill,
  },
];

export const sidebarByRoles = {
  super_admin: adminSidebarItems,
  staff: staffSidebarItems,
  customer: userSidebarItems,
};