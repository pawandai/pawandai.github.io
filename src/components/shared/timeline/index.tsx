import * as React from "react";

const timelineEvents = [
  {
    time: "9:30 AM",
    title: "Breakfast",
    description: "Start the day with a healthy breakfast.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v7a5 5 0 005 5h4a5 5 0 005-5V3"
        />
      </svg>
    ),
    iconBg: "bg-blue-500",
  },
  {
    time: "10:00 AM",
    title: "Work",
    description: "Focus on important coding tasks and projects.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
    iconBg: "bg-green-500",
  },
  {
    time: "12:00 PM",
    title: "Lunch Break",
    description: "Recharge your energy with a delicious meal.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v7a5 5 0 005 5h4a5 5 0 005-5V3"
        />
      </svg>
    ),
    iconBg: "bg-yellow-500",
  },
  {
    time: "3:00 PM",
    title: "Meeting",
    description: "Discuss project progress with the team.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
    iconBg: "bg-purple-500",
  },
  {
    time: "5:00 PM",
    title: "Wrap Up",
    description: "Complete the remaining tasks and prepare for the next day.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
    iconBg: "bg-red-500",
  },
];

const TimelineItem = ({
  time,
  title,
  description,
  icon,
  iconBg,
  isLast,
}: {
  time: string;
  title: string;
  description: string;
  icon: JSX.Element;
  iconBg: string;
  isLast?: boolean;
}) => (
  <div className="flex items-start relative">
    <div className="flex flex-col items-center">
      {/* Time */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {time}
      </div>

      {/* Icon with Background */}
      <div
        className={`rounded-full p-3 ${iconBg} text-white shadow-lg relative z-10`}
      >
        {icon}
      </div>

      {/* Vertical Line */}
      {!isLast && (
        <div className="w-1 h-full bg-gray-300 dark:bg-gray-600 absolute top-10 left-1/2 transform -translate-x-1/2 z-0"></div>
      )}
    </div>

    {/* Content */}
    <div className="ml-6 mb-10">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const VerticalTimeline: React.FC = () => {
  return (
    <div className="relative flex flex-col space-y-10">
      {timelineEvents.map((event, idx) => (
        <TimelineItem
          key={idx}
          time={event.time}
          title={event.title}
          description={event.description}
          icon={event.icon}
          iconBg={event.iconBg}
          isLast={idx === timelineEvents.length - 1}
        />
      ))}
    </div>
  );
};

export default VerticalTimeline;
