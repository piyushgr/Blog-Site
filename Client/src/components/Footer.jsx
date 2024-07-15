import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg
       sm:text-xl font-semibold dark:text-white"
            >
              <span className="text-slate-300">Khabari</span>
            </Link>
          </div>
          <div
            className="grid grid-cols-2 gap-8 mt-4  sm:grid-cols-3
          sm:gap-6"
          >
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/piyushgr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Projects
                </Footer.Link>
                <Footer.Link
                  href="https://twitter.com/gaur_piy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Twitter)
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Get Connected" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/piyush-gaur-ab7449217/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="https://www.instagram.com/gaur.piy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Khabari"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-5 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://github.com/piyushgr"
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://twitter.com/gaur_piy"
              target="_blank"
              icon={BsTwitterX}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/piyush-gaur-ab7449217/"
              target="_blank"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://www.instagram.com/gaur.piy"
              target="_blank"
              icon={BsInstagram}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
