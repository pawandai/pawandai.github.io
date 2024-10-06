import { buttonVariants } from "@/components/ui/button";
import { socials } from "@/constants";
import Link from "next/link";

const Socials = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex flex-wrap md:flex-nowrap gap-2`}>
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.link}
          className={`${buttonVariants({
            variant: "outline",
          })} dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700`}
        >
          <social.icon className="w-5 h-5 mr-2 dark:text-white" />
          {social.title}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
