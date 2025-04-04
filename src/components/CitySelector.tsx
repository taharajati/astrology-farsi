import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { allIranianCities } from '../data/allIranianCities';

export interface City {
  id: number;
  name: string;
  country: string;
  province?: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

interface CitySelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function CitySelector({ value, onChange }: CitySelectorProps) {
  const [query, setQuery] = useState('');

  const filteredCities =
    query === ''
      ? allIranianCities
      : allIranianCities.filter((city) => {
          const searchStr = `${city.name} ${city.country} ${city.province || ''}`.toLowerCase();
          return searchStr.includes(query.toLowerCase());
        });

  // Group cities by province
  const groupedCities = filteredCities.reduce((acc, city) => {
    if (city.country === 'ایران') {
      const province = city.province || 'سایر';
      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push(city);
    } else {
      if (!acc['شهرهای خارجی']) {
        acc['شهرهای خارجی'] = [];
      }
      acc['شهرهای خارجی'].push(city);
    }
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <Combobox
      value={value || ''}
      onChange={(newValue) => {
        const selectedCity = allIranianCities.find(
          (city) => `${city.name}، ${city.country}` === newValue
        );
        if (selectedCity) {
          onChange(`${selectedCity.name}، ${selectedCity.country}`);
        }
      }}
    >
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-purple-900/30 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-transparent text-white placeholder-purple-300 focus:ring-0"
            displayValue={(cityStr: string) => cityStr}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="شهر خود را جستجو کنید..."
          />
          <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-purple-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-purple-900/95 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            {Object.keys(groupedCities).length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-purple-300">
                شهری یافت نشد.
              </div>
            ) : (
              Object.entries(groupedCities).map(([province, cities]) => (
                <div key={province}>
                  <div className="px-4 py-2 text-sm font-semibold text-purple-400 bg-purple-800/50">
                    {province}
                  </div>
                  {cities.map((city) => (
                    <Combobox.Option
                      key={city.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-purple-600 text-white' : 'text-purple-200'
                        }`
                      }
                      value={`${city.name}، ${city.country}`}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {city.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-purple-400'
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </div>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
} 