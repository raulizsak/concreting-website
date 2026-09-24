export const serviceAreaGroups = [
  {
    name: 'South-East Melbourne',
    suburbs: [
      'Pakenham', 'Officer', 'Beaconsfield', 'Berwick', 'Narre Warren', 'Cranbourne',
      'Cranbourne North', 'Cranbourne East', 'Clyde', 'Clyde North', 'Hampton Park',
      'Hallam', 'Endeavour Hills', 'Narre Warren South', 'Dandenong', 'Dandenong South',
      'Noble Park', 'Keysborough', 'Springvale', 'Mulgrave', 'Wheelers Hill', 'Rowville',
      'Scoresby', 'Wantirna', 'Wantirna South', 'Glen Waverley', 'Mount Waverley',
    ],
  },
  {
    name: 'Dandenong Ranges / Yarra Area',
    suburbs: [
      'Emerald', 'Cockatoo', 'Gembrook', 'Belgrave', 'Tecoma', 'Upwey', 'Ferntree Gully',
      'Boronia', 'Bayswater', 'Lilydale', 'Mount Evelyn', 'Monbulk', 'Montrose', 'Mooroolbark',
      'Croydon', 'Croydon Hills', 'Ringwood', 'Ringwood East', 'Ringwood North',
    ],
  },
  {
    name: 'Cardinia / Gippsland',
    suburbs: [
      'Cardinia', 'Nar Nar Goon', 'Tynong', 'Garfield', 'Bunyip', 'Longwarry', 'Drouin', 'Drouin South',
      'Warragul', 'Yarragon', 'Trafalgar', 'Neerim South', 'Neerim North', 'Nilma', 'Buln Buln',
    ],
  },
  {
    name: 'Bass Coast / South Gippsland',
    suburbs: [
      'Koo Wee Rup', 'Lang Lang', 'Nyora', 'Grantville', 'Bass', 'Corinella', 'San Remo',
      'Newhaven', 'Cowes', 'Wonthaggi', 'Inverloch', 'Korumburra', 'Leongatha', 'Foster',
    ],
  },
  {
    name: 'Latrobe Valley',
    suburbs: ['Moe', 'Newborough', 'Yallourn North', 'Morwell', 'Churchill', 'Traralgon'],
  },
] as const;

export const servicedSuburbNames = serviceAreaGroups.flatMap((group) => group.suburbs);
export const servicedSuburbKeys = new Set(servicedSuburbNames.map((name) => name.toLocaleUpperCase('en-AU')));
