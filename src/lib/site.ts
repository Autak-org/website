/** Organisation facts and external links, kept out of the copy dictionaries. */
export const site = {
  name: "Autak e.V.",
  email: "info@autak.org",
  phone: "+49 241 92133973",
  phoneHref: "+4924192133973",
  address: {
    street: "Ottostraße 51A",
    city: "52070 Aachen",
    country: "Deutschland",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Autak%20e.V.%2C%20Ottostra%C3%9Fe%2051A%2C%2052070%20Aachen%2C%20Germany",
  bank: {
    holder: "Autak e.V.",
    name: "Deutsche Skatbank",
    iban: "DE76 8306 5408 0004 2950 99",
    bic: "GENODEF1SLR",
  },
  paypal: "https://paypal.me/autak",
  joinForm: "https://forms.gle/W2Wzw4yiE8Cyx5q36",
  meeting: "https://meet.google.com/wmi-dshc-wqi",
  shop: "https://autak.org/home/shop",
  social: {
    instagram: "https://instagram.com/autak.wheelchair/",
    linkedin: "https://linkedin.com/company/autak",
    facebook: "https://facebook.com/autak.wheelchair",
  },
  video: {
    // MDR "Einfach genial" television feature.
    press: "F5Ns46SNK1s",
    trailer: "kmyMPOIq7RQ",
  },
} as const;

export const partners = [
  { name: "digitalHUB Aachen", src: "/images/partner-digitalhub.png" },
  { name: "Kurtz Ersa", src: "/images/partner-kurtzersa.png" },
  { name: "Fluke", src: "/images/partner-fluke.png" },
  { name: "cambio CarSharing", src: "/images/partner-cambio.png" },
  { name: "ACE", src: "/images/partner-ace.png" },
  { name: "low-tec", src: "/images/partner-lowtec.png" },
  { name: "CYBATHLON", src: "/images/partner-cybathlon.png" },
  { name: "MDR", src: "/images/partner-mdr.png" },
] as const;
