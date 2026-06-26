import { assets } from "../../assets/assets";

const SECTIONS = [
    {
        label: "Quick Links",
        items: [
            "Home",
            "Browse Cars",
            "List Your Car",
            "About Us"
        ]
    },
    {
        label: "Resources",
        items: [
            "Help Center",
            "Terms of Service",
            "Privacy Policy",
            "Insaurance"
        ]
    },
    {
        label: "Contact",
        items: [
            "1234 Luxury Drive",
            "San Francisco, CA 94107",
            "+91 98765 43210",
            "admin&carrental.com"
        ]
    },
]

const Footer = () => {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-borderColor">
                <div>
                    <img src={assets.logo} alt="logo" className="h-8 md:h-9" />

                    <p className="max-w-80 mt-3">Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs</p>

                    <div className="flex items-center gap-3 mt-6">
                        <a href="#">
                            <img src={assets.facebook_logo} alt="facebook_logo" className="w-5 h-5" />
                        </a>

                        <a href="#">
                            <img src={assets.instagram_logo} alt="instagram_logo" className="w-5 h-5" />
                        </a>

                        <a href="#">
                            <img src={assets.twitter_logo} alt="twitter_logo" className="w-5 h-5" />
                        </a>

                        <a href="#">
                            <img src={assets.gmail_logo} alt="gmail_logo" className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {SECTIONS.map((section) => (
                    <div key={section.label}>
                        <h2 className="text-base text-gray-800 font-medium uppercase">
                            {section.label}
                        </h2>

                        <ul className="mt-3 flex flex-col gap-2 text-sm">
                            {section.items.map((item) => (
                                <li key={item} className="cursor-pointer">{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
                <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>

                <ul className="flex items-center gap-4">
                    <li>Privacy</li>

                    <span>|</span>

                    <li>Terms</li>

                    <span>|</span>

                    <li>Cookies</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;