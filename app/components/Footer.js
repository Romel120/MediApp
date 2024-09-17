// app/Footer.jsx

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-background py-8 px-4 mt-12 border-t-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary mb-4">MediApp</h3>
            <p className="text-text mb-4">
              Your trusted partner for finding doctors and managing health appointments.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://facebook.com">
                  <FaFacebook className="h-6 w-6 text-text hover:text-primary transition-colors duration-300" />
                
              </Link>
              <Link href="https://twitter.com">
                  <FaTwitter className="h-6 w-6 text-text hover:text-primary transition-colors duration-300" />
                
              </Link>
              <Link href="https://linkedin.com">
                  <FaLinkedin className="h-6 w-6 text-text hover:text-primary transition-colors duration-300" />
                
              </Link>
              <Link href="https://instagram.com">
                  <FaInstagram className="h-6 w-6 text-text hover:text-primary transition-colors duration-300" />
                
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li className="text-text hover:text-primary transition-colors duration-300">
                <Link href="/find-doctors">
                 Find Doctors
                </Link>
              </li>
              <li className="text-text hover:text-primary transition-colors duration-300">
                <Link href="/book-appointment">
                 Book Appointment
                </Link>
              </li>
              <li className="text-text hover:text-primary transition-colors duration-300">
                <Link href="/faq">
                 FAQ
                </Link>
              </li>
              <li className="text-text hover:text-primary transition-colors duration-300">
                <Link href="/about-us">
                 About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center">
          <p className="text-text text-sm">&copy; {new Date().getFullYear()} MediApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
