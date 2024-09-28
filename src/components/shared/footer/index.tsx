import { Separator } from "@/components/ui/separator";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { MapPin, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="mailto:contactpawandai@gmail.com"
                className="hover:text-blue-600 transition"
              >
                contactpawandai@gmail.com
              </Link>
            </li>
            <li>
              <a
                href="tel:+9779866107599"
                className="hover:text-blue-600 transition"
              >
                +9779866107599
              </a>
            </li>
            <li>
              <p className="flex gap-2 items-center">
                <MapPin className="h-4 w-4" /> Nepal
              </p>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/projects" className="hover:text-blue-600 transition">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/resume.pdf"
                target="_blank"
                download="Pawan_Awasthi_resume"
                className="hover:text-blue-600 transition"
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                <TwitterLogoIcon className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                <LinkedInLogoIcon className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                <GitHubLogoIcon className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                href="https://youtube.com/@pawandai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4 text-center">
        <Separator className="mb-8" />
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Pawan Awasthi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
