"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("relative border-l border-zinc-200 ml-3", className)} {...props} />
));
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("mb-10 ml-6", className)} {...props} />
));
TimelineItem.displayName = "TimelineItem";

const TimelinePoint = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-zinc-200", className)} {...props} />
));
TimelinePoint.displayName = "TimelinePoint";

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
TimelineContent.displayName = "TimelineContent";

const TimelineTime = React.forwardRef<HTMLTimeElement, React.TimeHTMLAttributes<HTMLTimeElement>>(({ className, ...props }, ref) => (
  <time ref={ref} className={cn("mb-1 text-sm font-normal leading-none text-zinc-400 dark:text-zinc-500", className)} {...props} />
));
TimelineTime.displayName = "TimelineTime";

const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold text-zinc-900", className)} {...props} />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineBody = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("mb-4 text-base font-normal text-zinc-500", className)} {...props} />
));
TimelineBody.displayName = "TimelineBody";

export { Timeline, TimelineItem, TimelinePoint, TimelineContent, TimelineTime, TimelineTitle, TimelineBody };
