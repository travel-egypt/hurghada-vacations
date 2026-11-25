(() => {
"use strict";

const details = [
  "Pickup from your hotel to the boat; two snorkeling stops; shuttle boat to the island; lunch on board and unlimited drinks; return to your hotel around 16:00. Order and timing depend on sea conditions.",
  "Ask Atlantis to confirm the itinerary, duration, pickup arrangements, inclusions and any additional charges before booking.",
  "Explore El Mina Mosque, the fish garden or aquarium, local bazaars, markets and the port area. Confirm opening hours, admission fees and the final route before booking.",
  "Before booking, confirm the schedule, eligibility, instructor or guide, equipment, transfers and any certification or marine fees with Atlantis. Medical screening may be required for scuba activities."
];

const islandDescription = "A full-day Red Sea escape combining island beach time, coral reef exploration and a relaxing boat journey.";

const rows = [

["orange-bay",
"Orange Bay Island Boat Trip",
islandDescription,
"assets/images/IMG-20261117-WA0011.jpg",
"islands",null,null,0],

["mahmya-island",
"Giftun Island National Park – Mahmya Beach",
islandDescription,
"https://commons.wikimedia.org/wiki/Special:FilePath/02010%2005712%20Mahmya%20Island.jpg",
"islands",null,null,0],

["abu-dabbab-bay",
"Abu Dabbab Bay",
"Visit Abu Dabbab Bay near Marsa Alam, known for its sandy shore and seagrass habitat. Sea turtles and dugongs may be present, but wildlife sightings are never guaranteed.",
"assets/images/AbuDabab.jpeg",
"snorkeling",null,null,1],

["hula-hula-island",
"Hula Hula Island",
islandDescription,
"assets/images/Hula.jpeg",
"islands",40,null,0],

["eden-island",
"Eden Island",
islandDescription,
"assets/images/IMG-20261117-WA0014.jpg",
"islands",40,null,0],

["paradise-island",
"Paradise Island",
"Cruise across the Red Sea to Paradise Island for beach time and open-water views. Swimming and snorkeling stops depend on the confirmed programme and sea conditions.",
"https://commons.wikimedia.org/wiki/Special:FilePath/02010%2005709%20Paradise%20Island%20Makadi.jpg",
"islands",null,null,1],

["quad-bike-safari",
"Quad Bike Safari",
"Follow a guided quad-bike route through the desert around Hurghada. The experience starts with equipment preparation and a safety briefing; the route and pace are set by the operator.",
"https://egyptra.pro/img.php?src=uploads%2Fproducts%2Fimg_0c36e7a70534b2cb.webp&w=740&h=555&crop=1&q=72",
"desert",null,null,1],

["cairo-day-trip",
"Cairo Day Trip",
"Travel from Hurghada to Cairo for a full-day excursion visiting the Giza Pyramids and historic landmarks according to your confirmed itinerary and transport arrangement.",
"https://www.falconadventure.com/uploads/tourGallery/gallery/201821135035516.jpg",
"culture",null,null,1],

["airport-and-private-transfers",
"Airport & Private Transfers",
"Arrange point-to-point vehicle transfers between Hurghada Airport, hotels, and Red Sea or regional destinations according to your flight, route, and vehicle choice.",
"https://www.deluxetravelegypt.com/wp-content/uploads/2026/10/private-transfer-red-sea-road-700x500.jpg",
"transfers",null,null,1],

["aswan-trip",
"Aswan Trip",
"Explore Aswan’s Nile setting, historic temples, and landmarks according to a confirmed schedule and transport plan. Exact stops, duration, and inclusions depend on your selected programme.",
"https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_headers/40630/2000x2000-0-70-8f19758248f845e5e1c70429c1fd1fa1.jpg",
"culture",null,null,1],

["bedouin-village-experience",
"Bedouin Village Experience",
"Spend time in a desert setting learning about Bedouin traditions, hospitality and desert life. Included activities, refreshments and meals depend on the selected programme.",
"https://egyptra.pro/uploads/products/product_m29803--urghada-edouin-inner-how-with-639_68528fa35cfbd.webp",
"desert",null,null,1],

["dolphin-watching-boat-trip",
"Dolphin Watching Boat Trip",
"Head out onto the Red Sea by boat to watch for wild dolphins in their natural habitat. Sightings are never guaranteed, and all marine wildlife guidelines apply.",
"https://egyptra.pro/img.php?src=uploads%2Fproducts%2Fimg_3a7ce13d32b47962.webp&w=800&q=72",
"sea",50,null,1],

["hurghada-city-tour",
"Hurghada City Tour",
"Discover local neighbourhoods, waterfront areas and everyday city life in Hurghada on a guided sightseeing route. Exact stops, durations and visits depend on the selected itinerary.",
"https://fantasia-tours.com/wp-content/uploads/2025/04/IMG-20250406-WA0094.jpg",
"city",null,null,2],

["jeep-desert-safari",
"Jeep Desert Safari",
"Explore the Eastern Desert from Hurghada by 4x4 jeep, travelling through desert trails, rocky hills, and open mountain landscapes with stops confirmed in your selected package.",
"assets/images/%D9%85%D9%88%D9%83%D8%A8%20%D8%A3%D8%AA%D9%84%D8%A7%D9%86%D8%AA%D8%B3%20%D9%81%D9%8A%20%D8%AC%D8%A8%D8%A7%D9%84%20%D8%A7%D9%84%D8%B5%D8%AD%D8%B1%D8%A7%D8%A1.png",
"desert",null,null,1],

["kitesurfing",
"Kitesurfing",
"Learn or improve kitesurfing with a session suited to your experience. Instruction, equipment and launch arrangements depend on the centre, wind and safety conditions.",
"assets/images/Kitesurfing3.jpeg",
"water",null,null,1],

["kitesurfing-and-windsurfing",
"Kitesurfing & Windsurfing",
"Learn or practice kitesurfing and windsurfing on the Red Sea with sessions adapted to your experience level. Instruction, equipment, launch arrangements, and schedules depend on the centre, wind, and safety conditions.",
"assets/images/Kitesurfing4.jpeg",
"water",null,null,1],

["luxor-day-trip",
"Luxor Day Trip",
"Travel from Hurghada to Luxor for a full-day historical excursion exploring ancient Egyptian temples and landmarks along the Nile. Exact stops, timing, and inclusions follow the confirmed itinerary.",
"assets/images/%D9%85%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%A3%D9%82%D8%B5%D8%B1%20%D8%B9%D9%86%D8%AF%20%D8%A7%D9%84%D8%BA%D8%B1%D9%88%D8%A8.png",
"culture",null,null,1],

["magawish-island",
"Magawish Island",
"Explore the island scenery around Magawish and enjoy a slower day by the Red Sea. Boat stops, swimming opportunities and included services depend on the selected arrangement.",
"https://commons.wikimedia.org/wiki/Special:FilePath/Il%20mare%20d%27Egitto%20-%20panoramio.jpg",
"islands",null,null,1],

["parasailing",
"Parasailing",
"Lift off above Red Sea waters towed by a dedicated parasailing boat after a safety briefing and harness fitting. Flight duration, setup, and timing depend on wind, sea conditions, and your confirmed booking.",
"https://www.redsea-world.pl/wp-content/uploads/2023/05/Parasailing-Hurghada-741x1024.jpg",
"water",null,null,1],

["private-boat---yacht-trips",
"Private Boat & Yacht Trips",
"Enjoy a private boat or yacht reserved for your group. Discuss your preferred route, duration and activities—such as cruising, swimming or snorkeling—before departure.",
"https://commons.wikimedia.org/wiki/Special:FilePath/Hurghada_Marina_for_yachts.jpg",
"private",null,null,1],

["semi-submarine-and-glass-bottom-boat",
"Semi-Submarine & Glass Bottom Boat",
"View Red Sea coral and marine life through underwater viewing windows or glass panels on a coastal excursion suited to families and non-swimmers, subject to sea conditions.",
"https://sharmhurghadaexcursions.com/images/gallery/18486b8a240fb3ec1506576f1cb035f2.jpg",
"sea",null,null,1],

["spider-buggy-safari",
"Spider Buggy Safari",
"Drive desert tracks in an open-style spider buggy after a vehicle and safety briefing. The vehicle, route, passenger setup and stops depend on the selected package.",
"https://www.moment-tour.com/photos/excursions/spider-car-hurghada_lg.jpg",
"desert",null,null,1],

["bubble-maker",
"Bubble Maker",
"Introductory supervised diving for children aged 8–9. Confirm depth and eligibility before booking. A gentle introduction to breathing underwater and becoming comfortable with basic scuba equipment.",
"assets/images/bubble-maker.webp",
"courses",95,false,3],

["discover-scuba",
"Discover Scuba Diving",
"Initial confined-water skills followed by a supervised reef dive; minimum age 10. Learn basic equipment use, underwater communication and breathing before exploring a reef with an instructor.",
"assets/images/discover-scuba.webp",
"courses",120,false,3],

["scuba-diver",
"Scuba Diver",
"Entry-level training: up to two days, three dives; supervised diving qualification. Build foundational knowledge and practical skills for supervised recreational diving.",
"assets/images/scuba-diver.webp",
"courses",235,false,3],

["open-water-referral",
"Referral Open Water Diver",
"Complete the practical part of previously started training; up to two days and four dives. Bring your training records so the instructor can review completed work and plan remaining open-water sessions.",
"assets/images/open-water-referral.webp",
"courses",235,false,3],

["open-water",
"Open Water Diver",
"Theory, confined-water practice and open-water training; typically three to four days. Develop independent recreational diving skills through knowledge development, equipment practice and supervised open-water assessments.",
"assets/images/open-water.webp",
"courses",375,false,3],

["open-water-upgrade",
"Open Water Upgrade",
"Progress from Scuba Diver toward Open Water certification; up to two days, three dives. Review previous certification and complete the remaining knowledge and practical requirements.",
"assets/images/open-water-upgrade.webp",
"courses",235,false,3],

["adventure-diver",
"Adventure Diver",
"Three adventure dives over one day. Explore different diving activities and develop confidence through instructor-led experience.",
"assets/images/adventure-diver.webp",
"courses",175,false,3],

["advanced-open-water",
"Advanced Open Water Diver",
"Five adventure dives over up to two days, including navigation and deep diving. Develop underwater navigation and depth awareness while exploring additional adventure diving skills.",
"assets/images/advanced-open-water.webp",
"courses",215,false,3],

["emergency-first-response",
"Emergency First Response",
"First aid and CPR training; up to one day. Practise responding to emergencies, assessing a situation and providing first aid and CPR.",
"assets/images/emergency-first-response.webp",
"courses",120,false,3],

["rescue-diver",
"Rescue Diver",
"Rescue skills and theory; up to three days with four dives. Develop awareness of diver stress, prevention and supervised rescue scenarios.",
"assets/images/rescue-diver.webp",
"courses",370,false,3],

["divemaster",
"Divemaster",
"Professional-level training; listed minimum duration ten days. Entry requirements and materials must be confirmed. Develop leadership, dive planning and professional-level supervision skills under instructor guidance.",
"assets/images/divemaster.webp",
"courses",650,false,3],

["nitrox",
"Nitrox Specialty",
"Enriched-air theory training over one day. Learn enriched-air concepts, oxygen exposure awareness and gas analysis procedures.",
"assets/images/nitrox.webp",
"courses",120,false,3],

["drift-diver",
"Drift Diver Specialty",
"Two training dives focused on diving in currents. Develop awareness of currents, group communication and safe drift-dive planning.",
"assets/images/drift-diver.webp",
"courses",175,false,3],

["buoyancy",
"Peak Performance Buoyancy",
"Two dives practising buoyancy control. Refine trim, weighting and controlled movement to reduce contact with the reef.",
"assets/images/buoyancy.webp",
"courses",175,false,3],

["deep-diver",
"Deep Diver Specialty",
"Four training dives over two days. Explore depth-related planning, gas management and awareness under instructor supervision.",
"assets/images/deep-diver.webp",
"courses",230,false,3],

["night-diver",
"Night Diver Specialty",
"Three training dives over two days. Develop light communication, orientation and planning for diving after dark.",
"assets/images/night-diver.webp",
"courses",230,false,3],

["wreck-diver",
"Wreck Diver Specialty",
"Four training dives over two days. Learn wreck orientation, hazard awareness and responsible exploration within training limits.",
"assets/images/wreck-diver.webp",
"courses",230,false,3],

["daily-diving",
"Certified Diver Packages",
"Equipment rental excluded. Choose a package suited to your certification and recent experience; dive sites depend on conditions.",
"assets/images/daily-diving.webp",
"diving",70,true,3],

["intro-diving",
"Introduction Dive by Boat",
"Minimum age 10. Experience breathing underwater on an instructor-supervised introductory boat outing.",
"assets/images/intro-diving.webp",
"diving",60,true,3],

["wreck-trips",
"Wreck Diving Trips",
"Each listed trip includes two dives. Explore suitable wreck sites according to certification, experience and sea conditions.",
"assets/images/wreck-trips.webp",
"diving",120,true,3],

["special-dives",
"Special Diving Trips",
"For eligible divers; confirm requirements. Discuss specialist dive options and site suitability with the dive centre.",
"assets/images/special-dives.webp",
"diving",50,true,3],

["reef-snorkeling",
"Red Sea Snorkeling",
"Age-based pricing. Explore shallow reef habitats from the surface, with site selection subject to sea conditions.",
"assets/images/reef-snorkeling.webp",
"snorkeling",35,true,3]

];

window.ATLANTIS_TOURS = rows.map(row => {

  const [
    id,
    title,
    desc,
    image,
    category,
    price,
    fromPrice,
    detailIndex
  ] = row;

  const tour = {
    id,
    title,
    desc,
    image,
    category,
    href: "tours/" + id + ".html",
    detail: details[detailIndex]
  };

  if (typeof price === "number") {
    tour.price = price;
  }

  if (typeof fromPrice === "boolean") {
    tour.fromPrice = fromPrice;
    tour.from = fromPrice;
  }

  return tour;

});

console.info(
  "Atlantis Tours Database:",
  window.ATLANTIS_TOURS.length,
  "experiences loaded successfully."
);

})();
