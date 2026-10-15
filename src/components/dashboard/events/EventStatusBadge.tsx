import React from "react";
import { EventStatus } from "@/types/event";

interface EventStatusBadgeProps {
  status: EventStatus;
}

export default function EventStatusBadge({ status }: EventStatusBadgeProps) {
  const getStyle = () => {
    switch (status) {
      case "UPCOMMING":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "DRAFT":
        return "bg-neutral-100 text-neutral-500 border border-neutral-200";
      case "ENDED":
        return "bg-amber-100 text-amber-700 border border-amber-200";
    }
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStyle()}`}>
        {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
