import React, { useState, useRef, useEffect } from 'react';
import { DateRange, type Range } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DateRangeInputProps {
  setRange: (range: Range) => void;
  range: Range;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({ setRange, range }) => {
  const [showPicker, setShowPicker] = useState(false);


  const wrapperRef = useRef<HTMLDivElement>(null);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (ranges: any) => {
    setRange(ranges.selection);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-fit" ref={wrapperRef}>
      <div className="flex space-x-4 text-sm">
        <div>
          <input
            type="text"
            readOnly
            onFocus={() => setShowPicker(true)}
            value={format(range.startDate!, 'yyyy-MM-dd')}
            className="px-4 py-2 border rounded-md  w-40 focus:outline-none border-gray-300 bg-gray-50 "
          />
        </div>
        <span className="self-center text-gray-500">to</span>
        <div>
          <input
            type="text"
            readOnly
            onFocus={() => setShowPicker(true)}
            value={format(range.endDate!, 'yyyy-MM-dd')}
            className="px-4 py-2 border rounded-md  w-40 focus:outline-none border-gray-300 bg-gray-50"
          />
        </div>
      </div>

      {showPicker && (
        <div className="absolute z-50 mt-2 shadow-lg bg-white rounded-md">
          <DateRange
            ranges={[range]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            rangeColors={['#6366f1']}
            maxDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeInput;
