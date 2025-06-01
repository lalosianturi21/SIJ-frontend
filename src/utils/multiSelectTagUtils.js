export const rankToOption = (rank) => ({
  value: rank._id,
  label: rank.name,
  type: 'rank',
});

export const columnstyleToOption = (columnstyle) => ({
  value: columnstyle._id,
  label: columnstyle.name,
  type: 'columnstyle',
});

export const countryToOption = (country) => ({
  value: country._id,
  label: country.name,
  type: 'country',
});

export const currencyToOption = (currency) => ({
  value: currency._id,
  label: currency.name,
  type: 'currency',
});

export const institutionToOption = (institution) => ({
  value: institution._id,
  label: institution.name,
  type: 'institution',
});

export const languageToOption = (language) => ({
  value: language._id,
  label: language.name,
  type: 'language',
});

export const publishperiodToOption = (publishperiod) => ({
  value: publishperiod._id,
  label: publishperiod.month,
  type: 'publishperiod',
});

export const trackToOption = (track) => ({
  value: track._id,
  label: track.name,
  type: 'track',
});

export const filteredRanks = (inputValue, ranksData) => {
  const filteredRanks = ranksData
    .map(rankToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredRanks;
};

export const filteredTracks = (inputValue, tracksData) => {
  const filteredTracks = tracksData
    .map(trackToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredTracks;
};


export const filteredColumnStyles = (inputValue, columnstylesData) => {
  const filteredColumnStyles = columnstylesData
    .map(columnstyleToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

   return filteredColumnStyles;
};

export const filteredCountries = (inputValue, countriesData) => {
  const filteredCountries = countriesData
    .map(countryToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredCountries;
};

export const filteredCurrencies = (inputValue, currenciesData) => {
  const filteredCurrencies = currenciesData
    .map(currencyToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredCurrencies;
};

export const filteredInstitutions = (inputValue, institutionsData) => {
  const filteredInstitutions = institutionsData
    .map(institutionToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredInstitutions;
};

export const filteredLanguages = (inputValue, languagesData) => {
  const filteredLanguages = languagesData
    .map(languageToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredLanguages;
};

export const filteredPublishPeriods = (inputValue, publishPeriodsData) => {
  const filteredPublishPeriods = publishPeriodsData
    .map(publishperiodToOption)
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredPublishPeriods;
};
