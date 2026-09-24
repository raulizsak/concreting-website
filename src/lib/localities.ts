export type LocalityTuple = [string, string, number, number];

type LocalityData = { localities: LocalityTuple[] };

type LocalityAutocompleteOptions = {
  input: HTMLInputElement;
  suggestions: HTMLUListElement;
  optionIdPrefix: string;
  onSelect?: (locality: LocalityTuple) => void;
};

let localityPromise: Promise<LocalityTuple[]> | undefined;

export const titleCaseLocality = (value: string) => value
  .toLocaleLowerCase('en-AU')
  .replace(/(^|[\s/-])([a-z])/g, (_, prefix, letter) => `${prefix}${letter.toLocaleUpperCase('en-AU')}`);

export const localityLabel = ([suburb, postcode]: LocalityTuple) => `${titleCaseLocality(suburb)}, VIC ${postcode}`;

export const normaliseLocality = (value: string) => value.trim().toLocaleUpperCase('en-AU').replace(/\s+/g, ' ');

export const getVictorianLocalities = () => {
  localityPromise ??= fetch('/data/vic-localities.json')
    .then((response) => {
      if (!response.ok) throw new Error('Location list could not be loaded.');
      return response.json() as Promise<LocalityData>;
    })
    .then((data) => data.localities);
  return localityPromise;
};

export const findLocalityMatches = (localities: LocalityTuple[], query: string, limit = 8) => {
  const value = normaliseLocality(query).replace(/,? VIC(?:TORIA)?(?: \d{4})?$/, '');
  if (value.length < 2) return [];
  const postcodeQuery = /^\d/.test(value);
  return localities
    .filter(([suburb, postcode]) => postcodeQuery ? postcode.startsWith(value) : suburb.startsWith(value))
    .slice(0, limit);
};

export const findExactLocality = (localities: LocalityTuple[], value: string, selectedKey?: string) => {
  const entered = normaliseLocality(value);
  return localities.find(([suburb, postcode]) =>
    `${suburb}|${postcode}` === selectedKey
    || entered === suburb
    || entered === postcode
    || entered === normaliseLocality(localityLabel([suburb, postcode, 0, 0]))
    || entered === `${suburb} ${postcode}`
  );
};

export const createLocalityAutocomplete = ({
  input,
  suggestions,
  optionIdPrefix,
  onSelect,
}: LocalityAutocompleteOptions) => {
  let localities: LocalityTuple[] = [];
  let filteredSuggestions: LocalityTuple[] = [];
  let activeSuggestion = -1;

  const load = async () => {
    if (!localities.length) localities = await getVictorianLocalities();
    return localities;
  };

  const close = () => {
    suggestions.hidden = true;
    suggestions.replaceChildren();
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    filteredSuggestions = [];
    activeSuggestion = -1;
  };

  const select = (locality: LocalityTuple) => {
    input.value = localityLabel(locality);
    input.dataset.selectedLocality = `${locality[0]}|${locality[1]}`;
    close();
    onSelect?.(locality);
  };

  const setActiveSuggestion = (index: number) => {
    activeSuggestion = index;
    Array.from(suggestions.children).forEach((option, optionIndex) => {
      option.setAttribute('aria-selected', String(optionIndex === activeSuggestion));
    });
    const activeOption = suggestions.children.item(activeSuggestion);
    if (activeOption) {
      input.setAttribute('aria-activedescendant', `${optionIdPrefix}-${activeSuggestion}`);
      activeOption.scrollIntoView({ block: 'nearest' });
    }
  };

  const render = (matches: LocalityTuple[]) => {
    suggestions.replaceChildren();
    filteredSuggestions = matches;
    activeSuggestion = -1;
    matches.forEach((locality, index) => {
      const option = document.createElement('li');
      option.id = `${optionIdPrefix}-${index}`;
      option.role = 'option';
      option.setAttribute('aria-selected', 'false');
      option.textContent = localityLabel(locality);
      option.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        select(locality);
      });
      suggestions.append(option);
    });
    suggestions.hidden = matches.length === 0;
    input.setAttribute('aria-expanded', String(matches.length > 0));
    input.removeAttribute('aria-activedescendant');
  };

  input.addEventListener('focus', () => { load().catch(() => {}); });
  input.addEventListener('input', async () => {
    delete input.dataset.selectedLocality;
    const data = await load().catch(() => [] as LocalityTuple[]);
    render(findLocalityMatches(data, input.value));
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (!filteredSuggestions.length || suggestions.hidden) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      select(filteredSuggestions[activeSuggestion >= 0 ? activeSuggestion : 0]);
      return;
    }
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    setActiveSuggestion(event.key === 'ArrowDown'
      ? (activeSuggestion + 1) % filteredSuggestions.length
      : (activeSuggestion - 1 + filteredSuggestions.length) % filteredSuggestions.length);
  });
  input.addEventListener('blur', () => window.setTimeout(close, 140));

  return { close, load, select };
};
