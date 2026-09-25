export type ProcessStep = {
  title: string;
  copy: string;
};

export type ServicePageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  overviewHeading: string;
  overview: string[];
  applications: string[];
  processHeading: string;
  process: ProcessStep[];
  considerationsHeading: string;
  considerations: ProcessStep[];
  relatedServiceSlugs: string[];
  projectSlugs: string[];
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const servicePageContent: ServicePageContent[] = [
  {
    slug: 'concreting',
    eyebrow: 'Concreting',
    title: 'Concreting Pakenham & South East Melbourne | Geli Construction Services',
    description: 'Concrete driveways, slabs, paths, side access, alfresco areas and steps in Pakenham and South East Melbourne. Request a quote from Geli Construction Services.',
    h1: 'Concreting Services in Pakenham & South East Melbourne',
    intro: 'Geli Construction Services provides concrete work for practical residential access, outdoor living and usable areas around the property.',
    overviewHeading: 'Concrete built for the way you use your property',
    overview: [
      'Concrete can create a durable surface for vehicle access, everyday foot traffic, outdoor entertaining and the spaces between existing structures. Geli works on driveways, slabs, footpaths, side access, alfresco areas and steps.',
      'Finish options already offered by Geli include plain concrete, coloured concrete and exposed aggregate. The right option depends on the project, the surrounding property and the finish you want to achieve.',
    ],
    applications: ['Residential driveways', 'Outdoor slabs', 'Footpaths and side access', 'Alfresco areas', 'Concrete steps', 'Plain, coloured and exposed aggregate finishes'],
    processHeading: 'A clear concreting process',
    process: [
      { title: 'Discuss the area', copy: 'Share the project location, intended use and any access or site details that help explain the job.' },
      { title: 'Confirm the scope', copy: 'The dimensions, preparation needs and preferred concrete finish can be discussed before quoting.' },
      { title: 'Prepare and install', copy: 'The work moves from site preparation and reinforcement through to the concrete installation and completed surface.' },
    ],
    considerationsHeading: 'Choose the right type of concrete work',
    considerations: [
      { title: 'Use of the space', copy: 'A driveway, pedestrian path, slab and alfresco area each serve a different purpose and need an appropriate plan.' },
      { title: 'Finish', copy: 'Plain, coloured and exposed aggregate concrete offer different visual results. Ask which options suit your project.' },
      { title: 'Connected work', copy: 'Excavation, drainage, retaining and outdoor finishing can be discussed when they form part of the wider project.' },
    ],
    relatedServiceSlugs: ['excavation', 'irrigation-drainage', 'outdoor-finishing-landscaping'],
    projectSlugs: ['residential-concrete-driveway', 'plain-concrete-slab-installation', 'backyard-side-access-concreting'],
  },
  {
    slug: 'excavation',
    eyebrow: 'Excavation',
    title: 'Excavation Services Pakenham & South East Melbourne | Geli Construction Services',
    description: 'Excavation and ground preparation for concrete and outdoor construction projects in Pakenham and South East Melbourne. Discuss your site with Geli.',
    h1: 'Excavation Services in Pakenham & South East Melbourne',
    intro: 'Geli provides excavation and ground preparation as part of concrete and outdoor construction work.',
    overviewHeading: 'Prepare the ground for the work ahead',
    overview: [
      'Good outdoor work starts with understanding the existing area and what needs to be prepared for the next stage. Geli provides excavation and ground preparation for concrete and other outdoor construction projects.',
      'The excavation scope depends on the planned work and the site itself. Share photos, dimensions and access details when requesting a quote so the job can be discussed accurately.',
    ],
    applications: ['Preparation for concrete work', 'Ground preparation for outdoor construction', 'Site preparation within a broader outdoor project'],
    processHeading: 'Plan excavation around the project',
    process: [
      { title: 'Explain the next stage', copy: 'Tell us what the prepared area will support, such as concrete or another part of an outdoor project.' },
      { title: 'Review site access', copy: 'Access, existing surfaces and the area to be prepared are discussed as part of defining the scope.' },
      { title: 'Coordinate the work', copy: 'Where excavation connects to another Geli service, the order of work can be considered as one project.' },
    ],
    considerationsHeading: 'Useful details for an excavation enquiry',
    considerations: [
      { title: 'Project purpose', copy: 'Explain what is planned after excavation so the preparation can be considered in context.' },
      { title: 'Access and surroundings', copy: 'Mention narrow access, existing structures or other features that may affect how the area is approached.' },
      { title: 'Related services', copy: 'Concrete, retaining, drainage and outdoor finishing may be relevant depending on the complete scope.' },
    ],
    relatedServiceSlugs: ['concreting', 'retaining-walls', 'irrigation-drainage'],
    projectSlugs: [],
  },
  {
    slug: 'stonework-outdoor-tiling',
    eyebrow: 'Stonework & Outdoor Tiling',
    title: 'Stonework & Outdoor Tiling Pakenham | Geli Construction Services',
    description: 'Natural stone paving and outdoor tiling for paths, entertaining areas and exterior finishes in Pakenham and surrounding service areas. Request a quote.',
    h1: 'Stonework & Outdoor Tiling in Pakenham',
    intro: 'Geli installs natural stone and outdoor tiles for paths, entertaining areas and exterior finishes.',
    overviewHeading: 'Stone and tile for finished outdoor spaces',
    overview: [
      'Outdoor stone and tile can give paths, entertaining areas and external surfaces a defined, finished appearance. Geli provides natural stone paving, bluestone paving and outdoor tile installation.',
      'Material, layout and the existing area all shape the project. Tell us what surface you are considering and where it will be installed so the scope can be discussed.',
    ],
    applications: ['Bluestone paving', 'Natural stone paving', 'Outdoor tiling', 'Paths and entertaining areas', 'Exterior stone and tile finishes'],
    processHeading: 'From material choice to finished surface',
    process: [
      { title: 'Share the space', copy: 'Provide the location, approximate area and the use you have in mind for the finished surface.' },
      { title: 'Discuss materials', copy: 'The preferred stone or outdoor tile and the surrounding finishes help define the project.' },
      { title: 'Plan the installation', copy: 'Preparation and installation requirements can then be considered for the particular area.' },
    ],
    considerationsHeading: 'What shapes a stone or tile project',
    considerations: [
      { title: 'Material and format', copy: 'Natural stone, bluestone and outdoor tiles create different visual results and layouts.' },
      { title: 'How the area is used', copy: 'Paths, entertaining spaces and exterior finishes have different roles around the property.' },
      { title: 'Surrounding work', copy: 'Concrete and outdoor finishing can be discussed if they connect to the same area.' },
    ],
    relatedServiceSlugs: ['concreting', 'outdoor-finishing-landscaping', 'irrigation-drainage'],
    projectSlugs: [],
  },
  {
    slug: 'outdoor-finishing-landscaping',
    eyebrow: 'Outdoor Finishing & Landscaping',
    title: 'Outdoor Finishing & Landscaping Pakenham | Geli Construction Services',
    description: 'Outdoor finishing with grass, mulch, gravel, pebbles, rocks, planting and lighting in Pakenham and surrounding service areas. Discuss your project with Geli.',
    h1: 'Outdoor Finishing & Landscaping in Pakenham',
    intro: 'Geli provides finishing elements that help turn a completed construction area into a practical, considered outdoor space.',
    overviewHeading: 'Complete the space around the main construction work',
    overview: [
      'Outdoor finishing brings together the surfaces, garden areas and details around a property. Geli can provide grass, mulch, gravel, pebbles, rocks, plants, outdoor decorative elements and lighting as part of the project scope.',
      'These elements can be discussed as a focused finishing project or alongside concrete, stonework, retaining, irrigation and drainage work.',
    ],
    applications: ['Grass and planting', 'Mulch, gravel and pebbles', 'Decorative rocks', 'Outdoor lighting', 'Finishing around new concrete or stonework'],
    processHeading: 'Build the finishing plan around the space',
    process: [
      { title: 'Identify the areas', copy: 'Show which parts of the property need finishing and how they connect to existing or planned construction.' },
      { title: 'Discuss the elements', copy: 'Choose the grass, planting, aggregates, rocks or lighting that are relevant to the project.' },
      { title: 'Coordinate the finish', copy: 'Finishing work can be planned around concrete, stonework, drainage or retaining where these services meet.' },
    ],
    considerationsHeading: 'Practical choices for an outdoor finish',
    considerations: [
      { title: 'Everyday use', copy: 'Consider how people move through the area and which parts need to remain practical and easy to access.' },
      { title: 'Existing materials', copy: 'The house, fences and installed surfaces can help guide the look of the finished space.' },
      { title: 'Water and levels', copy: 'Irrigation, drainage and retaining may need to be considered when they are part of the wider job.' },
    ],
    relatedServiceSlugs: ['stonework-outdoor-tiling', 'irrigation-drainage', 'retaining-walls'],
    projectSlugs: [],
  },
  {
    slug: 'irrigation-drainage',
    eyebrow: 'Irrigation & Drainage',
    title: 'Irrigation & Drainage Pakenham | Geli Construction Services',
    description: 'Irrigation and drainage solutions for outdoor areas in Pakenham and surrounding service locations. Tell Geli Construction Services about your project.',
    h1: 'Irrigation & Drainage in Pakenham',
    intro: 'Geli provides irrigation and drainage solutions for outdoor areas, including work connected to wider construction and finishing projects.',
    overviewHeading: 'Plan water movement as part of the outdoor space',
    overview: [
      'Irrigation and drainage affect how an outdoor area functions after the visible construction and finishing work is complete. Geli provides water irrigation systems and drainage for outdoor projects.',
      'Describe the area, the work already in place and the result you need. Where the job connects to concrete, retaining or outdoor finishing, the services can be discussed together.',
    ],
    applications: ['Water irrigation systems', 'Outdoor drainage', 'Drainage connected to outdoor construction', 'Irrigation within a broader finishing project'],
    processHeading: 'Discuss water needs in context',
    process: [
      { title: 'Describe the area', copy: 'Share the project location, existing surfaces and the part of the outdoor space that needs attention.' },
      { title: 'Explain the objective', copy: 'Tell us whether the enquiry relates to irrigation, drainage or both, and any connected work being planned.' },
      { title: 'Define the scope', copy: 'The relevant solution and its place within the wider project can then be discussed before quoting.' },
    ],
    considerationsHeading: 'Information that helps with your enquiry',
    considerations: [
      { title: 'Existing surfaces', copy: 'Mention concrete, paving, lawn, garden areas or retaining that form part of the same space.' },
      { title: 'Connected works', copy: 'New construction and finishing can affect when irrigation or drainage work needs to occur.' },
      { title: 'Project boundaries', copy: 'Clear photos and an outline of the affected area make it easier to discuss the job.' },
    ],
    relatedServiceSlugs: ['outdoor-finishing-landscaping', 'retaining-walls', 'concreting'],
    projectSlugs: [],
  },
  {
    slug: 'retaining-walls',
    eyebrow: 'Retaining Walls',
    title: 'Retaining Walls Pakenham & South East Melbourne | Geli Construction Services',
    description: 'Retaining wall construction for outdoor spaces and changing landscape levels in Pakenham and South East Melbourne. Request a quote from Geli.',
    h1: 'Retaining Walls in Pakenham & South East Melbourne',
    intro: 'Geli constructs retaining walls for outdoor areas and sites with changing landscape levels.',
    overviewHeading: 'Practical retaining for outdoor levels',
    overview: [
      'Retaining walls can help define level changes and support the layout of an outdoor area. Geli provides retaining wall construction for residential outdoor spaces.',
      'The right scope depends on the site, the proposed wall and how it connects to the rest of the property. Share the location, photos and an outline of the work so the project can be discussed accurately.',
    ],
    applications: ['Retaining walls for outdoor spaces', 'Walls within landscaped areas', 'Retaining connected to broader outdoor construction'],
    processHeading: 'Start with the site and intended layout',
    process: [
      { title: 'Show the level change', copy: 'Photos and a description of the existing area help explain where retaining is being considered.' },
      { title: 'Discuss the wall', copy: 'The proposed location, approximate extent and connection to surrounding work form the project scope.' },
      { title: 'Coordinate related work', copy: 'Excavation, drainage and finishing can be considered where they are part of the same outdoor project.' },
    ],
    considerationsHeading: 'Plan retaining as part of the whole area',
    considerations: [
      { title: 'Site conditions', copy: 'Existing levels, access and nearby structures are important details to include in the enquiry.' },
      { title: 'Surrounding layout', copy: 'Paths, garden areas and other surfaces help define how the wall sits within the finished space.' },
      { title: 'Related services', copy: 'Excavation, drainage and outdoor finishing may form connected stages of the project.' },
    ],
    relatedServiceSlugs: ['excavation', 'irrigation-drainage', 'outdoor-finishing-landscaping'],
    projectSlugs: [],
  },
];

export const concretingSubservicePages: ServicePageContent[] = [
  {
    slug: 'concrete-driveways',
    eyebrow: 'Concrete Driveways',
    title: 'Concrete Driveways Pakenham | Geli Construction Services',
    description: 'Residential concrete driveway preparation and installation in Pakenham and surrounding service areas. View genuine Geli project work and request a quote.',
    h1: 'Concrete Driveways in Pakenham',
    intro: 'Geli provides residential concrete driveway preparation and installation, with finish options to suit the project.',
    overviewHeading: 'A practical surface for everyday vehicle access',
    overview: [
      'A concrete driveway creates the main vehicle approach to the home and needs to work with the available space, access and surrounding property. Geli provides residential driveway concreting from preparation through to the completed surface.',
      'Plain concrete, coloured concrete and exposed aggregate are available finish options depending on the job and the appearance you want.',
    ],
    applications: ['New residential driveways', 'Driveway approaches', 'Plain concrete driveways', 'Coloured concrete driveways', 'Exposed aggregate driveways'],
    processHeading: 'From the existing approach to finished concrete',
    process: [
      { title: 'Share the driveway area', copy: 'Provide the address area, approximate dimensions, photos and any access details relevant to the quote.' },
      { title: 'Choose the scope and finish', copy: 'Preparation needs and the preferred concrete finish can be discussed for the particular property.' },
      { title: 'Prepare and install', copy: 'The driveway moves through ground preparation and reinforcement to concrete installation and finishing.' },
    ],
    considerationsHeading: 'Driveway details worth discussing',
    considerations: [
      { title: 'Vehicle access', copy: 'The shape and position of the approach need to work with how vehicles enter and use the property.' },
      { title: 'Finish choice', copy: 'Plain, coloured and exposed aggregate concrete create different visual results.' },
      { title: 'Connected areas', copy: 'Paths, side access, drainage and outdoor finishing may connect directly to the driveway project.' },
    ],
    relatedServiceSlugs: ['concreting', 'excavation', 'irrigation-drainage'],
    projectSlugs: ['residential-concrete-driveway'],
    image: '/images/projects/residential-concrete-driveway/cover',
    imageAlt: 'Completed plain concrete driveway in front of a modern white two-storey home',
    imageWidth: 1200,
    imageHeight: 1600,
  },
  {
    slug: 'concrete-slabs',
    eyebrow: 'Concrete Slabs',
    title: 'Concrete Slabs Pakenham | Geli Construction Services',
    description: 'Concrete slab preparation and installation for practical outdoor areas in Pakenham and surrounding locations. See genuine Geli work and request a quote.',
    h1: 'Concrete Slabs in Pakenham',
    intro: 'Geli prepares and installs concrete slabs for useful outdoor areas around residential properties.',
    overviewHeading: 'Create a solid, usable outdoor surface',
    overview: [
      'Outdoor concrete slabs can provide a clean, practical surface beside buildings and within other defined property areas. Geli carries out slab preparation, reinforcement and concrete installation.',
      'The required size, access and intended use help determine the scope. Share these details when requesting a quote so the work can be discussed in context.',
    ],
    applications: ['Rectangular outdoor slabs', 'Concrete areas beside existing structures', 'Plain concrete slab surfaces', 'Slabs within broader outdoor projects'],
    processHeading: 'A slab project from preparation to finish',
    process: [
      { title: 'Define the area', copy: 'Provide approximate dimensions, photos and the intended use of the new concrete surface.' },
      { title: 'Prepare the site', copy: 'The area is prepared and reinforcement is set out for the planned slab.' },
      { title: 'Install the concrete', copy: 'Concrete is placed and finished to create the completed outdoor surface.' },
    ],
    considerationsHeading: 'Plan the slab around its use',
    considerations: [
      { title: 'Purpose', copy: 'Explain how the finished area will be used so the project scope can be discussed accurately.' },
      { title: 'Existing structures', copy: 'Walls, buildings, fences and access around the area are useful details for the enquiry.' },
      { title: 'Connected work', copy: 'Excavation, drainage and surrounding outdoor finishing may be relevant to the full project.' },
    ],
    relatedServiceSlugs: ['concreting', 'excavation', 'outdoor-finishing-landscaping'],
    projectSlugs: ['plain-concrete-slab-installation'],
    image: '/images/projects/plain-concrete-slab-installation/cover',
    imageAlt: 'Finished rectangular plain concrete slab between a corrugated structure and a grey block wall',
    imageWidth: 1600,
    imageHeight: 1200,
  },
  {
    slug: 'paths-side-access',
    eyebrow: 'Concrete Paths & Side Access',
    title: 'Concrete Paths & Side Access Pakenham | Geli Construction Services',
    description: 'Concrete footpaths, backyard paths and side access areas in Pakenham and surrounding service locations. View genuine Geli project work and request a quote.',
    h1: 'Concrete Paths & Side Access in Pakenham',
    intro: 'Geli provides concrete paths and side access surfaces for practical movement around residential properties.',
    overviewHeading: 'Make the spaces around the home easier to use',
    overview: [
      'Side access and backyard paths often work within narrow or irregular spaces beside existing homes, fences and garden structures. Concrete can create a continuous, practical surface through these areas.',
      'Geli carries out preparation, reinforcement and concrete installation for footpaths, backyard areas and side access routes.',
    ],
    applications: ['Side access beside the home', 'Backyard concrete paths', 'Footpaths between outdoor areas', 'Concrete around existing structures'],
    processHeading: 'Work with the available access and layout',
    process: [
      { title: 'Show the route', copy: 'Photos and approximate dimensions help explain how the proposed path moves around the property.' },
      { title: 'Discuss constraints', copy: 'Narrow access, fences, walls and existing garden structures can be considered in the scope.' },
      { title: 'Prepare and concrete', copy: 'The area moves through preparation and reinforcement to the completed concrete surface.' },
    ],
    considerationsHeading: 'Details that shape paths and side access',
    considerations: [
      { title: 'Width and movement', copy: 'Consider how the path will be used and which parts of the property it needs to connect.' },
      { title: 'Existing features', copy: 'Buildings, fences, gates and garden structures are relevant to the available working area.' },
      { title: 'Nearby surfaces', copy: 'The path may need to connect visually and practically with driveways, slabs or other outdoor finishes.' },
    ],
    relatedServiceSlugs: ['concreting', 'excavation', 'outdoor-finishing-landscaping'],
    projectSlugs: ['backyard-side-access-concreting'],
    image: '/images/projects/backyard-side-access-concreting/cover',
    imageAlt: 'Completed backyard concrete area beside a red-brick home and black boundary fence',
    imageWidth: 1600,
    imageHeight: 1200,
  },
];

export const servicePageBySlug = new Map(servicePageContent.map((page) => [page.slug, page]));
export const concretingSubserviceBySlug = new Map(concretingSubservicePages.map((page) => [page.slug, page]));
